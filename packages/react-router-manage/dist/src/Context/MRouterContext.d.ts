import * as React from 'react';
import type { Action, AddRoutesI, UpdateRoutesI, MRouterContextObject, MRouterStateI } from '../type';
declare const MRouterContext: React.Context<MRouterContextObject>;
export declare function MRouterReducer(state: MRouterStateI, action: Action): MRouterStateI;
export declare function useRouterState(): MRouterStateI;
/** Dynamically add routing method */
export declare function useAddRoutes(): AddRoutesI;
export declare function useRemoveRoutes(): (routeNames: string[]) => void;
export declare function useUpdateRoutes(): UpdateRoutesI;
export default MRouterContext;
