import type { NavigateOptions, To } from "react-router-dom";
import type { ParsedQuery } from "query-string";
import type { BrowserHistory, Location } from "history";
import * as React from "react";
export interface RouterBaseConfigI {
    routes: RouteTypeI[];
    basename?: string;
    beforeEachMount?: BeforeEachMountI;
    autoDocumentTitle?: boolean | ((currentPathRoutes: RouteTypeExtendsI[]) => string);
    _isDefined: boolean;
    _defineId: number;
}
export interface RouterConfigI extends Omit<RouterBaseConfigI, "_isDefined"> {
    /** Lazy component or before next called */
    LoadingComponent?: React.FunctionComponent<any>;
}
export declare type PermissionListType = string[];
export declare type CodeType = string | string[] | FnCodeType;
export declare type FnCodeType = (route: RouteTypeI) => boolean;
export declare type NextOptionsType = {
    name?: string;
    path?: string;
} | React.ComponentType<any>;
export interface BeforeEachMountI {
    (to: RouteTypeI, next: (nextOptionsType?: NextOptionsType) => void): void;
}
export interface BeforeEachEnterI {
    (to: RouteTypeI, next: (nextOptionsType?: NextOptionsType) => void): void;
}
export declare enum RouteNavTypeEnum {
    menu = 0,
    step = 1
}
export interface BeforeEnterI {
    (to: RouteTypeI | undefined, next: (nextOptionsType?: NextOptionsType) => void): void;
}
export interface BeforeLeaveI {
    (to: RouteTypeI | undefined, from: RouteTypeI | undefined, next: (ReplaceComponent?: any) => void): void;
}
export interface RouteTypePropsI {
    beforeEachMount?: BeforeEachMountI;
    beforeEnter?: BeforeEnterI;
    [prop: string]: any;
}
export declare type RouteComponentType = React.LazyExoticComponent<any> | React.FC<any>;
export interface RouteTypeI {
    name: string;
    path: string;
    component?: RouteComponentType;
    beforeEnter?: BeforeEnterI;
    beforeLeave?: BeforeLeaveI;
    items?: RouteTypeI[];
    children?: RouteTypeI[];
    title?: string;
    hidden?: boolean;
    icon?: string;
    code?: CodeType;
    parentName?: string;
    fullscreen?: boolean;
    props?: RouteTypePropsI;
    redirect?: string;
    type?: "real" | "null";
    meta?: Record<string, any>;
}
export interface RouteTypeInputI extends RouteTypeI {
    _relativePath: string;
    _level: number;
    items?: RouteTypeInputI[];
    children?: RouteTypeInputI[];
    parent?: RouteTypeInputI;
}
export interface RouteTypeExtendsI extends RouteTypeInputI {
    parent?: RouteTypeExtendsI;
    meta: Record<string, any>;
    items?: RouteTypeExtendsI[];
    children?: RouteTypeExtendsI[];
    _route?: RouteTypeInputI;
    _component?: RouteComponentType;
    _isHasAuth?: boolean;
    _itemsAndChildren?: RouteTypeExtendsI[];
}
export declare enum RouterActionEnum {
    UPDATE_INPUT_ROUTES = "UPDATE_INPUT_ROUTES",
    UPDATE_CURRENT_ROUTE = "UPDATE_CURRENT_ROUTE",
    UPDATE_STATE = "UPDATE_STATE",
    ADD_ROUTES = "ADD_ROUTES",
    REMOVE_ROUTES = "REMOVE_ROUTES",
    UPDATE_ROUTES = "UPDATE_ROUTES"
}
export interface Action {
    type: RouterActionEnum;
    payload?: any;
    dispatch?: React.Dispatch<Action>;
}
export interface MRouterStateI {
    basename: string;
    inputRoutes: RouteTypeInputI[];
    authInputRoutes: RouteTypeExtendsI[];
    routesMap: RoutesMapI;
    flattenRoutes: RouteTypeExtendsI[];
    currentRoute: RouteTypeExtendsI;
    currentPathRoutes: RouteTypeExtendsI[];
    prevRoute?: RouteTypeExtendsI;
    permissionList?: string[];
    hasAuth?: boolean;
    beforeEachMount?: BeforeEachMountI;
    _getNewStateByNewInputRoutes: (_inputRoutes: RouteTypeInputI[]) => NewStateI;
}
export interface AddRoutesI {
    (routes: RouteTypeI[]): void;
}
export interface RemoveRoutesI {
    (routeNames: string[]): void;
}
export interface UpdateRoutesI {
    (routes: {
        routeName: string;
        routeData: Partial<RouteTypeI>;
    }[]): void;
}
export interface MRouterMethodsI {
    addRoutes: AddRoutesI;
    updateCurrentRoute: (currentRoute: RouteTypeExtendsI) => void;
    removeRoutes: RemoveRoutesI;
    updateRoutes: UpdateRoutesI;
    [method: string]: any;
}
export interface MRouterContextObject {
    state: MRouterStateI;
    methods: MRouterMethodsI;
}
export interface RoutesBaseStateStruct {
    routesMap: RoutesMapI;
    routes: RouteTypeI[];
    flattenRoutes: RouteTypeI[];
    basename?: string;
}
export interface ExtraNavigateOptions extends NavigateOptions {
    params?: Record<string, any>;
    query?: Record<string, any>;
}
export interface NavigateFunction {
    (to: To, options?: ExtraNavigateOptions): void;
    (delta: number): void;
}
export interface RoutesStateStruct extends RoutesBaseStateStruct {
    navigate: NavigateFunction;
    location: Location;
    currentRoute: RouteTypeExtendsI;
    authRoutes: RouteTypeExtendsI[];
    query: ParsedQuery<string>;
    params: Record<string, number | string>;
}
export declare type RouteEvent = "BeforeRouterLeave" | "AfterRouterEnter";
export interface RouteCbI {
    fn: BeforeLeaveI;
    name: RouteEvent;
    pathname: string;
}
export interface RouteConfig {
    path: string;
    element?: React.ReactNode;
    children?: RouteConfig[];
}
export interface RouteHistoryObject {
    history: BrowserHistory;
    historyMethods: {
        push(to: To, state?: any): void;
        replace(to: To, state?: any): void;
        go(delta: number): void;
        back(): void;
        forward(): void;
    };
    routeHooks: RouteCbI[];
    routeHooksRef: React.MutableRefObject<RouteCbI[]>;
}
export interface BaseRoutesMapI extends Record<string, RouteTypeExtendsI> {
}
export declare type RoutesMapI = BaseRoutesMapI & {
    __paramsRoutesMap: Record<string, RouteTypeExtendsI>;
    __flattenRoutes: RouteTypeExtendsI[];
};
export interface NewStateQueryI {
    inputRoutes: RouteTypeInputI[];
    permissionList?: string[];
    hasAuth: boolean;
    beforeEachMount?: BeforeEachMountI;
    basename: string;
    location: Location;
}
export interface NewStateI {
    authInputRoutes: RouteTypeExtendsI[];
    flattenRoutes: RouteTypeExtendsI[];
    routesMap: RoutesMapI;
    currentRoute: RouteTypeExtendsI;
    currentPathRoutes: RouteTypeExtendsI[];
    beforeEachMount?: BeforeEachMountI | undefined;
}
