import * as React from "react";
import { Suspense } from "react";
import { changeable } from "../../changeable";
import { RouteConfig, RouteTypeExtendsI } from "../../type";
import { flattenArr } from "../../util";

export default function computedUseRoutesConfig(routes: RouteTypeExtendsI[]) {
  const _routes = routes.map(route => {
    let _routeConfig: RouteConfig | undefined;
    let _itemsRouteConfig: RouteConfig[] = [];
    const {
      _component: Component,
      path,
      items,
      children,
      _isHasAuth,
      _props,
      props
    } = route;

    // _props is the user interceptor hook, if there is no hook, use props
    const needInputProps = _props || props;
    if (Component) {
      const LoadingCmp = changeable.LoadingComponent;
      if (!_isHasAuth) {
        /** Without permission, the child also has no permission */
        return {
          path: path.endsWith("*") ? path : `${path}/*`,
          element: (
            <Suspense fallback={<LoadingCmp />}>
              <Component {...needInputProps} />
            </Suspense>
          )
        } as RouteConfig;
      }
      _routeConfig = {
        path,
        element: (
          <Suspense fallback={<LoadingCmp />}>
            <Component {...needInputProps} />
          </Suspense>
        )
      } as RouteConfig;
      if (children) {
        _routeConfig.children = computedUseRoutesConfig(children);
      }
      if (items) {
        _itemsRouteConfig = computedUseRoutesConfig(items);
      }
    }

    const nextRoutes = [_routeConfig, ..._itemsRouteConfig].filter(i => {
      return i !== undefined;
    }) as RouteConfig[];
    return nextRoutes;
  });
  return flattenArr(_routes);
}
