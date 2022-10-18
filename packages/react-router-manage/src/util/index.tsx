import * as React from "react";
import type { To } from "react-router";
import { Navigate, matchPath } from "react-router";
import NoAuth from "../components/NoAuth";
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
  RoutesMapInterI,
  RoutePathCallNullTypeI,
  RouteBranchI,
  PermissionModeType
} from "../type";
import GeneratorHookCom from "../GeneratorHookCom";
import NotFound from "../components/NotFound";
import RedirectChild from "../components/RedirectChild";
import { setChangeable } from "../changeable";
import { proxyRoutesMapFromTarget } from "./proxy";

function getWholePath(path = "", basename = "/", parentPath?: string): string {
  if (path.startsWith(basename)) {
    return path;
  }
  // 根路径
  if (path === basename) {
    return basename;
  }

  if (path.startsWith("/")) {
    if (basename.endsWith("/")) {
      return `${basename}${path.slice(1)}`;
    }
    return `${basename}${path}`;
  }

  if (parentPath) {
    return getWholePath(path, parentPath);
  }

  if (basename.endsWith("/")) {
    return `${basename}${path}`;
  }
  return `${basename}/${path}`;
}

export function cloneRoutes(_routeConfig: {
  routes: RouteTypeI[];
  parent?: RouteTypeInputI;
  basename?: string;
  _level?: number;
}): RouteTypeInputI[] {
  const { routes, parent, basename = "/", _level = 1 } = _routeConfig;
  if (!routes) {
    return [];
  }
  if (!Array.isArray(routes)) {
    Error("MRouter route prop need to type Array<RouteTypeI>");
  }
  function _cloneRoutes(
    _routes: RouteTypeI[] | RoutePathCallNullTypeI[],
    parent?: RouteTypeInputI,
    _level = 1
  ): RouteTypeInputI[] {
    return _routes.map(_route => {
      const { path, items, children, ...resets } = _route;
      const wholePath = getWholePath(path, basename, parent?.path);
      const newRoute: RouteTypeInputI = {
        ...resets,
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

function rankRouteBranches(branches: RouteBranchI[]): void {
  branches.sort((a, b) => b.score - a.score);
}

/**
 *cCalculate some state data
 * @param inputRoutes
 * @param permissionList
 * @returns
 */
export function computedNewState(config: NewStateQueryI): NewStateI {
  const {
    inputRoutes,
    permissionList,
    permissionMode,
    hasAuth,
    beforeEachMount,
    basename,
    location
  } = config;
  const authInputRoutes = computeRoutesConfig({
    routes: inputRoutes,
    permissionList,
    permissionMode,
    hasAuth,
    beforeEachMount
  });
  const flattenBranches = flattenRoutesFn(authInputRoutes, undefined, true);

  /**
   * Calculate routes permission when permissionMode is 'children'
   */
  if (permissionMode === "children" && hasAuth) {
    flattenBranches.forEach(_branch => {
      const route = _branch.route;
      const currentIsHasAuth = route._currentIsHasAuth;
      if (!currentIsHasAuth) {
        return;
      }
      /**
       * If the child route has permission, the parent route also has permission
       */
      let _currentRoute: RouteTypeExtendsI | undefined = route;
      while (_currentRoute) {
        _currentRoute._isHasAuth = true;
        _currentRoute._component = _currentRoute._currentComponent;
        _currentRoute = _currentRoute.parent;
      }
    });
  }
  // mixin into the notFound page
  mixinNotFoundPage(flattenBranches, basename, authInputRoutes);
  rankRouteBranches(flattenBranches);

  const flattenRoutes = flattenBranches.map(i => i.route);
  const routesMap = routesMapFn(flattenBranches);
  const currentRoute = getCurrentRoute(
    location.pathname,
    routesMap,
    flattenRoutes
  );
  const currentPathRoutes = getCurrentPathRoutes(currentRoute);

  return {
    authInputRoutes,
    flattenRoutes: flattenRoutes,
    routesMap,
    currentRoute,
    currentPathRoutes,
    beforeEachMount
  };
}

/**
 * flattenRoutes score use react-router methods
 */

const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s: string) => s === "*";

function computeScore(path: string, index: boolean | undefined): number {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }

  if (index) {
    initialScore += indexRouteValue;
  }

  return segments
    .filter(s => !isSplat(s))
    .reduce(
      (score, segment) =>
        score +
        (paramRe.test(segment)
          ? dynamicSegmentValue
          : segment === ""
          ? emptySegmentValue
          : staticSegmentValue),
      initialScore
    );
}

/**
 * flatten the react router array recursively
 * whether all is true, includes sub routes
 */
export const flattenRoutesFn = (
  arr: RouteTypeExtendsI[],
  parent?: RouteTypeExtendsI,
  all?: boolean
): RouteBranchI[] => {
  return arr.reduce((prev: RouteBranchI[], nextRoute: RouteTypeExtendsI) => {
    if (parent) {
      nextRoute.parent = parent;
    }
    const routeBranch: RouteBranchI = {
      path: nextRoute.path,
      route: nextRoute,
      score: computeScore(nextRoute.path, false)
    };
    if (Array.isArray(nextRoute.items) || Array.isArray(nextRoute.children)) {
      let _routes = prev.concat(routeBranch);
      if (Array.isArray(nextRoute.items)) {
        _routes = _routes.concat(
          flattenRoutesFn(nextRoute.items, nextRoute, all)
        );
      }
      if (Array.isArray(nextRoute.children) && all) {
        _routes = _routes.concat(
          flattenRoutesFn(nextRoute.children, nextRoute, all)
        );
      }
      return _routes;
    } else {
      return prev.concat(routeBranch);
    }
  }, []);
};

// name => mapping of route
export const routesMapFn = (flattenRoutes: RouteBranchI[]): RoutesMapI => {
  const routesInterMap = flattenRoutes.reduce(
    (_routesInterMap: RoutesMapInterI, routeBranch: RouteBranchI) => {
      const { route: nextRoute } = routeBranch;
      const { name, path } = nextRoute;

      if (_routesInterMap[name]) {
        throw new Error(
          `Router config 'name' isn't unique, route name: "${name}", route path: "${path}"`
        );
      }

      // the route has params
      const existPathRoute = _routesInterMap[path] as RouteTypeExtendsI[];
      if (existPathRoute) {
        // 判断上一个是不是真正的路由父级
        const parentAbs = existPathRoute[existPathRoute.length - 1];
        if (parentAbs?.name && parentAbs.name === nextRoute.parentAbs?.name) {
          _routesInterMap[path] = [...existPathRoute, nextRoute];
        } else {
          throw new Error(
            `There are routes at the same level with the same path, route name: "${name}", route path: "${path}"`
          );
        }
      } else {
        _routesInterMap[path] = [nextRoute];
      }

      _routesInterMap[name] = nextRoute;
      return _routesInterMap;
    },
    {} as RoutesMapInterI
  );

  const routesMap = {} as RoutesMapI;
  proxyRoutesMapFromTarget(routesMap, routesInterMap);

  return routesMap;
};

// convert '/a/b/c/' to '/a/b/c'
function getValidPathname(pathname: string) {
  if (!pathname) {
    return pathname;
  }
  if (pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** find the current route object through the path */
export function getCurrentRoute(
  pathname = window.location.pathname,
  routesMap: RoutesMapI,
  flattenRoutes: RouteTypeExtendsI[]
) {
  // console.log(routesMap);
  // first look from the outermost routesMap
  pathname = getValidPathname(pathname);

  let currentRoute = routesMap[pathname];
  // TODO 找通配符的 后续优化
  if (!currentRoute) {
    // 有通配符的路径
    const route = flattenRoutes.find(_route => {
      let match = matchPath({ path: _route.path }, pathname);
      if (match) {
        return true;
      }
      return false;
    });
    if (route) {
      return route;
    }
  }
  if (!currentRoute) {
    // 默认404
    currentRoute = {
      _isHasAuth: true,
      _relativePath: "",
      _level: 0,
      name: "404",
      path: pathname,
      title: "404",
      meta: {},
      component: () => {
        return <NoAuth code="404" />;
      },
      _route: {
        _level: 0,
        _relativePath: "",
        name: "404",
        path: pathname,
        title: "404",
        component: () => {
          return <NoAuth code="404" />;
        }
      }
    };
  }
  return currentRoute;
}

/**
 * Get the route path (a collection of parent routes and child routes)
 * @param currentRoute
 * @returns
 */
export function getCurrentPathRoutes(currentRoute: RouteTypeExtendsI) {
  const routes: RouteTypeExtendsI[] = [];
  let pathRoute: RouteTypeExtendsI | undefined = currentRoute;
  while (pathRoute) {
    routes.unshift(pathRoute);
    pathRoute = pathRoute.parent;
  }
  return routes;
}

export function executeEventCbs(option: {
  to?: RouteTypeExtendsI;
  from?: RouteTypeExtendsI;
  callbacks: RouteCbI[];
  finish: () => void;
}) {
  const { to, from, callbacks, finish } = option;
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

function getIsHasAuthByStrCode(
  code: string,
  permissionList: PermissionListType
) {
  return permissionList.includes(code);
}

function getIsHasAuthByFnCode(code: FnCodeType, route: RouteTypeI) {
  return code(route);
}

/**
 * if `children` is  mode,
 * isHasAuth are calculated after generating `flattroutes`
 */
export function getIsHasAuth({
  code,
  permissionList,
  hasAuth,
  route
}: {
  code: CodeType;
  permissionList: PermissionListType;
  hasAuth: boolean;
  route: RouteTypeI;
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

export function computeRoutesConfig(config: {
  routes: RouteTypeInputI[];
  permissionList?: string[];
  permissionMode: PermissionModeType;
  hasAuth: boolean;
  beforeEachMount?: BeforeEachMountI;
  parent?: RouteTypeExtendsI;
  parentAbs?: RouteTypeExtendsI;
}): RouteTypeExtendsI[] {
  const {
    routes,
    permissionList = [],
    permissionMode,
    hasAuth,
    beforeEachMount,
    parent,
    parentAbs
  } = config;
  return routes.map(route => {
    const {
      component: Component,
      code = "",
      children,
      items,
      beforeEnter,
      redirect,
      meta,
      type
    } = route;
    let _children: RouteTypeExtendsI[] = [];
    let _items: RouteTypeExtendsI[] = [];
    let CurrentComponent = Component;

    if (!CurrentComponent) {
      CurrentComponent = RedirectChild;
    }

    const props = {} as RouteTypePropsI;
    if (beforeEnter || beforeEachMount) {
      props.beforeEnter = beforeEnter;
      props.beforeEachMount = beforeEachMount;
      props.key = route.name; // users switch between routes to avoid incorrect rendering due to the same key after route switching
      props._route = route;

      props.Component = CurrentComponent;
      CurrentComponent = GeneratorHookCom;
    }

    const currentIsHasAuth = getIsHasAuth({
      code,
      permissionList,
      hasAuth,
      route
    });
    // 默认父级无权限，则择机也无权限
    const isHasAuth = parent?._isHasAuth === false ? false : currentIsHasAuth;

    const newRoute: RouteTypeExtendsI = {
      ...route,
      parent,
      parentAbs,
      props,
      meta: meta || {},
      items: [],
      children: [],
      _route: route,
      _isHasAuth: isHasAuth,
      _currentComponent: CurrentComponent,
      _currentIsHasAuth: currentIsHasAuth
    };

    // Process of sub routes
    if (children) {
      _children = computeRoutesConfig({
        routes: children,
        permissionList,
        permissionMode,
        hasAuth,
        beforeEachMount,
        parent: newRoute,
        parentAbs: newRoute
      });
    }
    // Process peer routes
    if (items) {
      _items = computeRoutesConfig({
        routes: items,
        permissionList,
        permissionMode,
        hasAuth,
        beforeEachMount,
        parent: newRoute,
        parentAbs: parentAbs
      });
    }
    const _itemsAndChildren = [..._items, ..._children];

    if (!isHasAuth) {
      const returnRoute = {
        ...newRoute,
        children: _children,
        items: _items,
        _component: NoAuth,
        _itemsAndChildren
      };
      return returnRoute;
    }

    if (redirect) {
      return {
        ...newRoute,
        children: _children,
        items: _items,
        _component: () => <Navigate to={redirect} replace={true} />,
        _itemsAndChildren
      };
    }
    if (type === "null") {
      return {
        ...newRoute,
        children: _children,
        items: _items,
        _component: undefined,
        _itemsAndChildren
      };
    }
    if (CurrentComponent) {
      return {
        ...newRoute,
        children: _children,
        items: _items,
        _component: CurrentComponent,
        _itemsAndChildren
      };
    } else {
      const redirectPath = handleRedirectPath(
        route,
        permissionList,
        hasAuth,
        permissionMode
      );
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
          _itemsAndChildren
        };
      }
      return {
        ...newRoute,
        items: [],
        children: [],
        _component: NoAuth
      };
    }
  });
}

export function getCurrentRouteCbsByEvent(
  routeEvent: RouteEvent,
  pathname: string,
  routeHooks: RouteCbI[]
): RouteCbI[] {
  return routeHooks.filter(i => {
    return i.name === routeEvent && i.pathname === pathname;
  });
}

function pathStartMarkTransform(path: string) {
  if (path === "/") {
    return path;
  }
  return path.replace(/\/*\**$/gm, "");
}

/**
 * when jump route，Remove the '*'
 * @param to
 * @returns
 */
export function getRealTo(to: To): To {
  if (typeof to === "string") {
    return pathStartMarkTransform(to);
  }
  const { pathname } = to;
  if (pathname) {
    return {
      ...to,
      pathname: pathStartMarkTransform(pathname)
    };
  }
  return to;
}

export const handleRedirectPath = (
  route: RouteTypeInputI,
  permissionList: PermissionListType,
  hasAuth: boolean,
  permissionMode: PermissionModeType
): string => {
  // Return to the first menu(route) item with permission
  const { items } = route;
  if (!items) {
    return "";
  }
  // No configuration permission, return to the first one child route
  if (!hasAuth) {
    return items[0].path;
  }
  let redirectPath = "";
  // find the first one route with permission
  for (let i = 0; i < items?.length; i++) {
    const childRoute = items[i];
    const { code, path } = childRoute;
    if (!code) {
      // if code is false, the default is permission
      redirectPath = path;
      break;
    }

    if (
      getIsHasAuth({
        code,
        permissionList,
        hasAuth,
        route: childRoute
      })
    ) {
      redirectPath = path;
      break;
    }
  }
  return redirectPath;
};

export function mixinNotFoundPage(
  flattenBranches: RouteBranchI[],
  basename: string,
  authInputRoutes: RouteTypeExtendsI[]
) {
  const notFoundPath = getWholePath("*", basename);
  const hasNotFoundPage = flattenBranches.some(({ path }) => {
    if (path === notFoundPath) {
      return true;
    }
    return false;
  });
  if (hasNotFoundPage) {
    return;
  }

  const notFoundPage: RouteTypeExtendsI = {
    name: "notFound",
    title: "notFound",
    meta: {},
    path: notFoundPath,
    component: NotFound,
    _isHasAuth: true,
    _component: NotFound,
    _relativePath: notFoundPath,
    _level: 0,
    _route: {
      _relativePath: notFoundPath,
      _level: 0,
      name: "notFound",
      title: "notFound",
      meta: {},
      path: notFoundPath,
      component: NotFound,
    } 
  };
  authInputRoutes.push(notFoundPage);
  flattenBranches.push({
    path: notFoundPath,
    score: flattenBranches.length,
    route: notFoundPage
  });
}

// determine whether it is a react component
// react Components are characterized by functions

export function isComponent(
  component: any
): component is React.ComponentType<any> {
  if (component instanceof Function) {
    return true;
  }
  return false;
}

export function isString(str: any): str is string {
  if (typeof str === "string") {
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
export function defineRouterConfig(
  routerConfig: RouterConfigI
): RouterBaseConfigI {
  const { LoadingComponent, ..._config } = routerConfig;
  _defineId = _defineId + 1;
  if (LoadingComponent) {
    setChangeable({ LoadingComponent });
  }
  /** add '_isDefined' attribute */
  const config: RouterBaseConfigI = {
    ..._config,
    _isDefined: true,
    _defineId: _defineId
  };
  return config;
}

interface ArrayLike<T> extends Array<T> {
  readonly length: number;
  readonly [n: number]: T;
}
type Many<T> = T | ReadonlyArray<T>;

export function flattenArr<T>(ary: ArrayLike<Many<T>> | null | undefined): T[] {
  if (!ary) {
    return [];
  }
  return ary.reduce((pre: T[], cur) => {
    return pre.concat(Array.isArray(cur) ? flattenArr(cur) : cur);
  }, [] as T[]);
}
