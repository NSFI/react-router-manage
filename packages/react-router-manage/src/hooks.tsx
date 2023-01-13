import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { parse, stringify } from "query-string";
import {
  generatePath,
  To,
  useLocation,
  useNavigate as useOldNavigate,
  useParams
} from "react-router";

import { useRouteHooksRef } from "./context/MRouterHistoryContext";

import { useRouterState } from "./context/MRouterContext";

import type {
  BeforeLeaveI,
  ExtraNavigateOptions,
  RouteCbI,
  RoutesMapI,
  RoutesStateStruct
} from "./type";

export function useBeforeLeave(fn: BeforeLeaveI): void {
  const pathname = window.location.pathname;
  const routeHooksRef = useRouteHooksRef();
  useLayoutEffect(() => {
    const hooks = routeHooksRef.current;
    const routeHook = {
      name: "BeforeRouterLeave",
      pathname,
      fn
    } as RouteCbI;
    hooks.push(routeHook);
    return () => {
      const index = hooks.indexOf(routeHook);
      hooks.splice(index, 1);
    };
  }, [fn, pathname, routeHooksRef]);
}

export interface NavigateFunction {
  (to: To, options?: ExtraNavigateOptions): void;
  (delta: number): void;
}

export const useNavigate = (): NavigateFunction => {
  const oldNavigate = useOldNavigate();
  const newCallback = useCallback(
    (to: any, options: ExtraNavigateOptions = {}) => {
      if (options?.params && typeof to === "string") {
        to = generatePath(to, options.params);
      }
      // query写入地址栏
      if (options?.query && typeof to === "string") {
        let path = to;
        const queryStr = stringify(options.query);
        if (path.includes("?")) {
          path = `${path}&${queryStr}`;
        } else {
          path = `${path}?${queryStr}`;
        }
        to = path;
      }

      return oldNavigate(to, options);
    },
    [oldNavigate]
  );
  return newCallback;
};

export function useRouter(): RoutesStateStruct {
  const location = useLocation();
  const routesMapRef = useRef<RoutesMapI>({} as RoutesMapI);
  const {
    routesMap,
    inputRoutes,
    currentRoute,
    flattenRoutes,
    authInputRoutes,
    basename
  } = useRouterState();

  if (routesMapRef.current !== routesMap) {
    routesMapRef.current = routesMap;
  }

  const search = useMemo(() => {
    return parse(location.search);
  }, [location.search]);

  const routerParams = useParams();

  const newNavigate = useNavigate();

  return {
    navigate: newNavigate,
    routesMap,
    query: search,
    params: routerParams as Record<string, string | number>,
    routes: inputRoutes,
    authRoutes: authInputRoutes,
    currentRoute,
    flattenRoutes,
    location,
    basename
  };
}
