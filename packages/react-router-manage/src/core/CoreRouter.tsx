import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import type { Location } from "react-router-dom";
import BrowserRouter from "./BrowserRouter";
import HashRouter from "./HashRouter";
import MRouterContextProvider from './MRouterContextProvider'
import { PermissionModeType, RouterBaseConfigI } from "../type";

export interface MRouterPropsI {
  permissionList?: string[];
  permissionMode?: PermissionModeType;
  wrapComponent?: React.FunctionComponent<any>;
  hasAuth?: boolean;
  routerConfig: RouterBaseConfigI;
  children?: (children: React.ReactNode) => React.ReactNode;
}

interface CoreRouterPropsI extends MRouterPropsI {
  RouterComponent: typeof BrowserRouter | typeof HashRouter;
}
const CoreRouter: React.FC<CoreRouterPropsI> = ({
  permissionList,
  permissionMode,
  wrapComponent: WrapComponent,
  hasAuth = true,
  routerConfig,
  children,
  RouterComponent
}) => {
  const syncUpdateCurrentRouteRef = useRef<{
    updateCurrentRoute: (location: Location) => void;
  }>(null!);
  const syncUpdateCurrentRoute = useCallback((location: Location) => {
    syncUpdateCurrentRouteRef.current?.updateCurrentRoute?.(location);
  }, []);

  if (__DEV__) {
    /** Determine whether routerConfig has ‘_isDefined’ attribute */
    if (!routerConfig._isDefined) {
      console.error(
        `The routerConfig does not call defineRouterConfig definition, You should use 'const routerConfig = defineRouterConfig({...})'`
      );
    }
    /** Judge incoming 'WrapComponent' and 'children' */
    if (WrapComponent && children) {
      console.warn(
        `MRouter attributes 'children' and 'WrapComponent' are optional attributes. If both exist, children will be used`
      );
    }
    if (children && typeof children !== "function") {
      console.error(
        'MRoute attributes children needs to be a function, not a function at present  "%s"',
        children
      );
    }
  }

  const _children = useMemo(() => {
    if (children && typeof children === "function") {
      return children;
    }
    if (WrapComponent) {
      WrapComponent.displayName = "WrapComponent";
      return function wrapComponent(children: React.ReactNode) {
        return <WrapComponent>{children}</WrapComponent>;
      };
    }
  }, [WrapComponent, children]);

  return (
    <RouterComponent syncUpdateCurrentRoute={syncUpdateCurrentRoute}>
      <MRouterContextProvider
        routerConfig={routerConfig}
        permissionList={permissionList}
        permissionMode={permissionMode}
        hasAuth={hasAuth}
        ref={syncUpdateCurrentRouteRef}
      >
        {_children}
      </MRouterContextProvider>
    </RouterComponent>
  );
};

export default CoreRouter;
