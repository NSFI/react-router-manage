import * as React from 'react';
import type { To } from "react-router-dom";
import type { BeforeLeaveI, ExtraNavigateOptions, RoutesStateStruct, RouterBaseConfigI } from "./type";
import { useAddRoutes, useRemoveRoutes, useUpdateRoutes } from "./Context/MRouterContext";
import { useHistory } from "./Context/MRouterHistoryContext";
export type { RouterConfigI, RouteTypeI, RouteTypeExtendsI } from "./type";
export { defineRouterConfig } from "./util";
declare function useBeforeLeave(fn: BeforeLeaveI): void;
export interface NavigateFunction {
    (to: To, options?: ExtraNavigateOptions): void;
    (delta: number): void;
}
declare const useNavigate: () => NavigateFunction;
declare function useRouter(): RoutesStateStruct;
interface MRouterPropsI {
    permissionList?: string[];
    wrapComponent?: React.FunctionComponent<any>;
    hasAuth?: boolean;
    routerConfig: RouterBaseConfigI;
    children?: (children: React.ReactNode) => React.ReactNode;
}
declare const MRouter: React.FC<MRouterPropsI>;
declare const MHRouter: React.FC<MRouterPropsI>;
export { MRouter, MHRouter, useAddRoutes, useRemoveRoutes, useUpdateRoutes, useBeforeLeave, useRouter, useHistory, useNavigate };
