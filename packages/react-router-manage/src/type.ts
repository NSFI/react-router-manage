import type { NavigateOptions, To } from "react-router-dom";
import type { ParsedQuery } from "query-string";
import type { BrowserHistory, HashHistory, Location } from "@remix-run/router";
import * as React from "react";

// because react-router v6.4 hasn't api 'history.back' and 'history.forward'
export interface OldBrowserHistory extends BrowserHistory {
  back: () => void;
  forward: () => void;
}
export interface OldHashHistory extends HashHistory {
  back: () => void;
  forward: () => void;
}

export interface RouterBaseConfigI {
  routes: RouteTypeI[];
  basename?: string;
  beforeEachMount?: BeforeEachMountI;
  // the title of the document changes depending on the route switch
  autoDocumentTitle?:
    | boolean
    | ((currentPathRoutes: RouteTypeExtendsI[]) => string);
  _isDefined: boolean; // 是否是defined的
  _defineId: number;
}

export interface RouterConfigI
  extends Omit<RouterBaseConfigI, "_isDefined" | "_defineId"> {
  /** Lazy component or before next called */
  LoadingComponent?: React.FunctionComponent<any>;
  // beforeEachEnter?: BeforeEachEnterI;
}

export type PermissionListType = string[];
export type CodeType = string | string[] | FnCodeType;
export type FnCodeType = (route: RouteTypeI) => boolean;

export type NextOptionsType =
  | {
      name?: string; // if name is configured, it will jump to the route corresponding to the route configuration
      path?: string; // path
    }
  | React.ComponentType<any>; // iff a component is configured, it will be rendered

// global route entry hook
export interface BeforeEachMountI {
  (to: RouteTypeI, next: (nextOptionsType?: NextOptionsType) => void): void;
}

export interface BeforeEachEnterI {
  (to: RouteTypeI, next: (nextOptionsType?: NextOptionsType) => void): void;
}

export enum RouteNavTypeEnum {
  menu,
  step
}
export interface BeforeEnterI {
  (
    to: RouteTypeI | undefined,
    next: (nextOptionsType?: NextOptionsType) => void
  ): void;
}

export interface BeforeLeaveI {
  (
    to: RouteTypeI | undefined,
    from: RouteTypeI | undefined,
    next: (ReplaceComponent?: any) => void
  ): void;
}
export interface RouteTypePropsI {
  beforeEachMount?: BeforeEachMountI;
  beforeEnter?: BeforeEnterI;
  [prop: string]: any;
}

export type RouteComponentType = React.LazyExoticComponent<any> | React.FC<any>;

type Simplify<T> = {
  [P in keyof T]: T[P];
}

type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>

export type RoutePathCallNullTypeI = SetOptional<RouteTypeI, 'path'>

export interface RouteTypeI {
  name: string;
  path: string;
  // index?: boolean;
  component?: RouteComponentType;

  beforeEnter?: BeforeEnterI;
  beforeLeave?: BeforeLeaveI;
  items?: RouteTypeI[]; // same level route
  children?: RoutePathCallNullTypeI[]; // sub route of multi-level route, such as level-2 route under level-1 route
  title?: string;
  hidden?: boolean;
  icon?: string;
  code?: CodeType; // each menu item has a code, and the route code of the same menu item is the same
  parentName?: string; // parent route name
  fullscreen?: boolean; // if is true, the navigation bar will be hidden
  props?: RouteTypePropsI;
  redirect?: string;
  type?: "real" | "null";

  meta?: Record<string, any>; // some other information can be customized
}

export interface RouteTypeInputI extends RouteTypeI {
  _relativePath?: string;
  _level: number;
  path: string;
  items?: RouteTypeInputI[];
  children?: RouteTypeInputI[];
  parent?: RouteTypeInputI;
}

export interface RouteTypeExtendsI extends RouteTypeInputI {
  parent?: RouteTypeExtendsI; // parent route name
  parentAbs?: RouteTypeExtendsI;

  meta: Record<string, any>; // some other information can be customized
  items?: RouteTypeExtendsI[];
  children?: RouteTypeExtendsI[];
  _route?: RouteTypeInputI;
  _component?: RouteComponentType;
  _isHasAuth?: boolean; // true has permission; false: no permission
  _itemsAndChildren?: RouteTypeExtendsI[];
}

export enum RouterActionEnum {
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
  (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]): void;
}
export interface MRouterMethodsI {
  addRoutes: AddRoutesI;
  updateCurrentRoute: (currentRoute: RouteTypeExtendsI) => void;
  removeRoutes: RemoveRoutesI;
  updateRoutes: UpdateRoutesI;
  // getStateByInputRoutes: (inputRoutes: RouteTypeInputI[]) => NewStateI;
  [method: string]: any;
}
export interface MRouterContextObject {
  state: MRouterStateI;
  // Some operation methods
  methods: MRouterMethodsI;
}

export interface RoutesBaseStateStruct {
  routesMap: RoutesMapI;
  routes: RouteTypeI[];
  // flat routing
  flattenRoutes: RouteTypeI[];
  basename?: string;
}
export interface ExtraNavigateOptions extends NavigateOptions {
  params?: Record<string, any>; // url parameters of the route, for example: id
  query?: Record<string, any>; // url query
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

export type RouteEvent = "BeforeRouterLeave" | "AfterRouterEnter";

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
  history: OldBrowserHistory;
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

export interface BaseRoutesMapI extends Record<string, RouteTypeExtendsI> {}

export type RoutesMapInterI = Record<
  string,
  RouteTypeExtendsI | RouteTypeExtendsI[]
> & {
  __paramsRoutesMap: Record<string, RouteTypeExtendsI | RouteTypeExtendsI[]>;
  __flattenRoutes: RouteTypeExtendsI[];
};

export type RoutesMapI = BaseRoutesMapI & {
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
