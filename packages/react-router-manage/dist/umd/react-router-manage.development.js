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
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react-router-dom'), require('react'), require('react-router'), require('query-string'), require('react-dom'), require('@remix-run/router')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react-router-dom', 'react', 'react-router', 'query-string', 'react-dom', '@remix-run/router'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterManage = {}, global.ReactRouterDOM, global.React, global.ReactRouter, global.queryString, global.reactDom, global.Router));
})(this, (function (exports, reactRouterDom, React, reactRouter, queryString, reactDom, router) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };
    return _extends.apply(this, arguments);
  }

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
    return /*#__PURE__*/React__namespace.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        height: '100%',
        flexDirection: 'column',
        borderRadius: 8
      }
    }, /*#__PURE__*/React__namespace.createElement("img", {
      alt: config.title,
      width: 200,
      src: config?.img
    }), /*#__PURE__*/React__namespace.createElement("div", {
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

    if (name === currentRoute.name) {
      if (Component) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return /*#__PURE__*/React__namespace.createElement(Component, null);
      }

      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null);
    }

    return /*#__PURE__*/React__namespace.createElement(reactRouterDom.Navigate, {
      to: targetRoute.path || ''
    });
  };

  const Spin = ({
    tip = "加载中"
  }) => {
    return /*#__PURE__*/React__namespace.createElement("div", null, tip);
  };

  const LoadingCmp = () => /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Spin, {
    tip: "\u5E94\u7528\u6B63\u5728\u52A0\u8F7D\u4E2D\u2026"
  }));
  /**
   * LoadingComponent Define the Suspense component's fallback and beforeEnter when a component is loaded, 
   * and the state component when calling next
   */


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
        return /*#__PURE__*/React__namespace.createElement(reactRouterDom.Navigate, {
          to: options.path
        });
      }; // @ts-ignore

    } else if (isString(options.name)) {
      // if there is no path, use name
      ReplaceComponent = function Redirect() {
        // @ts-ignore
        return /*#__PURE__*/React__namespace.createElement(NameRedirect, {
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
    const [CurrentComponent, setCurrentComponent] = React.useState({
      Component: undefined
    });
    const {
      currentRoute
    } = useRouter();
    React.useLayoutEffect(() => {
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
    return CurrentComponent.Component ? /*#__PURE__*/React__namespace.createElement(CurrentComponent.Component, null) : /*#__PURE__*/React__namespace.createElement(LoadingCmp, null);
  };

  const NotFound = () => {
    return /*#__PURE__*/React__namespace.createElement(NoAuth, {
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
          return /*#__PURE__*/React__namespace.createElement(NoAuth, null);
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
          _component: () => /*#__PURE__*/React__namespace.createElement(reactRouter.Navigate, {
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
            _component: () => /*#__PURE__*/React__namespace.createElement(reactRouter.Navigate, {
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

  const MRouterHistoryContext = /*#__PURE__*/React__namespace.createContext(null);
  MRouterHistoryContext.displayName = 'MRouterHistoryContext';
  function useHistory() {
    return React__namespace.useContext(MRouterHistoryContext).history;
  }
  function useRouteHooksRef() {
    return React__namespace.useContext(MRouterHistoryContext).routeHooksRef;
  }
  function useHistoryMethods() {
    return React__namespace.useContext(MRouterHistoryContext).historyMethods;
  }

  /**
   * A `<Router>` for use in web browsers. Provides the cleanest URLs.
   */

  function BrowserRouter({
    basename,
    children,
    syncUpdateCurrentRoute
  }) {
    const historyRef = React__namespace.useRef(null);
    const routeHooksRef = React__namespace.useRef(null);

    if (historyRef.current == null) {
      historyRef.current = router.createBrowserHistory({
        window
      });
      routeHooksRef.current = [];
    }

    const historyContext = React.useMemo(() => {
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
    const [state, setState] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    React__namespace.useLayoutEffect(() => {
      let mounted = true;
      history.listen(routeData => {
        const {
          location
        } = routeData;

        if (!mounted) {
          return;
        }

        reactDom.unstable_batchedUpdates(() => {
          setState(routeData);
          syncUpdateCurrentRoute(location);
        });
      });
      return () => {
        mounted = false;
      };
    }, [history, syncUpdateCurrentRoute]);
    return /*#__PURE__*/React__namespace.createElement(MRouterHistoryContext.Provider, {
      value: historyContext
    }, /*#__PURE__*/React__namespace.createElement(reactRouterDom.Router, {
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
    const historyRef = React__namespace.useRef(null);
    const routeHooksRef = React__namespace.useRef(null);

    if (historyRef.current == null) {
      historyRef.current = router.createHashHistory({
        window
      });
      routeHooksRef.current = [];
    }

    const historyContext = React.useMemo(() => {
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
    const [state, setState] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    React__namespace.useLayoutEffect(() => {
      let mounted = true;
      history.listen(routeData => {
        const {
          location
        } = routeData;

        if (!mounted) {
          return;
        }

        reactDom.unstable_batchedUpdates(() => {
          setState(routeData);
          syncUpdateCurrentRoute(location);
        });
      });
      return () => {
        mounted = false;
      };
    }, [history, syncUpdateCurrentRoute]);
    return /*#__PURE__*/React__namespace.createElement(MRouterHistoryContext.Provider, {
      value: historyContext
    }, /*#__PURE__*/React__namespace.createElement(reactRouterDom.Router, {
      basename: basename,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }, children));
  }

  // iff a component is configured, it will be rendered
  // global route entry hook
  let RouteNavTypeEnum;

  (function (RouteNavTypeEnum) {
    RouteNavTypeEnum[RouteNavTypeEnum["menu"] = 0] = "menu";
    RouteNavTypeEnum[RouteNavTypeEnum["step"] = 1] = "step";
  })(RouteNavTypeEnum || (RouteNavTypeEnum = {}));

  let RouterActionEnum;

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

  const MRouterContext = /*#__PURE__*/React__namespace.createContext({
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
    return React__namespace.useContext(MRouterContext).state;
  }
  /** Dynamically add routing method */

  function useAddRoutes() {
    return React__namespace.useContext(MRouterContext).methods.addRoutes;
  }
  function useRemoveRoutes() {
    return React__namespace.useContext(MRouterContext).methods.removeRoutes;
  }
  function useUpdateRoutes() {
    return React__namespace.useContext(MRouterContext).methods.updateRoutes;
  }

  const DEFAULT_PERMISSION_LIST = [];

  function useBeforeLeave(fn) {
    const pathname = window.location.pathname;
    const routeHooksRef = useRouteHooksRef();
    React.useLayoutEffect(() => {
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
    const oldNavigate = reactRouter.useNavigate();
    const newCallback = React.useCallback((to, options = {}) => {
      if (options?.params && typeof to === "string") {
        to = reactRouter.generatePath(to, options.params);
      } // query写入地址栏


      if (options?.query && typeof to === "string") {
        let path = to;
        const queryStr = queryString.stringify(options.query);

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
    const location = reactRouter.useLocation();
    const routesMapRef = React.useRef({});
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

    const search = React.useMemo(() => {
      return queryString.parse(location.search);
    }, [location.search]);
    const routerParams = reactRouter.useParams();
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
    const location = reactRouter.useLocation();
    const locationRef = React.useRef(location);
    const oldHistoryMethods = useHistoryMethods();
    const routeHooksRef = useRouteHooksRef();
    const {
      routes = [],
      basename = "/",
      beforeEachMount,
      autoDocumentTitle = false
    } = routerConfig;
    const inputRoutes = React.useMemo(() => {
      return cloneRoutes({
        routes,
        basename
      });
    }, [basename, routes]);
    const inputRoutesRef = React.useRef(inputRoutes);
    const [initialState] = React.useState(getInitialState({
      inputRoutes,
      permissionList,
      hasAuth,
      beforeEachMount,
      basename,
      location: locationRef.current,
      _defineId: routerConfig._defineId
    }));
    const getNewStateByNewInputRoutesRef = React.useRef(null);

    const _getNewStateByNewInputRoutes = React.useCallback(_inputRoutes => {
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

    const [state, dispatch] = React.useReducer(MRouterReducer, { ...initialState,
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

    React.useImperativeHandle(ref, () => {
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
    React.useLayoutEffect(() => {
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

    React.useEffect(() => {
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
    const allExecuteEventCbs = React.useCallback((historyCb, to) => {
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
    React.useLayoutEffect(() => {
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
    const addRoutes = React.useCallback(newRoutes => {
      dispatch({
        type: RouterActionEnum.ADD_ROUTES,
        payload: newRoutes
      });
    }, []);
    const removeRoutes = React.useCallback(routeNames => {
      dispatch({
        type: RouterActionEnum.REMOVE_ROUTES,
        payload: routeNames
      });
    }, []);
    const updateRoutes = React.useCallback(routes => {
      dispatch({
        type: RouterActionEnum.UPDATE_ROUTES,
        payload: routes
      });
    }, []);
    const updateCurrentRoute = React.useCallback(currentRoute => {
      if (!currentRoute) {
        return;
      }

      dispatch({
        type: RouterActionEnum.UPDATE_CURRENT_ROUTE,
        payload: currentRoute
      });
    }, []);
    const routesConfig = React.useMemo(() => {
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
                element: /*#__PURE__*/React__namespace.createElement(React.Suspense, {
                  fallback: /*#__PURE__*/React__namespace.createElement(LoadingCmp, null)
                }, /*#__PURE__*/React__namespace.createElement(Component, props))
              };
            }

            _routeConfig = {
              path,
              element: /*#__PURE__*/React__namespace.createElement(React.Suspense, {
                fallback: LoadingCmp
              }, /*#__PURE__*/React__namespace.createElement(Component, props))
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
    const routesChildren = reactRouter.useRoutes(routesConfig);
    const renders = React.useMemo(() => {
      return children ? children(routesChildren) : routesChildren;
    }, [children, routesChildren]);
    return /*#__PURE__*/React__namespace.createElement(MRouterContext.Provider, {
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

  const MRouterContextProvider = /*#__PURE__*/React__namespace.forwardRef(InternalMRouterContextProvider);
  MRouterContextProvider.displayName = "MRouterContextProvider";

  const CoreRouter = ({
    permissionList,
    wrapComponent: WrapComponent,
    hasAuth = true,
    routerConfig,
    children,
    RouterComponent
  }) => {
    const syncUpdateCurrentRouteRef = React.useRef(null);
    const syncUpdateCurrentRoute = React.useCallback(location => {
      syncUpdateCurrentRouteRef.current?.updateCurrentRoute?.(location);
    }, []);

    {
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

    const _children = React.useMemo(() => {
      if (children && typeof children === "function") {
        return children;
      }

      if (WrapComponent) {
        WrapComponent.displayName = "WrapComponent";
        return function wrapComponent(children) {
          return /*#__PURE__*/React__namespace.createElement(WrapComponent, null, children);
        };
      }
    }, [WrapComponent, children]);

    return /*#__PURE__*/React__namespace.createElement(RouterComponent, {
      syncUpdateCurrentRoute: syncUpdateCurrentRoute
    }, /*#__PURE__*/React__namespace.createElement(MRouterContextProvider, {
      routerConfig: routerConfig,
      permissionList: permissionList,
      hasAuth: hasAuth,
      ref: syncUpdateCurrentRouteRef
    }, _children));
  };

  const MRouter = props => {
    return /*#__PURE__*/React__namespace.createElement(CoreRouter, _extends({}, props, {
      RouterComponent: BrowserRouter
    }));
  };

  const MHRouter = props => {
    return /*#__PURE__*/React__namespace.createElement(CoreRouter, _extends({}, props, {
      RouterComponent: HashRouter
    }));
  };

  Object.defineProperty(exports, 'AbortedDeferredError', {
    enumerable: true,
    get: function () { return reactRouterDom.AbortedDeferredError; }
  });
  Object.defineProperty(exports, 'Await', {
    enumerable: true,
    get: function () { return reactRouterDom.Await; }
  });
  Object.defineProperty(exports, 'Form', {
    enumerable: true,
    get: function () { return reactRouterDom.Form; }
  });
  Object.defineProperty(exports, 'Link', {
    enumerable: true,
    get: function () { return reactRouterDom.Link; }
  });
  Object.defineProperty(exports, 'MemoryRouter', {
    enumerable: true,
    get: function () { return reactRouterDom.MemoryRouter; }
  });
  Object.defineProperty(exports, 'NavLink', {
    enumerable: true,
    get: function () { return reactRouterDom.NavLink; }
  });
  Object.defineProperty(exports, 'Navigate', {
    enumerable: true,
    get: function () { return reactRouterDom.Navigate; }
  });
  Object.defineProperty(exports, 'NavigationType', {
    enumerable: true,
    get: function () { return reactRouterDom.NavigationType; }
  });
  Object.defineProperty(exports, 'Outlet', {
    enumerable: true,
    get: function () { return reactRouterDom.Outlet; }
  });
  Object.defineProperty(exports, 'Route', {
    enumerable: true,
    get: function () { return reactRouterDom.Route; }
  });
  Object.defineProperty(exports, 'Router', {
    enumerable: true,
    get: function () { return reactRouterDom.Router; }
  });
  Object.defineProperty(exports, 'RouterProvider', {
    enumerable: true,
    get: function () { return reactRouterDom.RouterProvider; }
  });
  Object.defineProperty(exports, 'Routes', {
    enumerable: true,
    get: function () { return reactRouterDom.Routes; }
  });
  Object.defineProperty(exports, 'ScrollRestoration', {
    enumerable: true,
    get: function () { return reactRouterDom.ScrollRestoration; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterContext', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_DataRouterContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterStateContext', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_DataRouterStateContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataStaticRouterContext', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_DataStaticRouterContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_LocationContext', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_LocationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_NavigationContext', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_NavigationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_RouteContext', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_RouteContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_enhanceManualRouteObjects', {
    enumerable: true,
    get: function () { return reactRouterDom.UNSAFE_enhanceManualRouteObjects; }
  });
  Object.defineProperty(exports, 'createBrowserRouter', {
    enumerable: true,
    get: function () { return reactRouterDom.createBrowserRouter; }
  });
  Object.defineProperty(exports, 'createHashRouter', {
    enumerable: true,
    get: function () { return reactRouterDom.createHashRouter; }
  });
  Object.defineProperty(exports, 'createMemoryRouter', {
    enumerable: true,
    get: function () { return reactRouterDom.createMemoryRouter; }
  });
  Object.defineProperty(exports, 'createPath', {
    enumerable: true,
    get: function () { return reactRouterDom.createPath; }
  });
  Object.defineProperty(exports, 'createRoutesFromChildren', {
    enumerable: true,
    get: function () { return reactRouterDom.createRoutesFromChildren; }
  });
  Object.defineProperty(exports, 'createRoutesFromElements', {
    enumerable: true,
    get: function () { return reactRouterDom.createRoutesFromElements; }
  });
  Object.defineProperty(exports, 'createSearchParams', {
    enumerable: true,
    get: function () { return reactRouterDom.createSearchParams; }
  });
  Object.defineProperty(exports, 'defer', {
    enumerable: true,
    get: function () { return reactRouterDom.defer; }
  });
  Object.defineProperty(exports, 'generatePath', {
    enumerable: true,
    get: function () { return reactRouterDom.generatePath; }
  });
  Object.defineProperty(exports, 'isRouteErrorResponse', {
    enumerable: true,
    get: function () { return reactRouterDom.isRouteErrorResponse; }
  });
  Object.defineProperty(exports, 'json', {
    enumerable: true,
    get: function () { return reactRouterDom.json; }
  });
  Object.defineProperty(exports, 'matchPath', {
    enumerable: true,
    get: function () { return reactRouterDom.matchPath; }
  });
  Object.defineProperty(exports, 'matchRoutes', {
    enumerable: true,
    get: function () { return reactRouterDom.matchRoutes; }
  });
  Object.defineProperty(exports, 'parsePath', {
    enumerable: true,
    get: function () { return reactRouterDom.parsePath; }
  });
  Object.defineProperty(exports, 'redirect', {
    enumerable: true,
    get: function () { return reactRouterDom.redirect; }
  });
  Object.defineProperty(exports, 'renderMatches', {
    enumerable: true,
    get: function () { return reactRouterDom.renderMatches; }
  });
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () { return reactRouterDom.resolvePath; }
  });
  Object.defineProperty(exports, 'useActionData', {
    enumerable: true,
    get: function () { return reactRouterDom.useActionData; }
  });
  Object.defineProperty(exports, 'useAsyncError', {
    enumerable: true,
    get: function () { return reactRouterDom.useAsyncError; }
  });
  Object.defineProperty(exports, 'useAsyncValue', {
    enumerable: true,
    get: function () { return reactRouterDom.useAsyncValue; }
  });
  Object.defineProperty(exports, 'useFetcher', {
    enumerable: true,
    get: function () { return reactRouterDom.useFetcher; }
  });
  Object.defineProperty(exports, 'useFetchers', {
    enumerable: true,
    get: function () { return reactRouterDom.useFetchers; }
  });
  Object.defineProperty(exports, 'useFormAction', {
    enumerable: true,
    get: function () { return reactRouterDom.useFormAction; }
  });
  Object.defineProperty(exports, 'useHref', {
    enumerable: true,
    get: function () { return reactRouterDom.useHref; }
  });
  Object.defineProperty(exports, 'useInRouterContext', {
    enumerable: true,
    get: function () { return reactRouterDom.useInRouterContext; }
  });
  Object.defineProperty(exports, 'useLoaderData', {
    enumerable: true,
    get: function () { return reactRouterDom.useLoaderData; }
  });
  Object.defineProperty(exports, 'useLocation', {
    enumerable: true,
    get: function () { return reactRouterDom.useLocation; }
  });
  Object.defineProperty(exports, 'useMatch', {
    enumerable: true,
    get: function () { return reactRouterDom.useMatch; }
  });
  Object.defineProperty(exports, 'useMatches', {
    enumerable: true,
    get: function () { return reactRouterDom.useMatches; }
  });
  Object.defineProperty(exports, 'useNavigate', {
    enumerable: true,
    get: function () { return reactRouterDom.useNavigate; }
  });
  Object.defineProperty(exports, 'useNavigation', {
    enumerable: true,
    get: function () { return reactRouterDom.useNavigation; }
  });
  Object.defineProperty(exports, 'useNavigationType', {
    enumerable: true,
    get: function () { return reactRouterDom.useNavigationType; }
  });
  Object.defineProperty(exports, 'useOutlet', {
    enumerable: true,
    get: function () { return reactRouterDom.useOutlet; }
  });
  Object.defineProperty(exports, 'useOutletContext', {
    enumerable: true,
    get: function () { return reactRouterDom.useOutletContext; }
  });
  Object.defineProperty(exports, 'useParams', {
    enumerable: true,
    get: function () { return reactRouterDom.useParams; }
  });
  Object.defineProperty(exports, 'useResolvedPath', {
    enumerable: true,
    get: function () { return reactRouterDom.useResolvedPath; }
  });
  Object.defineProperty(exports, 'useRevalidator', {
    enumerable: true,
    get: function () { return reactRouterDom.useRevalidator; }
  });
  Object.defineProperty(exports, 'useRouteError', {
    enumerable: true,
    get: function () { return reactRouterDom.useRouteError; }
  });
  Object.defineProperty(exports, 'useRouteLoaderData', {
    enumerable: true,
    get: function () { return reactRouterDom.useRouteLoaderData; }
  });
  Object.defineProperty(exports, 'useRoutes', {
    enumerable: true,
    get: function () { return reactRouterDom.useRoutes; }
  });
  Object.defineProperty(exports, 'useSearchParams', {
    enumerable: true,
    get: function () { return reactRouterDom.useSearchParams; }
  });
  exports.MHRouter = MHRouter;
  exports.MRouter = MRouter;
  exports.defineRouterConfig = defineRouterConfig;
  exports.useAddRoutes = useAddRoutes;
  exports.useBeforeLeave = useBeforeLeave;
  exports.useHistory = useHistory;
  exports.useRemoveRoutes = useRemoveRoutes;
  exports.useRouter = useRouter;
  exports.useUpdateRoutes = useUpdateRoutes;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-router-manage.development.js.map
