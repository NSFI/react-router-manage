/**
 * React Router Manage v1.0.9
 *
 * Copyright (c) onshinpei Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
import { Navigate, Router } from 'react-router-dom';
export { AbortedDeferredError, Await, Form, Link, MemoryRouter, NavLink, Navigate, NavigationType, Outlet, Route, Router, RouterProvider, Routes, ScrollRestoration, UNSAFE_DataRouterContext, UNSAFE_DataRouterStateContext, UNSAFE_DataStaticRouterContext, UNSAFE_LocationContext, UNSAFE_NavigationContext, UNSAFE_RouteContext, UNSAFE_enhanceManualRouteObjects, createBrowserRouter, createHashRouter, createMemoryRouter, createPath, createRoutesFromChildren, createRoutesFromElements, createSearchParams, defer, generatePath, isRouteErrorResponse, json, matchPath, matchRoutes, parsePath, redirect, renderMatches, resolvePath, useActionData, useAsyncError, useAsyncValue, useFetcher, useFetchers, useFormAction, useHref, useInRouterContext, useLoaderData, useLocation, useMatch, useMatches, useNavigate, useNavigation, useNavigationType, useOutlet, useOutletContext, useParams, useResolvedPath, useRevalidator, useRouteError, useRouteLoaderData, useRoutes, useSearchParams } from 'react-router-dom';
import * as React from 'react';
import { useState, useLayoutEffect, useMemo, useRef, useCallback, useReducer, useImperativeHandle, useEffect, Suspense } from 'react';
import { Navigate as Navigate$1, useLocation, useParams, useNavigate as useNavigate$1, generatePath, useRoutes } from 'react-router';
import { parse, stringify } from 'query-string';
import { unstable_batchedUpdates } from 'react-dom';
import { createBrowserHistory, createHashHistory } from '@remix-run/router';

const PageConfig = {
  '401': {
    title: '无权限查看该页面',
    img: '//ysf.qiyukf.net/yx/9c9ce7793b3c0657da5d80e740a89681'
  },
  '404': {
    title: '页面不存在',
    img: 'https://ysf.nosdn.127.net/ysh/6be90dea7806767fe65e7b48982b7a61'
  }
};

const NoAuth = ({
  code = '401'
}) => {
  const config = PageConfig[code];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      height: '100%',
      flexDirection: 'column',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    alt: config.title,
    width: 200,
    src: config?.img
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#666666',
      lineHeight: '22px',
      textAlign: 'center',
      marginTop: 16
    }
  }, config.title));
};

NoAuth.displayName = 'NoAuth';

const NameRedirect = ({
  name,
  component: Component
}) => {
  const {
    routesMap,
    currentRoute
  } = useRouter();
  const targetRoute = routesMap[name];

  if (!targetRoute) {
    if (process.env.NODE_ENV !== "production") ;
  }

  if (name === currentRoute.name) {
    if (Component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return /*#__PURE__*/React.createElement(Component, null);
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  return /*#__PURE__*/React.createElement(Navigate, {
    to: targetRoute.path || ''
  });
};

const Spin = ({
  tip = "加载中"
}) => {
  return /*#__PURE__*/React.createElement("div", null, tip);
};

const LoadingCmp = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spin, {
  tip: "\u5E94\u7528\u6B63\u5728\u52A0\u8F7D\u4E2D\u2026"
}));

const changeable = {
  LoadingComponent: LoadingCmp
};

function setChangeable(options) {
  Object.entries(options).forEach(([key, value]) => {
    changeable[key] = value;
  });
}

function getComponent(options, Component) {
  let ReplaceComponent;

  if (!options) {
    return ReplaceComponent;
  } // if a component is passed in


  if (isComponent(options)) {
    ReplaceComponent = options; // @ts-ignore
  } else if (isString(options.path)) {
    // if there is path, path is preferred
    ReplaceComponent = function Redirect() {
      // @ts-ignore
      return /*#__PURE__*/React.createElement(Navigate, {
        to: options.path
      });
    }; // @ts-ignore

  } else if (isString(options.name)) {
    // if there is no path, use name
    ReplaceComponent = function Redirect() {
      // @ts-ignore
      return /*#__PURE__*/React.createElement(NameRedirect, {
        name: options.name,
        component: Component
      });
    };
  }

  return ReplaceComponent;
}

const GeneratorHookCom = ({
  beforeEnter,
  Component,
  beforeEachMount
}) => {
  /**
   * since setCurrentComponent(Component) Component may be a function
   * react by default, if the preState is a function, the function will be executed and an error will occur
   * So here we put Component into an object
   */
  const [CurrentComponent, setCurrentComponent] = useState({
    Component: undefined
  });
  const {
    currentRoute
  } = useRouter();
  useLayoutEffect(() => {
    // 是否激活状态(未卸载)
    let isActive = true; // 全局的

    if (beforeEachMount) {
      beforeEachMount(currentRoute, options => {
        if (!isActive) {
          return;
        } // global


        const EachReplaceComponent = getComponent(options, Component);

        if (beforeEnter) {
          // local
          beforeEnter(currentRoute, enterOptions => {
            if (!isActive) {
              return;
            }

            const EnterReplaceComponent = getComponent(enterOptions, EachReplaceComponent || Component); // if the Component is passed in next in beforeEnter, the beforeEnter shall prevail
            // Otherwise, beforeEachBeforeMount shall prevail

            setCurrentComponent({
              Component: EnterReplaceComponent || EachReplaceComponent || Component
            });
          });
        } else {
          setCurrentComponent({
            Component: EachReplaceComponent || Component
          });
        }
      });
    } else {
      // local
      if (beforeEnter) {
        beforeEnter(currentRoute, enterOptions => {
          if (!isActive) {
            return;
          }

          const EnterReplaceComponent = getComponent(enterOptions, Component);
          setCurrentComponent({
            Component: EnterReplaceComponent || Component
          });
        });
      }
    }

    return () => {
      isActive = false;
    };
  }, [Component, currentRoute, beforeEnter, beforeEachMount]);
  const LoadingCmp = changeable.LoadingComponent;
  return CurrentComponent.Component ? /*#__PURE__*/React.createElement(CurrentComponent.Component, null) : /*#__PURE__*/React.createElement(LoadingCmp, null);
};

const NotFound = () => {
  return /*#__PURE__*/React.createElement(NoAuth, {
    code: "404"
  });
};

let incrementKey = 1;

const getIncrementName = () => {
  const name = `__routerName${incrementKey}`;
  incrementKey = incrementKey + 1;
  return name;
};

function getWholePath(path, basename = '/', parentPath) {
  if (path.startsWith(basename)) {
    return path;
  } // 根路径


  if (path === basename) {
    return basename;
  }

  if (path.startsWith('/')) {
    if (basename.endsWith('/')) {
      return `${basename}${path.slice(1)}`;
    }

    return `${basename}${path}`;
  }

  if (parentPath) {
    return getWholePath(path, parentPath);
  }

  if (basename.endsWith('/')) {
    return `${basename}${path}`;
  }

  return `${basename}/${path}`;
}

function cloneRoutes(_routeConfig) {
  const {
    routes,
    parent,
    basename = '/',
    _level = 1
  } = _routeConfig;

  if (!routes) {
    return [];
  }

  function _cloneRoutes(_routes, parent, _level = 1) {
    return _routes.map(_route => {
      const {
        path,
        items,
        children,
        ...resets
      } = _route;
      const wholePath = getWholePath(path, basename, parent?.path);
      const newRoute = { ...resets,
        path: getValidPathname(wholePath),
        parent,
        _level,
        _relativePath: path
      };

      if (items) {
        newRoute.items = _cloneRoutes(items, newRoute, _level + 1);
      }

      if (children) {
        newRoute.children = _cloneRoutes(children, newRoute, _level + 1);
      }

      return newRoute;
    });
  }

  return _cloneRoutes(routes, parent, _level);
}
/**
 *cCalculate some state data
 * @param inputRoutes
 * @param permissionList
 * @returns
 */

function computedNewState(config) {
  const {
    inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount,
    basename,
    location
  } = config;
  const authInputRoutes = computeRoutesConfig({
    routes: inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount
  });
  const flattenRoutes = flattenRoutesFn(authInputRoutes, undefined, true); // mixin into the notFound page

  mixinNotFoundPage(flattenRoutes, basename, authInputRoutes);
  const routesMap = routesMapFn(flattenRoutes);
  const currentRoute = getCurrentRoute(location.pathname, routesMap);
  const currentPathRoutes = getCurrentPathRoutes(currentRoute);
  return {
    authInputRoutes,
    flattenRoutes,
    routesMap,
    currentRoute,
    currentPathRoutes,
    beforeEachMount
  };
}
/**
 * flatten the react router array recursively
 * whether all is true, includes sub routes
 */

const flattenRoutesFn = (arr, parent, all) => {
  return arr.reduce((prev, nextRoute) => {
    if (parent) {
      nextRoute.parent = parent;
    }

    if (Array.isArray(nextRoute.items) || Array.isArray(nextRoute.children)) {
      let _routes = prev.concat(nextRoute);

      if (Array.isArray(nextRoute.items)) {
        _routes = _routes.concat(flattenRoutesFn(nextRoute.items, nextRoute, all));
      }

      if (Array.isArray(nextRoute.children) && all) {
        _routes = _routes.concat(flattenRoutesFn(nextRoute.children, nextRoute, all));
      }

      return _routes;
    } else {
      return prev.concat(nextRoute);
    }
  }, []);
}; // name => mapping of route

const routesMapFn = flattenRoutes => {
  const routesMap = flattenRoutes.reduce((_routeMap, nextRoute) => {
    const {
      name,
      path
    } = nextRoute;

    if (_routeMap[name] || _routeMap[path]) {
      throw new Error(`route config name or path isn't unique, route name: "${name}", route path: "${path}"`);
    } // the route has params
    // stored internally '__paramsRoutes' variable


    if (path.includes(':')) {
      const _path = path.replace(/:(\w+)/g, () => {
        return '([^\\/]+)';
      });

      _routeMap.__paramsRoutesMap[_path] = nextRoute;
    }

    _routeMap[name] = _routeMap[path] = nextRoute;
    return _routeMap;
  }, {
    __paramsRoutesMap: {},
    __flattenRoutes: []
  });
  routesMap.__flattenRoutes = flattenRoutes;
  return routesMap;
}; // convert '/a/b/c/' to '/a/b/c'

function getValidPathname(pathname) {
  if (!pathname) {
    return pathname;
  }

  if (pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
/** find the current route object through the path */


function getCurrentRoute(pathname = window.location.pathname, routesMap) {
  // console.log(routesMap);
  // first look from the outermost routesMap
  pathname = getValidPathname(pathname);
  let currentRoute = routesMap[pathname]; // if can't find it, go to find to routesMap.__paramsRoutesMap

  if (!currentRoute) {
    const paths = Object.keys(routesMap.__paramsRoutesMap);
    let pathIndex = 0;

    while (!currentRoute && pathIndex < paths.length) {
      const pathPattern = new RegExp(paths[pathIndex]);

      if (pathname.match(pathPattern)) {
        currentRoute = routesMap.__paramsRoutesMap[paths[pathIndex]];
        break;
      }

      pathIndex = pathIndex + 1;
    }
  } // TODO 找通配符的 后续优化


  if (!currentRoute) {
    // 有通配符的路径
    const paths = routesMap.__flattenRoutes.map(i => i.path).filter(i => i.endsWith('*')); // find the longest one


    let longerPath = '';
    paths.forEach(path => {
      path = pathStartMarkTransform(path);

      if (!pathname.startsWith(path)) {
        return;
      }

      if (path in routesMap && path.length > longerPath.length) {
        longerPath = path;
      } // 匹配 /a/b/c*


      let _path = `${path}*`;

      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      } // 匹配 /a/b/c/*


      _path = `${path}/*`;

      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      } // 匹配 /a/b/c*


      _path = `${pathname}*`;

      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      } // 匹配 /a/b/c/*


      _path = `${pathname}/*`;

      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      }
    });

    if (longerPath) {
      currentRoute = routesMap[longerPath];
    }
  } // if (!currentRoute) {
  //   // 找父级
  // }


  if (!currentRoute) {
    // 默认404
    currentRoute = {
      name: '404',
      path: pathname,
      title: '404',
      _isHasAuth: false,
      _relativePath: '',
      _level: 0,
      meta: {},
      component: () => {
        return /*#__PURE__*/React.createElement(NoAuth, null);
      }
    };
  }

  return currentRoute;
}
/**
 * 获取路由的路径（父路由和子路由的集合，主要在导航中）
 * @param currentRoute
 * @returns
 */

function getCurrentPathRoutes(currentRoute) {
  const routes = [];
  let pathRoute = currentRoute;

  while (pathRoute) {
    routes.unshift(pathRoute);
    pathRoute = pathRoute.parent;
  }

  return routes;
}
function executeEventCbs(option) {
  const {
    to,
    from,
    callbacks,
    finish
  } = option;

  function executeNextCb(cbIndex = 0) {
    const nextCb = callbacks[cbIndex];

    if (!nextCb) {
      return finish();
    } else {
      nextCb.fn(to, from, () => {
        executeNextCb(cbIndex + 1);
      });
    }
  }

  if (callbacks.length === 0) {
    finish();
  } else {
    executeNextCb(0);
  }
}

function getIsHasAuthByStrCode(code, permissionList) {
  return permissionList.includes(code);
}

function getIsHasAuthByFnCode(code, route) {
  return code(route);
}

function getIsHasAuth({
  code,
  permissionList,
  hasAuth,
  route
}) {
  if (!hasAuth) {
    // 未配置权限
    return true;
  }

  if (!code) {
    // 未配置code默认有权限
    return true;
  }

  if (Array.isArray(code)) {
    if (code.length === 0) {
      return true;
    }

    return code.some(_code => {
      return getIsHasAuthByStrCode(_code, permissionList);
    });
  }

  if (code instanceof Function) {
    return !!getIsHasAuthByFnCode(code, route);
  }

  return getIsHasAuthByStrCode(code, permissionList);
}
function computeRoutesConfig(config) {
  const {
    routes,
    permissionList = [],
    hasAuth,
    beforeEachMount,
    parent
  } = config;
  return routes.map(route => {
    const {
      component: Component,
      path,
      code = '',
      children,
      items,
      beforeEnter,
      redirect,
      meta,
      type,
      ...other
    } = route;
    let _children = [];
    let _items = [];
    let CurrentComponent = Component;
    const props = {};

    if (beforeEnter || beforeEachMount) {
      CurrentComponent = GeneratorHookCom;
      props.beforeEnter = beforeEnter;
      props.beforeEachMount = beforeEachMount;
      props.Component = Component;
      props.key = route.name; // users switch between routes to avoid incorrect rendering due to the same key after route switching

      props._route = route;
    }

    const isHasAuth = getIsHasAuth({
      code,
      permissionList,
      hasAuth,
      route
    });
    const newRoute = { ...route,
      parent,
      props,
      meta: meta || {},
      items: [],
      children: [],
      _route: route,
      _isHasAuth: isHasAuth
    };

    if (!isHasAuth) {
      /**
       * if there is no permission, the children also has no permission
       * /a/b/c 则加入 /a/b/c/*
       */
      let noAuthItems = [];

      if (!path.endsWith('*')) {
        const _path = path.endsWith('/') ? `${path}*` : `${path}/*`;

        noAuthItems = [{
          meta: {},
          name: getIncrementName(),
          path: _path,
          title: '',
          hidden: true,
          component: NoAuth,
          _level: other._level + 1,
          _route: route,
          _component: NoAuth,
          _relativePath: '*'
        }];
      }

      const returnRoute = { ...newRoute,
        items: noAuthItems,
        children: [],
        _component: NoAuth
      };
      noAuthItems.forEach(i => {
        i.parent = returnRoute;
      });
      return returnRoute;
    } // 处理子路由


    if (children) {
      _children = computeRoutesConfig({
        routes: children,
        permissionList,
        hasAuth,
        beforeEachMount,
        parent: newRoute
      });
    } // 处理同级路由


    if (items) {
      _items = computeRoutesConfig({
        routes: items,
        permissionList,
        hasAuth,
        beforeEachMount,
        parent: newRoute
      });
    }

    const _itemsAndChildren = [..._items, ..._children];

    if (redirect) {
      return { ...newRoute,
        children: _children,
        items: _items,
        _component: () => /*#__PURE__*/React.createElement(Navigate$1, {
          to: redirect,
          replace: true
        }),
        _itemsAndChildren
      };
    }

    if (type === 'null') {
      return { ...newRoute,
        children: _children,
        items: _items,
        _component: undefined,
        _itemsAndChildren
      };
    }

    if (Component) {
      return { ...newRoute,
        children: _children,
        items: _items,
        _component: CurrentComponent,
        _itemsAndChildren
      };
    } else {
      const redirectPath = handleRedirectPath(route, permissionList, hasAuth);

      if (redirectPath) {
        let replace = false; // 父级也没配置component，则会进行多次重定向进行replace, 以便浏览器回退行为

        if (!route.parent?.component) {
          replace = true;
        }

        return { ...newRoute,
          children: _children,
          items: _items,
          _component: () => /*#__PURE__*/React.createElement(Navigate$1, {
            to: redirectPath,
            replace: replace
          }),
          _itemsAndChildren
        };
      }

      return { ...newRoute,
        items: [],
        children: [],
        _component: NoAuth
      };
    }
  });
}
function getCurrentRouteCbsByEvent(routeEvent, pathname, routeHooks) {
  return routeHooks.filter(i => {
    return i.name === routeEvent && i.pathname === pathname;
  });
}

function pathStartMarkTransform(path) {
  if (path === '/') {
    return path;
  }

  return path.replace(/\/*\**$/gm, '');
}
/**
 * when jump route，Remove the '*'
 * @param to
 * @returns
 */


function getRealTo(to) {
  if (typeof to === 'string') {
    return pathStartMarkTransform(to);
  }

  const {
    pathname
  } = to;

  if (pathname) {
    return { ...to,
      pathname: pathStartMarkTransform(pathname)
    };
  }

  return to;
}
const handleRedirectPath = (route, permissionList, hasAuth) => {
  // Return to the first menu(route) item with permission
  const {
    items
  } = route;

  if (!items) {
    return '';
  } // No configuration permission, return to the first one child route


  if (!hasAuth) {
    return items[0].path;
  }

  let redirectPath = ''; // find the first one route with permission

  for (let i = 0; i < items?.length; i++) {
    const childRoute = items[i];
    const {
      code,
      path
    } = childRoute;

    if (!code) {
      // if code is false, the default is permission
      redirectPath = path;
      break;
    }

    if (getIsHasAuth({
      code,
      permissionList,
      hasAuth,
      route: childRoute
    })) {
      redirectPath = path;
      break;
    }
  }

  return redirectPath;
};
function mixinNotFoundPage(flattenRoutes, basename, authInputRoutes) {
  const notFoundPath = getWholePath('*', basename);
  const hasNotFoundPage = flattenRoutes.some(({
    path
  }) => {
    if (path === notFoundPath) {
      return true;
    }

    return false;
  });

  if (hasNotFoundPage) {
    return;
  }

  const notFoundPage = {
    name: 'notFound',
    title: 'notFound',
    meta: {},
    path: notFoundPath,
    component: NotFound,
    _component: NotFound,
    _relativePath: notFoundPath,
    _level: 0
  };
  authInputRoutes.push(notFoundPage);
  flattenRoutes.push(notFoundPage);
} // determine whether it is a react component
// react Components are characterized by functions

function isComponent(component) {
  if (component instanceof Function) {
    return true;
  }

  return false;
}
function isString(str) {
  if (typeof str === 'string') {
    return true;
  }

  return false;
}
/**
 * 1、To support ts, users are prompted when writing code
 * 2、Modify global configuration
 * 3、Add '_isDefined' attribute, Used by MRouter to defined whether the object has been called defineRouterConfig
 * @param routerConfig
 * @returnsRouterBaseConfigI
 */

let _defineId = 0;
function defineRouterConfig(routerConfig) {
  const {
    LoadingComponent,
    ..._config
  } = routerConfig;
  _defineId = _defineId + 1;

  if (LoadingComponent) {
    setChangeable({
      LoadingComponent
    });
  }
  /** add '_isDefined' attribute */


  const config = { ..._config,
    _isDefined: true,
    _defineId: _defineId
  };
  return config;
}
function flattenArr(ary) {
  if (!ary) {
    return [];
  }

  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flattenArr(cur) : cur);
  }, []);
}

// defineRouterConfig may be called multiple times in the same application

let initialStateMap = new Map();

function getSameQueryData(prevData, currentData) {
  return prevData.basename === currentData.basename && prevData.hasAuth === currentData.hasAuth && prevData.beforeEachMount === currentData.beforeEachMount && prevData.inputRoutes === currentData.inputRoutes && prevData.permissionList === currentData.permissionList;
}

function getInitialState(currentQueryData) {
  const {
    inputRoutes,
    hasAuth,
    permissionList,
    beforeEachMount,
    basename,
    location,
    _defineId
  } = currentQueryData;
  const prevData = initialStateMap.get(_defineId);

  if (prevData) {
    const isSameQueryData = getSameQueryData(prevData.queryData, currentQueryData);

    if (isSameQueryData) {
      return prevData.initialData;
    }
  }

  const _initialState = computedNewState({
    inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount,
    basename,
    location
  });

  initialStateMap.set(_defineId, {
    queryData: currentQueryData,
    initialData: _initialState
  });
  return _initialState;
}

const MRouterHistoryContext = /*#__PURE__*/React.createContext(null);
MRouterHistoryContext.displayName = 'MRouterHistoryContext';
function useHistory() {
  return React.useContext(MRouterHistoryContext).history;
}
function useRouteHooksRef() {
  return React.useContext(MRouterHistoryContext).routeHooksRef;
}
function useHistoryMethods() {
  return React.useContext(MRouterHistoryContext).historyMethods;
}

/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */

function BrowserRouter({
  basename,
  children,
  syncUpdateCurrentRoute
}) {
  const historyRef = React.useRef(null);
  const routeHooksRef = React.useRef(null);

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window
    });
    routeHooksRef.current = [];
  }

  const historyContext = useMemo(() => {
    return {
      history: historyRef.current,
      routeHooks: routeHooksRef.current,
      routeHooksRef,
      historyMethods: {
        push: historyRef.current.push,
        replace: historyRef.current.replace,
        go: historyRef.current.go
      }
    };
  }, []);
  const history = historyRef.current;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => {
    let mounted = true;
    history.listen(routeData => {
      const {
        location
      } = routeData;

      if (!mounted) {
        return;
      }

      unstable_batchedUpdates(() => {
        setState(routeData);
        syncUpdateCurrentRoute(location);
      });
    });
    return () => {
      mounted = false;
    };
  }, [history, syncUpdateCurrentRoute]);
  return /*#__PURE__*/React.createElement(MRouterHistoryContext.Provider, {
    value: historyContext
  }, /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    location: state.location,
    navigationType: state.action,
    navigator: history
  }, children));
}

/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */

function HashRouter({
  basename,
  children,
  syncUpdateCurrentRoute
}) {
  const historyRef = React.useRef(null);
  const routeHooksRef = React.useRef(null);

  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window
    });
    routeHooksRef.current = [];
  }

  const historyContext = useMemo(() => {
    return {
      history: historyRef.current,
      routeHooks: routeHooksRef.current,
      routeHooksRef,
      historyMethods: {
        push: historyRef.current.push,
        replace: historyRef.current.replace,
        go: historyRef.current.go
      }
    };
  }, []);
  const history = historyRef.current;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => {
    let mounted = true;
    history.listen(routeData => {
      const {
        location
      } = routeData;

      if (!mounted) {
        return;
      }

      unstable_batchedUpdates(() => {
        setState(routeData);
        syncUpdateCurrentRoute(location);
      });
    });
    return () => {
      mounted = false;
    };
  }, [history, syncUpdateCurrentRoute]);
  return /*#__PURE__*/React.createElement(MRouterHistoryContext.Provider, {
    value: historyContext
  }, /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    location: state.location,
    navigationType: state.action,
    navigator: history
  }, children));
}

var RouteNavTypeEnum;

(function (RouteNavTypeEnum) {
  RouteNavTypeEnum[RouteNavTypeEnum["menu"] = 0] = "menu";
  RouteNavTypeEnum[RouteNavTypeEnum["step"] = 1] = "step";
})(RouteNavTypeEnum || (RouteNavTypeEnum = {}));

var RouterActionEnum;

(function (RouterActionEnum) {
  RouterActionEnum["UPDATE_INPUT_ROUTES"] = "UPDATE_INPUT_ROUTES";
  RouterActionEnum["UPDATE_CURRENT_ROUTE"] = "UPDATE_CURRENT_ROUTE";
  RouterActionEnum["UPDATE_STATE"] = "UPDATE_STATE";
  RouterActionEnum["ADD_ROUTES"] = "ADD_ROUTES";
  RouterActionEnum["REMOVE_ROUTES"] = "REMOVE_ROUTES";
  RouterActionEnum["UPDATE_ROUTES"] = "UPDATE_ROUTES";
})(RouterActionEnum || (RouterActionEnum = {}));

function newInputRoutesState(inputRoutes) {
  const routesMap = {};

  function _cloneInputRoutes(inputRoutes, parent) {
    if (!inputRoutes) {
      return [];
    }

    return inputRoutes.map(i => {
      const _route = { ...i,
        items: [],
        children: [],
        parent: parent
      };
      _route.items = _cloneInputRoutes(i.items, _route);
      _route.children = _cloneInputRoutes(i.children, _route);
      routesMap[i.name] = _route;
      return _route;
    }, []);
  }

  return {
    inputRoutes: _cloneInputRoutes(inputRoutes),
    routesMap: routesMap
  };
}
/**
 * add routes operation
 * @param state MRouterStateI
 * @param payload RouteTypeI[]
 * @returns MRouterStateI
 */


function addRoutesAction(state, payload) {
  let hasChange = false;
  const newRoutes = payload;
  const {
    routesMap,
    inputRoutes
  } = newInputRoutesState(state.inputRoutes);
  newRoutes.forEach(_route => {
    const {
      path,
      name,
      parentName
    } = _route;

    if (routesMap[path] || routesMap[name]) {
      throw new Error(`新增路由 ${name} ${path} 已经存在，请修改`);
    }

    if (parentName) {
      const _parentRoute = routesMap[parentName];

      if (_parentRoute) {
        const route = cloneRoutes({
          routes: [_route],
          parent: _parentRoute,
          _level: _parentRoute._level + 1
        });
        _parentRoute.items = _parentRoute.items || [];

        _parentRoute.items.push(route[0]);

        hasChange = true;
      }
    } else {
      // 根路径插入
      const route = cloneRoutes({
        routes: [_route],
        _level: 0
      });
      inputRoutes.push(route[0]);
      hasChange = true;
    }
  });

  if (hasChange) {
    const newState = state._getNewStateByNewInputRoutes(inputRoutes);

    return { ...state,
      ...newState,
      inputRoutes: [...inputRoutes]
    };
  }

  return state;
}
/**
 * update routes operation
 * @param state MRouterStateI
 * @param payload RouteTypeI[]
 * @returns MRouterStateI
 */

function updateRoutesAction(state, payload) {
  let hasChange = false; // const { basename } = state;

  const newRoutesPayload = payload;
  const {
    routesMap,
    inputRoutes
  } = newInputRoutesState(state.inputRoutes);
  newRoutesPayload.forEach(({
    routeName,
    routeData
  }) => {
    const route = routesMap[routeName];

    if (route) {
      // 如果parent存在，则不是根节点
      const parent = route.parent;
      const _newRouteData = { ...route,
        ...routeData
      };
      const newRouteData = cloneRoutes({
        routes: [_newRouteData],
        parent,
        _level: (parent?._level || 0) + 1,
        basename: state.basename
      });

      if (!parent) {
        Object.assign(route, newRouteData[0]);
        hasChange = true;
      }

      if (parent && parent.items) {
        parent.items.splice(parent.items.indexOf(route), 1, newRouteData[0]);
        hasChange = true;
      } else if (parent && parent.children) {
        parent.children.splice(parent.children.indexOf(route), 1, newRouteData[0]);
        hasChange = true;
      }
    }
  });

  if (hasChange) {
    const newState = state._getNewStateByNewInputRoutes(inputRoutes);

    return { ...state,
      ...newState,
      inputRoutes: [...inputRoutes]
    };
  }

  return state;
}
/**
 * remove routes operation
 * @param state MRouterStateI
 * @param payload RouteTypeI[]
 * @returns MRouterStateI
 */

function removeRoutesAction(state, payload) {
  let hasChange = false;
  const routeNames = payload;
  const {
    routesMap,
    inputRoutes
  } = newInputRoutesState(state.inputRoutes);
  routeNames.forEach(routeName => {
    const _route = routesMap[routeName];

    if (_route) {
      // 如果parent存在，则不是根节点
      const parent = _route.parent;

      if (!parent) {
        const index = inputRoutes.indexOf(_route);

        if (index > -1) {
          inputRoutes.splice(index, 1);
          hasChange = true;
        }
      }

      if (parent && parent.items) {
        const index = parent.items.indexOf(_route);

        if (index > -1) {
          parent.items.splice(index, 1);
          hasChange = true;
        }
      }
    }
  });

  if (hasChange) {
    const newState = state._getNewStateByNewInputRoutes(inputRoutes);

    return { ...state,
      ...newState,
      inputRoutes: [...inputRoutes]
    };
  } else {
    return state;
  }
}

const MRouterContext = /*#__PURE__*/React.createContext({
  state: {
    inputRoutes: [],
    authInputRoutes: [],
    permissionList: [],
    routesMap: {},
    flattenRoutes: []
  },
  methods: {}
});
MRouterContext.displayName = 'MRouterContext';
function MRouterReducer(state, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case RouterActionEnum.ADD_ROUTES:
      {
        return addRoutesAction(state, payload);
      }

    case RouterActionEnum.REMOVE_ROUTES:
      {
        return removeRoutesAction(state, payload);
      }

    case RouterActionEnum.UPDATE_ROUTES:
      {
        return updateRoutesAction(state, payload);
      }

    case RouterActionEnum.UPDATE_INPUT_ROUTES:
      {
        return { ...state,
          inputRoutes: payload
        };
      }

    case RouterActionEnum.UPDATE_CURRENT_ROUTE:
      {
        return { ...state,
          currentRoute: payload
        };
      }

    case RouterActionEnum.UPDATE_STATE:
      {
        return { ...state,
          ...payload
        };
      }

    default:
      {
        return { ...state
        };
      }
  }
}
function useRouterState() {
  return React.useContext(MRouterContext).state;
}
/** Dynamically add routing method */

function useAddRoutes() {
  return React.useContext(MRouterContext).methods.addRoutes;
}
function useRemoveRoutes() {
  return React.useContext(MRouterContext).methods.removeRoutes;
}
function useUpdateRoutes() {
  return React.useContext(MRouterContext).methods.updateRoutes;
}

const DEFAULT_PERMISSION_LIST = [];

function useBeforeLeave(fn) {
  const pathname = window.location.pathname;
  const routeHooksRef = useRouteHooksRef();
  useLayoutEffect(() => {
    const hooks = routeHooksRef.current;
    const routeHook = {
      name: "BeforeRouterLeave",
      pathname,
      fn
    };
    hooks.push(routeHook);
    return () => {
      const index = hooks.indexOf(routeHook);
      hooks.splice(index, 1);
    };
  }, [fn, pathname, routeHooksRef]);
}

const useNavigate = () => {
  const oldNavigate = useNavigate$1();
  const newCallback = useCallback((to, options = {}) => {
    if (options?.params && typeof to === "string") {
      to = generatePath(to, options.params);
    } // query写入地址栏


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
  }, [oldNavigate]);
  return newCallback;
};

function useRouter() {
  const location = useLocation();
  const routesMapRef = useRef({});
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
    params: routerParams,
    routes: inputRoutes,
    authRoutes: authInputRoutes,
    currentRoute,
    flattenRoutes,
    location,
    basename
  };
}

const InternalMRouterContextProvider = ({
  permissionList = DEFAULT_PERMISSION_LIST,
  routerConfig,
  hasAuth,
  children
}, ref) => {
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
  const [initialState] = useState(getInitialState({
    inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount,
    basename,
    location: locationRef.current,
    _defineId: routerConfig._defineId
  }));
  const getNewStateByNewInputRoutesRef = useRef(null);

  const _getNewStateByNewInputRoutes = useCallback(_inputRoutes => {
    return computedNewState({
      inputRoutes: _inputRoutes,
      permissionList,
      hasAuth,
      beforeEachMount,
      basename,
      location: location
    });
  }, [basename, beforeEachMount, hasAuth, location, permissionList]);

  getNewStateByNewInputRoutesRef.current = _getNewStateByNewInputRoutes; // initialization

  const [state, dispatch] = useReducer(MRouterReducer, { ...initialState,
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
        const {
          pathname
        } = location;
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
    if (state.permissionList === permissionList && hasAuth === state.hasAuth && state.inputRoutes === inputRoutes && state.beforeEachMount === beforeEachMount) {
      return;
    } // if inputRoutes change, the incoming inputRoutes shall prevail


    let _inputRoutes = state.inputRoutes;

    if (inputRoutesRef.current === inputRoutes && state.permissionList === permissionList && hasAuth === state.hasAuth && state.beforeEachMount === beforeEachMount) {
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
  }, [state.inputRoutes, inputRoutes, permissionList, state.permissionList, hasAuth, state.hasAuth, basename, beforeEachMount, location]); // auto setting document.title

  useEffect(() => {
    if (!autoDocumentTitle) {
      return;
    }

    let title = "";

    if (typeof autoDocumentTitle === "boolean") {
      title = state.currentPathRoutes.map(i => {
        return i.title;
      }).join("-");
    } else if (typeof autoDocumentTitle === "function") {
      title = autoDocumentTitle(state.currentPathRoutes);
    }

    document.title = title;
  }, [autoDocumentTitle, state.currentPathRoutes]);
  const allExecuteEventCbs = useCallback((historyCb, to) => {
    if (typeof to !== "string") {
      to = to?.pathname;
    }

    const pathname = window.location.pathname;
    const beforeRouterLeaveCbs = getCurrentRouteCbsByEvent("BeforeRouterLeave", pathname, routeHooksRef.current);

    if (state.currentRoute?.beforeLeave) {
      beforeRouterLeaveCbs.unshift({
        name: "BeforeRouterLeave",
        pathname: state.currentRoute.path,
        fn: state.currentRoute.beforeLeave
      });
    }

    if (beforeRouterLeaveCbs.length) {
      executeEventCbs({
        to: getCurrentRoute(to, state.routesMap),
        from: getCurrentRoute(pathname, state.routesMap),
        callbacks: beforeRouterLeaveCbs,
        finish: () => {
          return historyCb();
        }
      });
    } else {
      return historyCb();
    }
  }, [routeHooksRef, state.currentRoute.beforeLeave, state.currentRoute.path, state.routesMap]);
  useLayoutEffect(() => {
    // Intercept the methods used in history in useNavigator
    history.go = delta => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.go(delta); // history.go = oldHistoryMethods.go;

        return res;
      });
    };

    history.push = (to, state) => {
      to = getRealTo(to);
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.push(to, state); // history.push = oldHistoryMethods.push;

        return res;
      }, to);
    };

    history.replace = (to, state) => {
      to = getRealTo(to);
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.replace(to, state); // history.replace = oldHistoryMethods.replace;

        return res;
      }, to);
    };

    history.back = () => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.back(); // history.back = oldHistoryMethods.back;

        return res;
      });
    };

    history.forward = () => {
      allExecuteEventCbs(() => {
        const res = oldHistoryMethods.forward(); // history.forward = oldHistoryMethods.forward;

        return res;
      });
    };
  }, [allExecuteEventCbs, history, oldHistoryMethods]);
  const addRoutes = useCallback(newRoutes => {
    dispatch({
      type: RouterActionEnum.ADD_ROUTES,
      payload: newRoutes
    });
  }, []);
  const removeRoutes = useCallback(routeNames => {
    dispatch({
      type: RouterActionEnum.REMOVE_ROUTES,
      payload: routeNames
    });
  }, []);
  const updateRoutes = useCallback(routes => {
    dispatch({
      type: RouterActionEnum.UPDATE_ROUTES,
      payload: routes
    });
  }, []);
  const updateCurrentRoute = useCallback(currentRoute => {
    if (!currentRoute) {
      return;
    }

    dispatch({
      type: RouterActionEnum.UPDATE_CURRENT_ROUTE,
      payload: currentRoute
    });
  }, []);
  const routesConfig = useMemo(() => {
    function _computeRoutesConfig(routes) {
      const _routes = routes.map(route => {
        let _routeConfig;

        let _itemsRouteConfig = [];
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
              element: /*#__PURE__*/React.createElement(Suspense, {
                fallback: /*#__PURE__*/React.createElement(LoadingCmp, null)
              }, /*#__PURE__*/React.createElement(Component, { ...props
              }))
            };
          }

          _routeConfig = {
            path,
            element: /*#__PURE__*/React.createElement(Suspense, {
              fallback: LoadingCmp
            }, /*#__PURE__*/React.createElement(Component, { ...props
            }))
          };

          if (children) {
            _routeConfig.children = _computeRoutesConfig(children);
          }

          if (items) {
            _itemsRouteConfig = _computeRoutesConfig(items);
          }
        }

        const nextRoutes = [_routeConfig, ..._itemsRouteConfig].filter(i => {
          return i !== undefined;
        });
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
  return /*#__PURE__*/React.createElement(MRouterContext.Provider, {
    value: {
      state,
      methods: {
        addRoutes,
        updateCurrentRoute,
        removeRoutes,
        updateRoutes
      }
    }
  }, renders);
};

const MRouterContextProvider = /*#__PURE__*/React.forwardRef(InternalMRouterContextProvider);
MRouterContextProvider.displayName = "MRouterContextProvider";

const CoreRouter = ({
  permissionList,
  wrapComponent: WrapComponent,
  hasAuth = true,
  routerConfig,
  children,
  RouterComponent
}) => {
  const syncUpdateCurrentRouteRef = useRef(null);
  const syncUpdateCurrentRoute = useCallback(location => {
    syncUpdateCurrentRouteRef.current?.updateCurrentRoute?.(location);
  }, []);

  if (process.env.NODE_ENV !== "production") {
    /** Determine whether routerConfig has ‘_isDefined’ attribute */
    if (!routerConfig._isDefined) {
      console.error(`The routerConfig does not call defineRouterConfig definition, You should use 'const routerConfig = defineRouterConfig({...})'`);
    }
    /** Judge incoming 'WrapComponent' and 'children' */


    if (WrapComponent && children) {
      console.warn(`MRouter attributes 'children' and 'WrapComponent' are optional attributes. If both exist, children will be used`);
    }

    if (children && typeof children !== "function") {
      console.error('MRoute attributes children needs to be a function, not a function at present  "%s"', children);
    }
  }

  const _children = useMemo(() => {
    if (children && typeof children === "function") {
      return children;
    }

    if (WrapComponent) {
      WrapComponent.displayName = "WrapComponent";
      return function wrapComponent(children) {
        return /*#__PURE__*/React.createElement(WrapComponent, null, children);
      };
    }
  }, [WrapComponent, children]);

  return /*#__PURE__*/React.createElement(RouterComponent, {
    syncUpdateCurrentRoute: syncUpdateCurrentRoute
  }, /*#__PURE__*/React.createElement(MRouterContextProvider, {
    routerConfig: routerConfig,
    permissionList: permissionList,
    hasAuth: hasAuth,
    ref: syncUpdateCurrentRouteRef
  }, _children));
};

const MRouter = props => {
  return /*#__PURE__*/React.createElement(CoreRouter, { ...props,
    RouterComponent: BrowserRouter
  });
};

const MHRouter = props => {
  return /*#__PURE__*/React.createElement(CoreRouter, { ...props,
    RouterComponent: HashRouter
  });
};

export { MHRouter, MRouter, defineRouterConfig, useAddRoutes, useBeforeLeave, useHistory, useRemoveRoutes, useRouter, useUpdateRoutes };
//# sourceMappingURL=index.js.map
