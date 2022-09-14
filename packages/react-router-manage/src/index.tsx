import React, {
  Suspense,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from "react";
import type { Location, To } from "react-router-dom";
import {
  generatePath,
  useLocation,
  useNavigate as useOldNavigate,
  useParams,
  useRoutes
} from "react-router";
import { parse, stringify } from "query-string";

import {
  cloneRoutes,
  computedNewState,
  executeEventCbs,
  flattenArr,
  getCurrentPathRoutes,
  getCurrentRoute,
  getCurrentRouteCbsByEvent,
  getRealTo
} from "./util";
import getInitialState from "./getInitialState";
import BrowserRouter from "./BrowserRouter";
import HashRouter from "./HashRouter";
import type {
  BeforeLeaveI,
  ExtraNavigateOptions,
  RouteCbI,
  RouteConfig,
  RouteTypeExtendsI,
  RouteTypeI,
  RoutesMapI,
  RoutesStateStruct,
  RouterBaseConfigI,
  RouteTypeInputI,
  NewStateI
} from "./type";
import { RouterActionEnum } from "./type";
import MRouterContext, {
  MRouterReducer,
  useAddRoutes,
  useRemoveRoutes,
  useRouterState,
  useUpdateRoutes
} from "./Context/MRouterContext";
import {
  useHistory,
  useHistoryMethods,
  useRouteHooksRef
} from "./Context/MRouterHistoryContext";
import { changeable } from "./changeable";

export type { RouterConfigI, RouteTypeI, RouteTypeExtendsI } from "./type";

export { defineRouterConfig } from "./util";

const DEFAULT_PERMISSION_LIST: string[] = [];

function useBeforeLeave(fn: BeforeLeaveI): void {
  const pathname = window.location.pathname;
  const routeHooksRef = useRouteHooksRef();
  useLayoutEffect(() => {
    const hooks = routeHooksRef.current;
    const routeHook = {
      name: "BeforeRouterLeave",
      pathname,
      fn
    } as RouteCbI;
    hooks.push(routeHook);
    return () => {
      const index = hooks.indexOf(routeHook);
      hooks.splice(index, 1);
    };
  }, [fn, pathname, routeHooksRef]);
}
export interface NavigateFunction {
  (to: To, options?: ExtraNavigateOptions): void;
  (delta: number): void;
}

const useNavigate = (): NavigateFunction => {
  const oldNavigate = useOldNavigate();
  const newCallback = useCallback(
    (to, options: ExtraNavigateOptions = {}) => {
      if (options?.params && typeof to === "string") {
        to = generatePath(to, options.params);
      }
      // query写入地址栏
      if (options?.query && typeof to === "string") {
        let path = to;
        const queryStr = stringify(options.query);
        if (path.includes("?")) {
          path = `${path}&${queryStr}`;
        } else {
          path = `${path}?${queryStr}`;
        }
        to = path;
      }

      return oldNavigate(to, options);
    },
    [oldNavigate]
  );
  return newCallback;
};

function useRouter(): RoutesStateStruct {
  const location = useLocation();
  const routesMapRef = useRef<RoutesMapI>({} as RoutesMapI);
  const {
    routesMap,
    inputRoutes,
    currentRoute,
    flattenRoutes,
    authInputRoutes,
    basename
  } = useRouterState();

  if (routesMapRef.current !== routesMap) {
    routesMapRef.current = routesMap;
  }

  const search = useMemo(() => {
    return parse(location.search);
  }, [location.search]);

  const routerParams = useParams();

  const newNavigate = useNavigate();

  return {
    navigate: newNavigate,
    routesMap,
    query: search,
    params: routerParams as Record<string, string | number>,
    routes: inputRoutes,
    authRoutes: authInputRoutes,
    currentRoute,
    flattenRoutes,
    location,
    basename
  };
}

interface MRouterContextProviderI {
  permissionList?: string[];
  hasAuth: boolean;
  routerConfig: RouterBaseConfigI;
  children?: (children: React.ReactNode) => React.ReactNode;
}

interface InternalMRouterContextProviderRef {
  updateCurrentRoute: (location: Location) => void;
}

const InternalMRouterContextProvider: React.ForwardRefRenderFunction<
  InternalMRouterContextProviderRef,
  MRouterContextProviderI
> = (
  { permissionList = DEFAULT_PERMISSION_LIST, routerConfig, hasAuth, children },
  ref
) => {
  const history = useHistory();
  const location = useLocation();
  const locationRef = useRef(location);

  const oldHistoryMethods = useHistoryMethods();
  const routeHooksRef = useRouteHooksRef();

  const {
    routes = [],
    basename = "/",
    beforeEachMount,
    autoDocumentTitle = false
  } = routerConfig;

  const inputRoutes = useMemo(() => {
    return cloneRoutes({
      routes,
      basename
    });
  }, [basename, routes]);

  const inputRoutesRef = useRef(inputRoutes);

  const [initialState] = useState(
    getInitialState({
      inputRoutes,
      permissionList,
      hasAuth,
      beforeEachMount,
      basename,
      location: locationRef.current,
      _defineId: routerConfig._defineId
    })
  );

  const getNewStateByNewInputRoutesRef = useRef<
    (_inputRoutes: RouteTypeInputI[]) => NewStateI
  >(null!);
  const _getNewStateByNewInputRoutes = useCallback(
    (_inputRoutes: RouteTypeInputI[]) => {
      return computedNewState({
        inputRoutes: _inputRoutes,
        permissionList,
        hasAuth,
        beforeEachMount,
        basename,
        location: location
      });
    },
    [basename, beforeEachMount, hasAuth, location, permissionList]
  );
  getNewStateByNewInputRoutesRef.current = _getNewStateByNewInputRoutes;

  // initialization
  const [state, dispatch] = useReducer(MRouterReducer, {
    ...initialState,
    inputRoutes,
    permissionList,
    hasAuth,
    basename,
    _getNewStateByNewInputRoutes: getNewStateByNewInputRoutesRef.current
  });

  /**
   * listen router change，set currentRoute
   *  Put the updated currentRoute in history listen updates in batches to reduce the number of updates
   */
  useImperativeHandle(ref, () => {
    return {
      updateCurrentRoute(location) {
        const { pathname } = location;
        const prevRoute = state.currentRoute;
        const currentRoute = getCurrentRoute(pathname, state.routesMap);

        let currentPathRoutes = state.currentPathRoutes;
        if (currentRoute !== state.currentRoute) {
          currentPathRoutes = getCurrentPathRoutes(currentRoute);
        }
        dispatch({
          type: RouterActionEnum.UPDATE_STATE,
          payload: {
            currentRoute,
            currentPathRoutes,
            prevRoute
          }
        });
      }
    };
  });

  useLayoutEffect(() => {
    // filter routes without permission
    // used to judge initialization or update. If they are equal, only currentRoute needs to be calculated
    if (
      state.permissionList === permissionList &&
      hasAuth === state.hasAuth &&
      state.inputRoutes === inputRoutes &&
      state.beforeEachMount === beforeEachMount
    ) {
      return;
    }
    // if inputRoutes change, the incoming inputRoutes shall prevail
    let _inputRoutes = state.inputRoutes;
    if (
      inputRoutesRef.current === inputRoutes &&
      state.permissionList === permissionList &&
      hasAuth === state.hasAuth &&
      state.beforeEachMount === beforeEachMount
    ) {
      // Equal, indicating that state.inputRoutes has changed, is add remove and update routes
      return;
    } else {
      // if not Equal, record the value of inputRoutes for next comparison
      inputRoutesRef.current = inputRoutes;
      _inputRoutes = inputRoutes;
    }

    const {
      authInputRoutes,
      flattenRoutes,
      routesMap,
      currentRoute,
      currentPathRoutes
    } = computedNewState({
      inputRoutes: _inputRoutes,
      permissionList,
      hasAuth,
      beforeEachMount,
      basename,
      location
    });

    dispatch({
      type: RouterActionEnum.UPDATE_STATE,
      payload: {
        permissionList,
        authInputRoutes,
        routesMap,
        flattenRoutes,
        currentRoute,
        currentPathRoutes,
        basename,
        beforeEachMount
      }
    });
  }, [
    state.inputRoutes,
    inputRoutes,
    permissionList,
    state.permissionList,
    hasAuth,
    state.hasAuth,
    basename,
    beforeEachMount,
    location
  ]);

  // auto setting document.title
  useEffect(() => {
    if (!autoDocumentTitle) {
      return;
    }
    let title = "";
    if (typeof autoDocumentTitle === "boolean") {
      title = state.currentPathRoutes
        .map(i => {
          return i.title;
        })
        .join("-");
    } else if (typeof autoDocumentTitle === "function") {
      title = autoDocumentTitle(state.currentPathRoutes);
    }
    document.title = title;
  }, [autoDocumentTitle, state.currentPathRoutes]);

  const allExecuteEventCbs = useCallback(
    (historyCb: () => void, to?: To) => {
      if (typeof to !== "string") {
        to = to?.pathname;
      }
      const pathname = window.location.pathname;
      const beforeRouterLeaveCbs = getCurrentRouteCbsByEvent(
        "BeforeRouterLeave",
        pathname,
        routeHooksRef.current
      );
      if (state.currentRoute?.beforeLeave) {
        beforeRouterLeaveCbs.unshift({
          name: "BeforeRouterLeave",
          pathname: state.currentRoute.path,
          fn: state.currentRoute.beforeLeave as BeforeLeaveI
        });
      }
      if (beforeRouterLeaveCbs.length) {
        executeEventCbs({
          to: getCurrentRoute(to as string, state.routesMap),
          from: getCurrentRoute(pathname, state.routesMap),
          callbacks: beforeRouterLeaveCbs,
          finish: () => {
            return historyCb();
          }
        });
      } else {
        return historyCb();
      }
    },
    [
      routeHooksRef,
      state.currentRoute.beforeLeave,
      state.currentRoute.path,
      state.routesMap
    ]
  );

  useLayoutEffect(() => {
    // Intercept the methods used in history in useNavigator
    history.go = (delta: number) => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.go(delta);
        // history.go = oldHistoryMethods.go;
        return res;
      });
    };
    history.push = (to: To, state?: any) => {
      to = getRealTo(to);
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.push(to, state);
        // history.push = oldHistoryMethods.push;
        return res;
      }, to);
    };

    history.replace = (to: To, state?: any) => {
      to = getRealTo(to);
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.replace(to, state);
        // history.replace = oldHistoryMethods.replace;
        return res;
      }, to);
    };

    history.back = () => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.back();
        // history.back = oldHistoryMethods.back;
        return res;
      });
    };

    history.forward = () => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.forward();
        // history.forward = oldHistoryMethods.forward;
        return res;
      });
    };
  }, [allExecuteEventCbs, history, oldHistoryMethods]);

  const addRoutes = useCallback((newRoutes: RouteTypeI[]) => {
    dispatch({
      type: RouterActionEnum.ADD_ROUTES,
      payload: newRoutes
    });
  }, []);

  const removeRoutes = useCallback((routeNames: string[]) => {
    dispatch({
      type: RouterActionEnum.REMOVE_ROUTES,
      payload: routeNames
    });
  }, []);

  const updateRoutes = useCallback(
    (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]) => {
      dispatch({
        type: RouterActionEnum.UPDATE_ROUTES,
        payload: routes
      });
    },
    []
  );

  const updateCurrentRoute = useCallback((currentRoute: RouteTypeExtendsI) => {
    if (!currentRoute) {
      return;
    }
    dispatch({
      type: RouterActionEnum.UPDATE_CURRENT_ROUTE,
      payload: currentRoute
    });
  }, []);

  const routesConfig = useMemo(() => {
    function _computeRoutesConfig(routes: RouteTypeExtendsI[]) {
      const _routes = routes.map(route => {
        let _routeConfig: RouteConfig | undefined;
        let _itemsRouteConfig: RouteConfig[] = [];
        const {
          _component: Component,
          path,
          items,
          children,
          _isHasAuth,
          props
        } = route;
        if (Component) {
          const LoadingCmp = changeable.LoadingComponent;
          if (!_isHasAuth) {
            /** Without permission, the child also has no permission */
            return {
              path: path.endsWith("*") ? path : `${path}/*`,
              element: (
                <Suspense fallback={<LoadingCmp />}>
                  <Component {...props} />
                </Suspense>
              )
            } as RouteConfig;
          }
          _routeConfig = {
            path,
            element: (
              <Suspense fallback={LoadingCmp}>
                <Component {...props} />
              </Suspense>
            )
          } as RouteConfig;
          if (children) {
            _routeConfig.children = _computeRoutesConfig(children);
          }
          if (items) {
            _itemsRouteConfig = _computeRoutesConfig(items);
          }
        }

        const nextRoutes = [_routeConfig, ..._itemsRouteConfig].filter(i => {
          return i !== undefined;
        }) as RouteConfig[];
        return nextRoutes;
      });
      return flattenArr(_routes);
    }
    const _routesConfig = _computeRoutesConfig(state.authInputRoutes);
    return _routesConfig;
  }, [state.authInputRoutes]);

  const routesChildren = useRoutes(routesConfig);

  const renders = useMemo(() => {
    return children ? children(routesChildren) : routesChildren;
  }, [children, routesChildren]);

  return (
    <MRouterContext.Provider
      value={{
        state,
        methods: {
          addRoutes,
          updateCurrentRoute,
          removeRoutes,
          updateRoutes
        }
      }}
    >
      {renders}
    </MRouterContext.Provider>
  );
};

const MRouterContextProvider = React.forwardRef(InternalMRouterContextProvider);

MRouterContextProvider.displayName = "MRouterContextProvider";

interface MRouterPropsI {
  permissionList?: string[];
  wrapComponent?: React.FunctionComponent<any>;
  hasAuth?: boolean;
  routerConfig: RouterBaseConfigI;
  children?: (children: React.ReactNode) => React.ReactNode;
}
interface CoreRouterPropsI extends MRouterPropsI {
  RouterComponent: typeof BrowserRouter | typeof HashRouter;
}
const CoreRouter: React.FC<CoreRouterPropsI> = ({
  permissionList,
  wrapComponent: WrapComponent,
  hasAuth = true,
  routerConfig,
  children,
  RouterComponent
}) => {
  const syncUpdateCurrentRouteRef = useRef<{
    updateCurrentRoute: (location: Location) => void;
  }>(null!);
  const syncUpdateCurrentRoute = useCallback(location => {
    syncUpdateCurrentRouteRef.current?.updateCurrentRoute?.(location);
  }, []);

  if (__DEV__) {
    /** Determine whether routerConfig has ‘_isDefined’ attribute */
    if (!routerConfig._isDefined) {
      console.error(
        `The routerConfig does not call defineRouterConfig definition, You should use 'const routerConfig = defineRouterConfig({...})'`
      );
    }
    /** Judge incoming 'WrapComponent' and 'children' */
    if (WrapComponent && children) {
      console.warn(
        `MRouter attributes 'children' and 'WrapComponent' are optional attributes. If both exist, children will be used`
      );
    }
    if (children && typeof children !== "function") {
      console.error(
        'MRoute attributes children needs to be a function, not a function at present  "%s"',
        children
      );
    }
  }

  const _children = useMemo(() => {
    if (children && typeof children === "function") {
      return children;
    }
    if (WrapComponent) {
      WrapComponent.displayName = "WrapComponent";
      return function wrapComponent(children: React.ReactNode) {
        return <WrapComponent>{children}</WrapComponent>;
      };
    }
  }, [WrapComponent, children]);

  return (
    <RouterComponent syncUpdateCurrentRoute={syncUpdateCurrentRoute}>
      <MRouterContextProvider
        routerConfig={routerConfig}
        permissionList={permissionList}
        hasAuth={hasAuth}
        ref={syncUpdateCurrentRouteRef}
      >
        {_children}
      </MRouterContextProvider>
    </RouterComponent>
  );
};

const MRouter: React.FC<MRouterPropsI> = props => {
  return <CoreRouter {...props} RouterComponent={BrowserRouter} />;
};

const MHRouter: React.FC<MRouterPropsI> = props => {
  return <CoreRouter {...props} RouterComponent={HashRouter} />;
};

export {
  MRouter,
  MHRouter,
  useAddRoutes,
  useRemoveRoutes,
  useUpdateRoutes,
  useBeforeLeave,
  useRouter,
  useHistory,
  useNavigate
};
