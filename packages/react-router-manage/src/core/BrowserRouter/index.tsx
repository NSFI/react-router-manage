import * as React from "react";
import { useMemo } from "react";
import { unstable_batchedUpdates } from "react-dom";
import type { BrowserRouterProps, Location } from "react-router-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";
import type {
  OldBrowserHistory,
  RouteCbI,
  RouteHistoryObject
} from "../../type";
import MRouterHistoryContext from "../../context/MRouterHistoryContext";

/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
export default function BrowserRouter({
  basename,
  children,
  syncUpdateCurrentRoute
}: BrowserRouterProps & {
  syncUpdateCurrentRoute: (location: Location) => void;
}) {
  const historyRef = React.useRef<OldBrowserHistory>(null!);
  const routeHooksRef = React.useRef<RouteCbI[]>(null!);
  if (historyRef.current == null) {
    const history = createBrowserHistory({ window, v5Compat: true });
    historyRef.current = {
      ...history,
      back: () => history.go(-1),
      forward: () => history.go(1)
    };
    routeHooksRef.current = [];
  }

  const historyContext = useMemo(() => {
    return {
      history: historyRef.current as OldBrowserHistory,
      routeHooks: routeHooksRef.current as RouteCbI[],
      routeHooksRef,
      historyMethods: {
        push: historyRef.current.push,
        replace: historyRef.current.replace,
        go: historyRef.current.go,
        back: historyRef.current.back,
        forward: historyRef.current.forward
      }
    } as RouteHistoryObject;
  }, []);

  const history = historyRef.current;

  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => {
    let mounted = true;
    const removeListenFn = history.listen(routeData => {
      const { location } = routeData;
      if (!mounted) {
        return;
      }
      unstable_batchedUpdates(() => {
        setState(routeData);
        syncUpdateCurrentRoute(location);
      });
    });
    return () => {
      mounted = false;
      removeListenFn();
    };
  }, [history, syncUpdateCurrentRoute]);
  return (
    <MRouterHistoryContext.Provider value={historyContext}>
      <Router
        basename={basename}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      >
        {children}
      </Router>
    </MRouterHistoryContext.Provider>
  );
}
