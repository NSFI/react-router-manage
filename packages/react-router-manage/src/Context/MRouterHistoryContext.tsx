import React from 'react';
import type { RouteHistoryObject } from '../type';

const MRouterHistoryContext = React.createContext<RouteHistoryObject>(null!);
MRouterHistoryContext.displayName = 'MRouterHistoryContext';

export function useHistory () {
  return React.useContext(MRouterHistoryContext).history;
}

export function useRouteHooks () {
  return React.useContext(MRouterHistoryContext).routeHooks;
}

export function useRouteHooksRef () {
  return React.useContext(MRouterHistoryContext).routeHooksRef;
}

export function useHistoryMethods () {
  return React.useContext(MRouterHistoryContext).historyMethods;
}

export default MRouterHistoryContext;
