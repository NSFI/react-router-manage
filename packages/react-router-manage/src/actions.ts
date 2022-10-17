import type {
  RouteTypeI,
  MRouterStateI,
  RouteTypeInputI,
} from "./type";
import { cloneRoutes } from "./util";

function newInputRoutesState(inputRoutes?: RouteTypeInputI[]): {
  inputRoutes: RouteTypeInputI[];
  routesMap: Record<string, RouteTypeInputI>;
} {
  const routesMap: Record<string, RouteTypeInputI> = {};
  function _cloneInputRoutes(
    inputRoutes?: RouteTypeInputI[],
    parent?: RouteTypeInputI
  ): RouteTypeInputI[] {
    if (!inputRoutes) {
      return [];
    }
    return inputRoutes.map(i => {
      const _route: RouteTypeInputI = {
        ...i,
        items: [],
        children: [],
        parent: parent
      };
      _route.items = _cloneInputRoutes(i.items, _route);
      _route.children = _cloneInputRoutes(i.children, _route);
      routesMap[i.name] = _route;
      return _route;
    }, []);
  }
  return {
    inputRoutes: _cloneInputRoutes(inputRoutes),
    routesMap: routesMap
  };
}

/**
 * add routes operation
 * @param state MRouterStateI
 * @param payload RouteTypeI[]
 * @returns MRouterStateI
 */
export function addRoutesAction(
  state: MRouterStateI,
  payload: any
): MRouterStateI {
  let hasChange = false;
  const newRoutes = payload as RouteTypeI[];
  const { routesMap, inputRoutes } = newInputRoutesState(state.inputRoutes);

  newRoutes.forEach(_route => {
    const { path, name, parentName } = _route;

    if (routesMap[path] || routesMap[name]) {
      throw new Error(`新增路由 ${name} ${path} 已经存在，请修改`);
    }

    if (parentName) {
      const _parentRoute = routesMap[parentName];
      if (_parentRoute) {
        const route = cloneRoutes({
          routes: [_route],
          parent: _parentRoute,
          _level: _parentRoute._level! + 1
        });
        _parentRoute.items = _parentRoute.items || [];
        _parentRoute.items.push(route[0]);
        hasChange = true;
      }
    } else {
      // 根路径插入
      const route = cloneRoutes({
        routes: [_route],
        _level: 0
      });
      inputRoutes.push(route[0]);
      hasChange = true;
    }
  });
  if (hasChange) {
    const newState = state._getNewStateByNewInputRoutes(inputRoutes);

    return {
      ...state,
      ...newState,
      inputRoutes: [...inputRoutes]
    };
  }
  return state;
}
/**
 * update routes operation
 * @param state MRouterStateI
 * @param payload RouteTypeI[]
 * @returns MRouterStateI
 */
export function updateRoutesAction(
  state: MRouterStateI,
  payload: any
): MRouterStateI {
  let hasChange = false;
  // const { basename } = state;
  const newRoutesPayload = payload as {
    routeName: string;
    routeData: Partial<RouteTypeI>;
  }[];
  const { routesMap, inputRoutes } = newInputRoutesState(state.inputRoutes);
  newRoutesPayload.forEach(({ routeName, routeData }) => {
    const route = routesMap[routeName];
    if (route) {
      // 如果parent存在，则不是根节点
      const parent = route.parent;

      const _newRouteData = {
        ...route,
        ...routeData
      };

      const newRouteData = cloneRoutes({
        routes: [_newRouteData],
        parent,
        _level: (parent?._level || 0) + 1,
        basename: state.basename
      });

      if (!parent) {
        Object.assign(route, newRouteData[0]);
        hasChange = true;
      }
      if (parent && parent.items) {
        parent.items.splice(parent.items.indexOf(route), 1, newRouteData[0]);
        hasChange = true;
      } else if (parent && parent.children) {
        parent.children.splice(
          parent.children.indexOf(route),
          1,
          newRouteData[0]
        );
        hasChange = true;
      }
    }
  });

  if (hasChange) {
    const newState = state._getNewStateByNewInputRoutes(inputRoutes);
    return {
      ...state,
      ...newState,
      inputRoutes: [...inputRoutes]
    };
  }
  return state;
}
/**
 * remove routes operation
 * @param state MRouterStateI
 * @param payload RouteTypeI[]
 * @returns MRouterStateI
 */
export function removeRoutesAction(
  state: MRouterStateI,
  payload: any
): MRouterStateI {
  let hasChange = false;
  const routeNames = payload as string[];
  const { routesMap, inputRoutes } = newInputRoutesState(state.inputRoutes);
  routeNames.forEach(routeName => {
    const _route = routesMap[routeName];
    if (_route) {
      // 如果parent存在，则不是根节点
      const parent = _route.parent;
      if (!parent) {
        const index = inputRoutes.indexOf(_route);
        if (index > -1) {
          inputRoutes.splice(index, 1);
          hasChange = true;
        }
      }
      if (parent && parent.items) {
        const index = parent.items.indexOf(_route);
        if (index > -1) {
          parent.items.splice(index, 1);
          hasChange = true;
        }
      }
    }
  });
  if (hasChange) {
    const newState = state._getNewStateByNewInputRoutes(inputRoutes);
    return {
      ...state,
      ...newState,
      inputRoutes: [...inputRoutes]
    };
  } else {
    return state;
  }
}
