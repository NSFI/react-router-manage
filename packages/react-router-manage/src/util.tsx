import * as React from 'react';
import type { To } from 'react-router';
import { Navigate } from 'react-router';
import NoAuth from './components/NoAuth';
import type {
  BeforeEachMountI,
  CodeType,
  FnCodeType,
  PermissionListType,
  RouteCbI,
  RouteEvent,
  RouteTypeExtendsI,
  RouteTypeI,
  RouteTypeInputI,
  RouteTypePropsI,
  RouterConfigI,
  RoutesMapI,
  RouterBaseConfigI,
  NewStateQueryI,
  NewStateI,
} from './type';
import GeneratorHookCom from './GeneratorHookCom';
import NotFound from './components/NotFound';
import { setChangeable } from './changeable';

let incrementKey = 1;
const getIncrementName = () => {
  const name = `__routerName${incrementKey}`;
  incrementKey = incrementKey + 1;
  return name;
};

function getWholePath (path: string, basename = '/', parentPath?: string): string {
  if (path.startsWith(basename)) {
    return path;
  }
  // 根路径
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

export function cloneRoutes (_routeConfig: {
  routes: RouteTypeI[]
  parent?: RouteTypeInputI
  basename?: string
  _level?: number
}): RouteTypeInputI[] {
  const { routes, parent, basename = '/', _level = 1 } = _routeConfig;
  if (!routes) {
    return [];
  }
  if (!Array.isArray(routes)) {
    Error('MRouter route prop need to type Array<RouteTypeI>');
  }
  function _cloneRoutes (_routes: RouteTypeI[], parent?: RouteTypeInputI, _level = 1): RouteTypeInputI[] {
    return _routes.map(_route => {
      const { path, items, children, ...resets } = _route;
      const wholePath = getWholePath(path, basename, parent?.path);
      const newRoute: RouteTypeInputI = {
        ...resets,
        path: getValidPathname(wholePath),
        parent,
        _level,
        _relativePath: path,
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
export function computedNewState (config: NewStateQueryI):NewStateI {
  const { inputRoutes, permissionList, hasAuth, beforeEachMount, basename, location } = config;
  const authInputRoutes = computeRoutesConfig({
    routes: inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount,
  });
  const flattenRoutes = flattenRoutesFn(authInputRoutes, undefined, true);
  // mixin into the notFound page
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
    beforeEachMount,
  };
}

/**
 * flatten the react router array recursively
 * whether all is true, includes sub routes
 */
export const flattenRoutesFn = (
  arr: RouteTypeExtendsI[],
  parent?: RouteTypeExtendsI,
  all?: boolean
): RouteTypeExtendsI[] => {
  return arr.reduce((prev: RouteTypeExtendsI[], nextRoute: RouteTypeExtendsI) => {
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
};

// name => mapping of route
export const routesMapFn = (flattenRoutes: RouteTypeExtendsI[]): RoutesMapI => {
  const routesMap = flattenRoutes.reduce(
    (_routeMap: RoutesMapI, nextRoute: RouteTypeExtendsI) => {
      const { name, path } = nextRoute;
      if (_routeMap[name] || _routeMap[path]) {

        throw new Error(`route config name or path isn't unique, route name: "${name}", route path: "${path}"`);
      }
      // the route has params
      // stored internally '__paramsRoutes' variable
      if (path.includes(':')) {
        const _path = path.replace(/:(\w+)/g, () => {
          return '([^\\/]+)';
        });
        _routeMap.__paramsRoutesMap[_path] = nextRoute;
      }
      _routeMap[name] = _routeMap[path] = nextRoute;
      return _routeMap;
    },
    {
      __paramsRoutesMap: {},
      __flattenRoutes: [] as RouteTypeExtendsI[],
    } as RoutesMapI
  );
  routesMap.__flattenRoutes = flattenRoutes;
  return routesMap;
};

// convert '/a/b/c/' to '/a/b/c'
function getValidPathname (pathname: string) {
  if (!pathname) {
    return pathname;
  }
  if (pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** find the current route object through the path */
export function getCurrentRoute (
  pathname = window.location.pathname,
  routesMap: RoutesMapI
) {
  // console.log(routesMap);
  // first look from the outermost routesMap
  pathname = getValidPathname(pathname);
  let currentRoute = routesMap[pathname];
  // if can't find it, go to find to routesMap.__paramsRoutesMap
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
  }
  // TODO 找通配符的 后续优化
  if (!currentRoute) {
    // 有通配符的路径
    const paths = routesMap.__flattenRoutes.map(i => i.path).filter(i => i.endsWith('*'));
    // find the longest one
    let longerPath = '';
    paths.forEach(path => {
      path = pathStartMarkTransform(path);
      if (!pathname.startsWith(path)) {
        return;
      }
      if (path in routesMap && path.length > longerPath.length) {
        longerPath = path;
      }
      // 匹配 /a/b/c*
      let _path = `${path}*`;
      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      }
      // 匹配 /a/b/c/*
      _path = `${path}/*`;

      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      }

      // 匹配 /a/b/c*
      _path = `${pathname}*`;
      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      }
      // 匹配 /a/b/c/*
      _path = `${pathname}/*`;

      if (_path in routesMap && _path.length > longerPath.length) {
        longerPath = _path;
      }
    });
    if (longerPath) {
      currentRoute = routesMap[longerPath];
    }
  }
  // if (!currentRoute) {
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
        return <NoAuth />;
      },
    };
  }
  return currentRoute;
}

/**
 * 获取路由的路径（父路由和子路由的集合，主要在导航中）
 * @param currentRoute
 * @returns
 */
export function getCurrentPathRoutes (currentRoute: RouteTypeExtendsI) {
  const routes: RouteTypeExtendsI[] = [];
  let pathRoute: RouteTypeExtendsI | undefined = currentRoute;
  while (pathRoute) {
    routes.unshift(pathRoute);
    pathRoute = pathRoute.parent;
  }
  return routes;
}

export function executeEventCbs (option: {
  to?: RouteTypeExtendsI
  from?: RouteTypeExtendsI
  callbacks: RouteCbI[]
  finish: () => void
}) {
  const { to, from, callbacks, finish } = option;
  function executeNextCb (cbIndex = 0) {
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

function getIsHasAuthByStrCode (code: string, permissionList: PermissionListType) {
  return permissionList.includes(code);
}

function getIsHasAuthByFnCode (code: FnCodeType, route: RouteTypeI) {
  return code(route);
}

export function getIsHasAuth ({ code, permissionList, hasAuth, route }: { code: CodeType; permissionList: PermissionListType; hasAuth: boolean; route: RouteTypeI }) {
  if (!hasAuth) { // 未配置权限
    return true;
  }
  if (!code) { // 未配置code默认有权限
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
    return !!(getIsHasAuthByFnCode(code, route));
  }

  return getIsHasAuthByStrCode(code, permissionList);
}

export function computeRoutesConfig (config: {
  routes: RouteTypeInputI[]
  permissionList?: string[]
  hasAuth: boolean
  beforeEachMount?: BeforeEachMountI
  parent?: RouteTypeExtendsI
}): RouteTypeExtendsI[] {
  const { routes, permissionList = [], hasAuth, beforeEachMount, parent } = config;
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
    let _children: RouteTypeExtendsI[] = [];
    let _items: RouteTypeExtendsI[] = [];
    let CurrentComponent = Component;
    const props = {} as RouteTypePropsI;
    if (beforeEnter || beforeEachMount) {
      CurrentComponent = GeneratorHookCom;
      props.beforeEnter = beforeEnter;
      props.beforeEachMount = beforeEachMount;
      props.Component = Component;
      props.key = route.name; // users switch between routes to avoid incorrect rendering due to the same key after route switching
      props._route = route;
    }
    const isHasAuth = getIsHasAuth({ code, permissionList, hasAuth, route });

    const newRoute: RouteTypeExtendsI = {
      ...route,
      parent,
      props,
      meta: meta || {},
      items: [],
      children: [],
      _route: route,
      _isHasAuth: isHasAuth,
    };

    if (!isHasAuth) {
      /**
       * if there is no permission, the children also has no permission
       * /a/b/c 则加入 /a/b/c/*
       */
      let noAuthItems: RouteTypeExtendsI[] = [];
      if (!path.endsWith('*')) {
        const _path = path.endsWith('/') ? `${path}*` : `${path}/*`;
        noAuthItems = [
          {
            meta: {},
            name: getIncrementName(),
            path: _path,
            title: '',
            hidden: true,
            component: NoAuth,
            _level: other._level + 1,
            _route: route,
            _component: NoAuth,
            _relativePath: '*',
          },
        ];
      }
      const returnRoute = {
        ...newRoute,
        items: noAuthItems,
        children: [],
        _component: NoAuth,
      };
      noAuthItems.forEach(i => {
        i.parent = returnRoute;
      });
      return returnRoute;
    }

    // 处理子路由
    if (children) {
      _children = computeRoutesConfig({
        routes: children,
        permissionList,
        hasAuth,
        beforeEachMount,
        parent: newRoute,
      });
    }
    // 处理同级路由
    if (items) {
      _items = computeRoutesConfig({
        routes: items,
        permissionList,
        hasAuth,
        beforeEachMount,
        parent: newRoute,
      });
    }
    const _itemsAndChildren = [..._items, ..._children];
    if (redirect) {
      return {
        ...newRoute,
        children: _children,
        items: _items,
        _component: () => <Navigate to={redirect} replace={true} />,
        _itemsAndChildren,
      };
    }
    if (type === 'null') {
      return {
        ...newRoute,
        children: _children,
        items: _items,
        _component: undefined,
        _itemsAndChildren,
      };
    }
    if (Component) {
      return {
        ...newRoute,
        children: _children,
        items: _items,
        _component: CurrentComponent,
        _itemsAndChildren,
      };
    } else {
      const redirectPath = handleRedirectPath(route, permissionList, hasAuth);
      if (redirectPath) {
        let replace = false;
        // 父级也没配置component，则会进行多次重定向进行replace, 以便浏览器回退行为
        if (!route.parent?.component) {
          replace = true;
        }
        return {
          ...newRoute,
          children: _children,
          items: _items,
          _component: () => <Navigate to={redirectPath} replace={replace} />,
          _itemsAndChildren,
        };
      }
      return {
        ...newRoute,
        items: [],
        children: [],
        _component: NoAuth,
      };
    }
  });
}

export function getCurrentRouteCbsByEvent (
  routeEvent: RouteEvent,
  pathname: string,
  routeHooks: RouteCbI[]
): RouteCbI[] {
  return routeHooks.filter(i => {
    return i.name === routeEvent && i.pathname === pathname;
  });
}

function pathStartMarkTransform (path: string) {
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
export function getRealTo (to: To): To {
  if (typeof to === 'string') {
    return pathStartMarkTransform(to);
  }
  const { pathname } = to;
  if (pathname) {
    return {
      ...to,
      pathname: pathStartMarkTransform(pathname),
    };
  }
  return to;
}

export const handleRedirectPath = (
  route: RouteTypeInputI,
  permissionList: string[],
  hasAuth: boolean
): string => {
  // Return to the first menu(route) item with permission
  const { items } = route;
  if (!items) {
    return '';
  }
  // No configuration permission, return to the first one child route
  if (!hasAuth) {
    return items[0].path;
  }
  let redirectPath = '';
  // find the first one route with permission
  for (let i = 0; i < items?.length; i++) {
    const childRoute = items[i];
    const { code, path } = childRoute;
    if (!code) {
      // if code is false, the default is permission
      redirectPath = path;
      break;
    }

    if (getIsHasAuth({ code, permissionList, hasAuth, route: childRoute })) {
      redirectPath = path;
      break;
    }
  }
  return redirectPath;
};

export function mixinNotFoundPage (
  flattenRoutes: RouteTypeExtendsI[],
  basename: string,
  authInputRoutes: RouteTypeExtendsI[]
) {
  const notFoundPath = getWholePath('*', basename);
  const hasNotFoundPage = flattenRoutes.some(({ path }) => {
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
    _level: 0,
  };
  authInputRoutes.push(notFoundPage);
  flattenRoutes.push(notFoundPage);
}

// determine whether it is a react component
// react Components are characterized by functions

export function isComponent (component: any): component is React.ComponentType<any> {
  if (component instanceof Function) {
    return true;
  }
  return false;
}

export function isString (str: any): str is string {
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
export function defineRouterConfig (routerConfig: RouterConfigI): RouterBaseConfigI {
  const { LoadingComponent, ..._config } = routerConfig;
  _defineId = _defineId + 1;
  if (LoadingComponent) {
    setChangeable({LoadingComponent})
  }
  /** add '_isDefined' attribute */
  const config: RouterBaseConfigI = {..._config, _isDefined: true, _defineId: _defineId}
  return config;
}

interface ArrayLike<T> extends Array<T> {
  readonly length: number
  readonly [n: number]: T
}
type Many<T> = T | ReadonlyArray<T>;

export function flattenArr<T> (ary: ArrayLike<Many<T>> | null | undefined): T[] {
  if (!ary) {
    return [];
  }
  return ary.reduce((pre: T[], cur) => {
    return pre.concat(Array.isArray(cur) ? flattenArr(cur) : cur);
  }, [] as T[]);
}


