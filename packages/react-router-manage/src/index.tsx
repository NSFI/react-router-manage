import React, {
  Suspense,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import type { Location, To } from 'react-router-dom';
import {
  generatePath,
  useLocation,
  useNavigate as useOldNavigate,
  useParams,
  useRoutes,
} from 'react-router';
import { parse, stringify } from 'query-string';

import {
  cloneRoutes,
  computedNewState,
  executeEventCbs,
  flattenArr,
  getCurrentPathRoutes,
  getCurrentRoute,
  getCurrentRouteCbsByEvent,
  getRealTo,
} from './util';
import { BrowserRouter } from './ReactRouterPolyfill';
import type {
  BeforeLeaveI,
  ExtraNavigateOptions,
  RouteCbI,
  RouteConfig,
  RouteTypeExtendsI,
  RouteTypeI,
  RouterConfigI,
  RoutesMapInterface,
  RoutesStateStruct,
} from './type';
import { RouterActionEnum } from './type';
import MRouterContext, {
  MRouterReducer,
  useAddRoutes,
  useRemoveRoutes,
  useRouterState,
  useUpdateRoutes,
} from './Context/MRouterContext';
import { useHistory, useHistoryMethods, useRouteHooksRef } from './Context/MRouterHistoryContext';
import Spin from './components/Spin'

export type { RouterConfigI, RouteTypeI, RouteTypeExtendsI } from './type';

export { defineRouterConfig } from './util';

const LoadingCmp = <Spin tip="应用正在加载中…" />;

const DEFAULT_PERMISSION_LIST: string[] = [];

function useBeforeLeave (fn: BeforeLeaveI): void {
  const pathname = window.location.pathname;
  const routeHooksRef = useRouteHooksRef();
  useLayoutEffect(() => {
    const hooks = routeHooksRef.current;
    const routeHook = {
      name: 'BeforeRouterLeave',
      pathname,
      fn,
    } as RouteCbI;
    hooks.push(routeHook);
    return () => {
      const index = hooks.indexOf(routeHook);
      hooks.splice(index, 1);
    };
  }, [fn, pathname, routeHooksRef]);
}
export interface NavigateFunction {
  (to: To, options?: ExtraNavigateOptions): void
  (delta: number): void
}

const useNavigate = (): NavigateFunction => {
  const oldNavigate = useOldNavigate();
  const newCallback = useCallback(
    (to, options: ExtraNavigateOptions = {}) => {
      if (options?.params && typeof to === 'string') {
        to = generatePath(to, options.params);
      }
      // query写入地址栏
      if (options?.query && typeof to === 'string') {
        let path = to;
        const queryStr = stringify(options.query);
        if (path.includes('?')) {
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

function useRouter (): RoutesStateStruct {
  const location = useLocation();
  const routesMapRef = useRef<RoutesMapInterface>({} as RoutesMapInterface);
  const { routesMap, inputRoutes, currentRoute, flattenRoutes, authInputRoutes }
      = useRouterState();

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
  };
}

interface MRouterContextProviderI {
  permissionList?: string[]
  hasAuth: boolean
  routerConfig: RouterConfigI
  children?: (children: React.ReactNode) => React.ReactNode
}

interface InternalMRouterContextProviderRef {
  updateCurrentRoute: (location: Location) => void
}

const InternalMRouterContextProvider: React.ForwardRefRenderFunction<
InternalMRouterContextProviderRef,
MRouterContextProviderI
> = ({ permissionList = DEFAULT_PERMISSION_LIST, routerConfig, hasAuth, children }, ref) => {
  const history = useHistory();
  const oldHistoryMethods = useHistoryMethods();
  const routeHooksRef = useRouteHooksRef();

  const { routes = [], basename = '/', beforeEachMount, autoDocumentTitle = false } = routerConfig;

  const inputRoutes = useMemo(() => {
    return cloneRoutes({
      routes,
      basename,
    });
  }, [basename, routes]);

  const initialState = useMemo(() => {
    return computedNewState({
      inputRoutes,
      permissionList,
      hasAuth,
      beforeEachMount,
      basename,
    });
  }, [basename, beforeEachMount, hasAuth, inputRoutes, permissionList]);

  // 初始化
  const [state, dispatch] = useReducer(MRouterReducer, {
    ...initialState,
    inputRoutes,
    permissionList,
    hasAuth,
    basename,
  });

  // 监听路由变化，设置currentRoute
  // 把更新currentRoute放到 history.listen 进行批量更新,酱烧更新次数
  useImperativeHandle(ref, () => {
    return {
      updateCurrentRoute (location) {
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
            prevRoute,
          },
        });
      },
    };
  });

  useLayoutEffect(() => {
    // 过滤无权限的路由
    // 用户判断初始化或者更新，如果相当，则只需计算currentRoute
    if (
      inputRoutes === state.inputRoutes
          && state.permissionList === permissionList
          && hasAuth === state.hasAuth
    ) {
      return;
    }
    const { authInputRoutes, flattenRoutes, routesMap, currentRoute, currentPathRoutes } = computedNewState({
      inputRoutes,
      permissionList,
      hasAuth,
      beforeEachMount,
      basename,
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
      },
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
  ]);

  // auto setting document.title
  useEffect(() => {
    if (!autoDocumentTitle) {
      return;
    }
    let title = '';
    if (typeof autoDocumentTitle === 'boolean') {
      title = state.currentPathRoutes.map(i => {
        return i.title;
      }).join('-');
    } else if (typeof autoDocumentTitle === 'function') {
      title = autoDocumentTitle(state.currentPathRoutes);
    }
    document.title = title;
  }, [autoDocumentTitle, state.currentPathRoutes]);

  const allExecuteEventCbs = useCallback(
    (historyCb: () => void, to?: To) => {
      if (typeof to !== 'string') {
        to = to?.pathname;
      }
      const pathname = window.location.pathname;
      const beforeRouterLeaveCbs = getCurrentRouteCbsByEvent(
        'BeforeRouterLeave',
        pathname,
        routeHooksRef.current
      );
      if (state.currentRoute?.beforeLeave) {
        beforeRouterLeaveCbs.unshift({
          name: 'BeforeRouterLeave',
          pathname: state.currentRoute.path,
          fn: state.currentRoute.beforeLeave as BeforeLeaveI,
        });
      }
      if (beforeRouterLeaveCbs.length) {
        executeEventCbs({
          to: getCurrentRoute(to as string, state.routesMap),
          from: getCurrentRoute(pathname, state.routesMap),
          callbacks: beforeRouterLeaveCbs,
          finish: () => {
            return historyCb();
          },
        });
      } else {
        return historyCb();
      }
    },
    [routeHooksRef, state.currentRoute.beforeLeave, state.currentRoute.path, state.routesMap]
  );

  useLayoutEffect(() => {
    // 拦截 useNavigator中使用到history中的方法
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
      payload: newRoutes,
    });
  }, []);

  const removeRoutes = useCallback((routeNames: string[]) => {
    dispatch({
      type: RouterActionEnum.REMOVE_ROUTES,
      payload: routeNames,
    });
  }, []);

  const updateRoutes = useCallback(
    (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]) => {
      dispatch({
        type: RouterActionEnum.UPDATE_ROUTES,
        payload: routes,
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
      payload: currentRoute,
    });
  }, []);

  const routesConfig = useMemo(() => {
    function _computeRoutesConfig (routes: RouteTypeExtendsI[]) {
      const _routes = routes.map(route => {
        let _routeConfig: RouteConfig | undefined;
        let _itemsRouteConfig: RouteConfig[] = [];
        const { _component: Component, path, items, children, _isHasAuth, props } = route;
        if (Component) {
          if (!_isHasAuth) {
            // 无权限，则子级也无权限
            return {
              path: path.endsWith('*') ? path : `${path}/*`,
              element: (
                <Suspense fallback={LoadingCmp}>
                  <Component {...props} />
                </Suspense>
              ),
            } as RouteConfig;
          }
          _routeConfig = {
            path,
            element: (
              <Suspense fallback={LoadingCmp}>
                <Component {...props} />
              </Suspense>
            ),
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
          updateRoutes,
        },
      }}
    >
      {renders}
    </MRouterContext.Provider>
  );
};

const MRouterContextProvider = React.forwardRef(InternalMRouterContextProvider);

MRouterContextProvider.displayName = 'MRouterContextProvider';

interface MRouterPropsI {
  permissionList?: string[]
  wrapComponent?: React.FunctionComponent<any>
  hasAuth?: boolean
  routerConfig: RouterConfigI
  children?: (children: React.ReactNode) => React.ReactNode
}

const MRouter: React.FC<MRouterPropsI> = ({
  permissionList,
  wrapComponent: WrapComponent,
  hasAuth = true,
  routerConfig,
  children,
}) => {
  const syncUpdateCurrentRouteRef = useRef<{ updateCurrentRoute: (location: Location) => void }>(
    null!
  );
  const syncUpdateCurrentRoute = useCallback(location => {
    syncUpdateCurrentRouteRef.current?.updateCurrentRoute?.(location);
  }, []);

  if (__DEV__) {
    // 判断传入的值
    if (WrapComponent && children) {
      console.warn(
        'MRouter属性：children、wrapComponent为二选一属性，都存在时将使用children'
      );
    }
    if (children && typeof children !== 'function') {
      console.error('MRoute属性：children 需要是一个函数， 当前不是函数  "%s"', children);
    }
  }

  const _children = useMemo(() => {
    if (children && typeof children === 'function') {
      return children;
    }
    if (WrapComponent) {
      WrapComponent.displayName = 'WrapComponent';
      return function wrapComponent (children: React.ReactNode) {
        return <WrapComponent>{children}</WrapComponent>;
      };
    }
  }, [WrapComponent, children]);

  return (
    <BrowserRouter syncUpdateCurrentRoute={syncUpdateCurrentRoute}>
      <MRouterContextProvider
        routerConfig={routerConfig}
        permissionList={permissionList}
        hasAuth={hasAuth}
        ref={syncUpdateCurrentRouteRef}
      >
        {_children}
      </MRouterContextProvider>
    </BrowserRouter>
  );
};

export {
  MRouter,
  useAddRoutes,
  useRemoveRoutes,
  useUpdateRoutes,
  useBeforeLeave,
  useRouter,
  useHistory,
  useNavigate,
};
