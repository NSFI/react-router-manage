import type { NavigateOptions, To } from 'react-router-dom';
import type { ParsedQuery } from 'query-string';
import type { BrowserHistory, Location } from 'history';
import type React from 'react';

export interface RouterConfigI {
  routes: RouteTypeI[]
  basename?: string
  beforeEachMount?: BeforeEachMountI
  autoDocumentTitle?: boolean | ((currentPathRoutes: RouteTypeExtendsI[]) => string)
  // beforeEachEnter?: BeforeEachEnterI;
}

export type PermissionListType = string[];
export type CodeType = string | string[] | FnCodeType;
export type FnCodeType = ((route: RouteTypeI) => boolean);

export type NextOptionsType = {
  name?: string // 如果name配置则会跳转到路由配置对应的路由
  path?: string // 路径
} | React.ComponentType<any>; // 如果配置组件，则会渲染该组件

// 全局路由进入狗子
export interface BeforeEachMountI {
  (to: RouteTypeI, next: (nextOptionsType?: NextOptionsType) => void): void
}

export interface BeforeEachEnterI {
  (to: RouteTypeI, next: (nextOptionsType?: NextOptionsType) => void): void
}

export enum RouteNavTypeEnum {
  menu,
  step,
}
export interface BeforeEnterI {
  (to: RouteTypeI | undefined, next: (nextOptionsType?: NextOptionsType) => void): void
}

export interface BeforeLeaveI {
  (
    to: RouteTypeI | undefined,
    from: RouteTypeI | undefined,
    next: (ReplaceComponent?: any) => void
  ): void
}
export interface RouteTypePropsI {
  beforeEachMount?: BeforeEachMountI
  beforeEnter?: BeforeEnterI
  [prop: string]: any
}

export type RouteComponentType = React.LazyExoticComponent<any> | React.FC<any>;
export interface RouteTypeI {
  name: string
  path: string
  component?: RouteComponentType

  beforeEnter?: BeforeEnterI
  beforeLeave?: BeforeLeaveI
  items?: RouteTypeI[] // 同一级路由
  children?: RouteTypeI[] // 多级路由的子路由, 例如：一级路由下的二级路由
  title?: string
  hidden?: boolean
  icon?: string
  // isDynamic?: boolean // 是否是动态路由
  code?: CodeType // 每个菜单项一个code,属于同一个菜单项的路由code相同
  parentName?: string // 父级名称
  fullscreen?: boolean // 是否全屏
  props?: RouteTypePropsI
  redirect?: string
  type?: 'real' | 'null'

  meta?: Record<string, any> // 一些其他信息，可自定义
}

export interface RouteTypeInputI extends RouteTypeI {
  _relativePath: string
  _level: number
  items?: RouteTypeInputI[]
  children?: RouteTypeInputI[]
  parent?: RouteTypeInputI
}

export interface RouteTypeExtendsI extends RouteTypeInputI {
  parent?: RouteTypeExtendsI // 父级路由

  meta: Record<string, any> // 一些其他信息，可自定义
  items?: RouteTypeExtendsI[]
  children?: RouteTypeExtendsI[]
  _route?: RouteTypeInputI
  _component?: RouteComponentType
  _isHasAuth?: boolean // true 有权限； false无权限
  _itemsAndChildren?: RouteTypeExtendsI[]

}

export enum RouterActionEnum {
  UPDATE_INPUT_ROUTES,
  UPDATE_CURRENT_ROUTE,
  UPDATE_STATE,
  ADD_ROUTES,
  REMOVE_ROUTES,
  UPDATE_ROUTES,
}
export interface Action {
  type: RouterActionEnum
  payload?: any
  dispatch?: React.Dispatch<Action>
}

export interface YSRouterStateI {
  basename: string

  inputRoutes: RouteTypeInputI[]
  authInputRoutes: RouteTypeExtendsI[]

  routesMap: RoutesMapInterface
  flattenRoutes: RouteTypeExtendsI[]
  currentRoute: RouteTypeExtendsI
  currentPathRoutes: RouteTypeExtendsI[]
  prevRoute?: RouteTypeExtendsI
  permissionList?: string[]
  hasAuth?: boolean
}

export interface AddRoutesI {
  (routes: RouteTypeI[]): void
}
export interface RemoveRoutesI {
  (routeNames: string[]): void
}
export interface UpdateRoutesI {
  (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]): void
}
export interface YSRouterMethodsI {
  addRoutes: AddRoutesI
  updateCurrentRoute: (currentRoute: RouteTypeExtendsI) => void
  removeRoutes: RemoveRoutesI
  updateRoutes: UpdateRoutesI
  [method: string]: any
}
export interface MRouterContextObject {
  state: YSRouterStateI
  // 一些操作方法
  methods: YSRouterMethodsI
}

export interface RoutesBaseStateStruct {
  routesMap: RoutesMapInterface
  routes: RouteTypeI[]
  // 扁平路由
  flattenRoutes: RouteTypeI[]
}
export interface ExtraNavigateOptions extends NavigateOptions {
  params?: Record<string, any> // 路由的地址参数 例如 :id
  query?: Record<string, any> // 路由参数
}
export interface NavigateFunction {
  (to: To, options?: ExtraNavigateOptions): void
  (delta: number): void
}
export interface RoutesStateStruct extends RoutesBaseStateStruct {
  navigate: NavigateFunction
  location: Location
  currentRoute: RouteTypeExtendsI
  authRoutes: RouteTypeExtendsI[]
  query: ParsedQuery<string>
  params: Record<string, number | string>
}

export type RouteEvent = 'BeforeRouterLeave' | 'AfterRouterEnter';

export interface RouteCbI {
  fn: BeforeLeaveI
  name: RouteEvent
  pathname: string
}

export interface RouteConfig {
  path: string
  element?: React.ReactNode
  children?: RouteConfig[]
}

export interface RouteHistoryObject {
  history: BrowserHistory
  historyMethods: {
    push(to: To, state?: any): void
    replace(to: To, state?: any): void
    go(delta: number): void
    back(): void
    forward(): void
  }
  routeHooks: RouteCbI[]
  routeHooksRef: React.MutableRefObject<RouteCbI[]>
}
export interface BaseRoutesMapInterface extends Record<string, RouteTypeExtendsI> {}

export type RoutesMapInterface = BaseRoutesMapInterface & {
  __paramsRoutesMap: Record<string, RouteTypeExtendsI>
  __flattenRoutes: RouteTypeExtendsI[]
};
