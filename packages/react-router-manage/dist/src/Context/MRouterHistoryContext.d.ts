import * as React from 'react';
import type { RouteHistoryObject } from '../type';
declare const MRouterHistoryContext: React.Context<RouteHistoryObject>;
export declare function useHistory(): import("history").BrowserHistory;
export declare function useRouteHooks(): import("../type").RouteCbI[];
export declare function useRouteHooksRef(): React.MutableRefObject<import("../type").RouteCbI[]>;
export declare function useHistoryMethods(): {
    push(to: import("react-router").To, state?: any): void;
    replace(to: import("react-router").To, state?: any): void;
    go(delta: number): void;
    back(): void;
    forward(): void;
};
export default MRouterHistoryContext;
