import * as React from 'react';
import type { To } from 'react-router';
import type { BeforeEachMountI, CodeType, PermissionListType, RouteCbI, RouteEvent, RouteTypeExtendsI, RouteTypeI, RouteTypeInputI, RouterConfigI, RoutesMapI, RouterBaseConfigI, NewStateQueryI, NewStateI } from './type';
export declare function cloneRoutes(_routeConfig: {
    routes: RouteTypeI[];
    parent?: RouteTypeInputI;
    basename?: string;
    _level?: number;
}): RouteTypeInputI[];
/**
 *cCalculate some state data
 * @param inputRoutes
 * @param permissionList
 * @returns
 */
export declare function computedNewState(config: NewStateQueryI): NewStateI;
/**
 * flatten the react router array recursively
 * whether all is true, includes sub routes
 */
export declare const flattenRoutesFn: (arr: RouteTypeExtendsI[], parent?: RouteTypeExtendsI, all?: boolean) => RouteTypeExtendsI[];
export declare const routesMapFn: (flattenRoutes: RouteTypeExtendsI[]) => RoutesMapI;
/** find the current route object through the path */
export declare function getCurrentRoute(pathname: string | undefined, routesMap: RoutesMapI): RouteTypeExtendsI;
/**
 * 获取路由的路径（父路由和子路由的集合，主要在导航中）
 * @param currentRoute
 * @returns
 */
export declare function getCurrentPathRoutes(currentRoute: RouteTypeExtendsI): RouteTypeExtendsI[];
export declare function executeEventCbs(option: {
    to?: RouteTypeExtendsI;
    from?: RouteTypeExtendsI;
    callbacks: RouteCbI[];
    finish: () => void;
}): void;
export declare function getIsHasAuth({ code, permissionList, hasAuth, route }: {
    code: CodeType;
    permissionList: PermissionListType;
    hasAuth: boolean;
    route: RouteTypeI;
}): boolean;
export declare function computeRoutesConfig(config: {
    routes: RouteTypeInputI[];
    permissionList?: string[];
    hasAuth: boolean;
    beforeEachMount?: BeforeEachMountI;
    parent?: RouteTypeExtendsI;
}): RouteTypeExtendsI[];
export declare function getCurrentRouteCbsByEvent(routeEvent: RouteEvent, pathname: string, routeHooks: RouteCbI[]): RouteCbI[];
/**
 * when jump route，Remove the '*'
 * @param to
 * @returns
 */
export declare function getRealTo(to: To): To;
export declare const handleRedirectPath: (route: RouteTypeInputI, permissionList: string[], hasAuth: boolean) => string;
export declare function mixinNotFoundPage(flattenRoutes: RouteTypeExtendsI[], basename: string, authInputRoutes: RouteTypeExtendsI[]): void;
export declare function isComponent(component: any): component is React.ComponentType<any>;
export declare function isString(str: any): str is string;
export declare function defineRouterConfig(routerConfig: RouterConfigI): RouterBaseConfigI;
interface ArrayLike<T> extends Array<T> {
    readonly length: number;
    readonly [n: number]: T;
}
declare type Many<T> = T | ReadonlyArray<T>;
export declare function flattenArr<T>(ary: ArrayLike<Many<T>> | null | undefined): T[];
export {};
