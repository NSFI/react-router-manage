import * as React from "react";
import {
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
import { useLocation, useRoutes } from "react-router";
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
  RouteConfig,
  RouteTypeExtendsI,
  RouteTypeI,
  RouterBaseConfigI,
  RouteTypeInputI,
  NewStateI,
  PermissionModeType,
} from "./type";
import { RouterActionEnum } from "./type";
import MRouterContext, {
  MRouterReducer,
  useAddRoutes,
  useRemoveRoutes,
  useUpdateRoutes
} from "./Context/MRouterContext";
import {
  useHistory,
  useHistoryMethods,
  useRouteHooksRef
} from "./Context/MRouterHistoryContext";
import { changeable } from "./changeable";

export type { RouterConfigI, RouteTypeI, RouteTypeExtendsI, RoutesMapI } from "./type";

export { defineRouterConfig } from "./util";
export { useBeforeLeave, useNavigate, useRouter } from "./hooks";

const DEFAULT_PERMISSION_LIST: string[] = [];

interface MRouterContextProviderI {
  permissionList?: string[];
  permissionMode?: PermissionModeType;
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
  {
    permissionList = DEFAULT_PERMISSION_LIST,
    permissionMode = "parent",
    routerConfig,
    hasAuth,
    children
  },
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
      permissionMode,
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
        permissionMode,
        hasAuth,
        beforeEachMount,
        basename,
        location: location
      });
    },
    [
      basename,
      beforeEachMount,
      hasAuth,
      location,
      permissionList,
      permissionMode
    ]
  );
  getNewStateByNewInputRoutesRef.current = _getNewStateByNewInputRoutes;

  // initialization
  const [state, dispatch] = useReducer(MRouterReducer, {
    ...initialState,
    inputRoutes,
    permissionList,
    permissionMode,
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
        const currentRoute = getCurrentRoute(pathname, state.routesMap, state.flattenRoutes);

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
      state.permissionMode === permissionMode &&
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
      state.permissionMode === permissionMode &&
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
      permissionMode,
      hasAuth,
      beforeEachMount,
      basename,
      location
    });

    dispatch({
      type: RouterActionEnum.UPDATE_STATE,
      payload: {
        permissionList,
        permissionMode,
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
    permissionMode,
    state.permissionMode,
    hasAuth,
    state.hasAuth,
    basename,
    beforeEachMount,
    location,
    state.beforeEachMount
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
          to: getCurrentRoute(to as string, state.routesMap, state.flattenRoutes),
          from: getCurrentRoute(pathname, state.routesMap, state.flattenRoutes),
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
      state.routesMap,
      state.flattenRoutes
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
        const res = oldHistoryMethods.go(-1);
        // history.back = oldHistoryMethods.back;
        return res;
      });
    };

    history.forward = () => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.go(1);
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
              <Suspense fallback={<LoadingCmp />}>
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
  // console.log(routesConfig);
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
  permissionMode?: PermissionModeType;
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
  permissionMode,
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
        permissionMode={permissionMode}
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
  useHistory,
};

