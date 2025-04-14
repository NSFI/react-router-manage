import * as React from "react";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef
} from "react";
import { useLocation, useRoutes } from "react-router-dom";
import type { To, Location } from "react-router-dom";
import {
  BeforeLeaveI,
  NewStateI,
  PermissionModeType,
  RouterActionEnum,
  RouterBaseConfigI,
  RouteTypeExtendsI,
  RouteTypeI,
  RouteTypeInputI
} from "../../type";
import MRouterContext, { MRouterReducer } from "../../context/MRouterContext";
import {
  useHistory,
  useHistoryMethods,
  useRouteHooksRef
} from "../../context/MRouterHistoryContext";
import {
  cloneRoutes,
  computedNewState,
  executeEventCbs,
  getCurrentPathRoutes,
  getCurrentRoute,
  getCurrentRouteCbsByEvent
} from "../../util";
import getInitialState from "./getInitialState";
import replaceHistoryMethods from "./replaceHistoryMethods";
import computedUseRoutesConfig from "./computedUseRoutesConfig";
import { useNavigate } from "../../hooks";
const DEFAULT_PERMISSION_LIST: string[] = [];

interface InternalMRouterContextProviderRef {
  updateCurrentRoute: (location: Location) => void;
}

interface MRouterContextProviderI {
  permissionList?: string[];
  permissionMode?: PermissionModeType;
  hasAuth: boolean;
  routerConfig: RouterBaseConfigI;
  children?: (children: React.ReactNode) => React.ReactNode;
}

const InternalMRouterContextProvider: React.ForwardRefRenderFunction<
  InternalMRouterContextProviderRef,
  MRouterContextProviderI
> = (
  {
    permissionList = DEFAULT_PERMISSION_LIST,
    permissionMode = "parent",
    routerConfig,
    hasAuth,
    children
  },
  ref
) => {
  const history = useHistory();
  const location = useLocation();
  const locationRef = useRef(location);

  const oldHistoryMethods = useHistoryMethods();
  const routeHooksRef = useRouteHooksRef();

  const navigate = useNavigate();

  const {
    routes = [],
    basename = "/",
    beforeEachMount,
    autoDocumentTitle = false,
    _navigateRef
  } = routerConfig;

  // expose navigate to external use
  if (_navigateRef) {
    _navigateRef.current = navigate;
  }

  const inputRoutes = useMemo(() => {
    return cloneRoutes({
      routes,
      basename
    });
  }, [basename, routes]);

  const inputRoutesRef = useRef(inputRoutes);

  const initialStateRef = useRef<NewStateI>(null!);

  const initialState = useMemo(() => {
    if (!initialStateRef.current) {
      initialStateRef.current = getInitialState({
        inputRoutes,
        permissionList,
        permissionMode,
        hasAuth,
        beforeEachMount,
        basename,
        location: locationRef.current,
        _defineId: routerConfig._defineId
      });
    }
    return initialStateRef.current;
  }, [
    basename,
    beforeEachMount,
    hasAuth,
    inputRoutes,
    permissionList,
    permissionMode,
    routerConfig._defineId
  ]);

  const getNewStateByNewInputRoutesRef = useRef<
    (_inputRoutes: RouteTypeInputI[]) => NewStateI
  >(null!);
  const _getNewStateByNewInputRoutes = useCallback(
    (_inputRoutes: RouteTypeInputI[]) => {
      return computedNewState({
        inputRoutes: _inputRoutes,
        permissionList,
        permissionMode,
        hasAuth,
        beforeEachMount,
        basename,
        location: location
      });
    },
    [
      basename,
      beforeEachMount,
      hasAuth,
      location,
      permissionList,
      permissionMode
    ]
  );
  getNewStateByNewInputRoutesRef.current = _getNewStateByNewInputRoutes;

  // initialization
  const [state, dispatch] = useReducer(MRouterReducer, {
    ...initialState,
    inputRoutes,
    permissionList,
    permissionMode,
    hasAuth,
    basename,
    _getNewStateByNewInputRoutes: getNewStateByNewInputRoutesRef.current
  });

  /**
   * listen router change，set currentRoute
   *  Put the updated currentRoute in history listen updates in batches to reduce the number of updates
   */
  useImperativeHandle(ref, () => {
    return {
      updateCurrentRoute(location) {
        const { pathname } = location;
        const prevRoute = state.currentRoute;
        const currentRoute = getCurrentRoute(
          pathname,
          state.routesMap,
          state.flattenRoutes
        );

        let currentPathRoutes = state.currentPathRoutes;
        if (currentRoute !== state.currentRoute) {
          currentPathRoutes = getCurrentPathRoutes(currentRoute);
        }
        dispatch({
          type: RouterActionEnum.UPDATE_STATE,
          payload: {
            currentRoute,
            currentPathRoutes,
            prevRoute
          }
        });
      }
    };
  });

  useLayoutEffect(() => {
    // filter routes without permission
    // used to judge initialization or update. If they are equal, only currentRoute needs to be calculated
    if (
      state.permissionList === permissionList &&
      state.permissionMode === permissionMode &&
      hasAuth === state.hasAuth &&
      state.inputRoutes === inputRoutes &&
      state.beforeEachMount === beforeEachMount
    ) {
      return;
    }
    // if inputRoutes change, the incoming inputRoutes shall prevail
    let _inputRoutes = state.inputRoutes;
    if (
      inputRoutesRef.current === inputRoutes &&
      state.permissionList === permissionList &&
      state.permissionMode === permissionMode &&
      hasAuth === state.hasAuth &&
      state.beforeEachMount === beforeEachMount
    ) {
      // Equal, indicating that state.inputRoutes has changed, is add remove and update routes
      return;
    } else {
      // if not Equal, record the value of inputRoutes for next comparison
      inputRoutesRef.current = inputRoutes;
      _inputRoutes = inputRoutes;
    }

    const {
      authInputRoutes,
      flattenRoutes,
      routesMap,
      currentRoute,
      currentPathRoutes
    } = computedNewState({
      inputRoutes: _inputRoutes,
      permissionList,
      permissionMode,
      hasAuth,
      beforeEachMount,
      basename,
      location
    });

    dispatch({
      type: RouterActionEnum.UPDATE_STATE,
      payload: {
        permissionList,
        permissionMode,
        authInputRoutes,
        routesMap,
        flattenRoutes,
        currentRoute,
        currentPathRoutes,
        basename,
        beforeEachMount,
        inputRoutes: _inputRoutes
      }
    });
  }, [
    state.inputRoutes,
    inputRoutes,
    permissionList,
    state.permissionList,
    permissionMode,
    state.permissionMode,
    hasAuth,
    state.hasAuth,
    basename,
    beforeEachMount,
    location,
    state.beforeEachMount
  ]);

  // auto setting document.title
  useEffect(() => {
    if (!autoDocumentTitle) {
      return;
    }
    let title = "";
    if (typeof autoDocumentTitle === "boolean") {
      title = state.currentPathRoutes
        .map(i => {
          return i.title;
        })
        .join("-");
    } else if (typeof autoDocumentTitle === "function") {
      title = autoDocumentTitle(state.currentPathRoutes);
    }
    document.title = title;
  }, [autoDocumentTitle, state.currentPathRoutes]);

  const allExecuteEventCbs = useCallback(
    (historyCb: () => void, to?: To) => {
      if (typeof to !== "string") {
        to = to?.pathname;
      }
      const pathname = window.location.pathname;
      const beforeRouterLeaveCbs = getCurrentRouteCbsByEvent(
        "BeforeRouterLeave",
        pathname,
        routeHooksRef.current
      );
      if (state.currentRoute?.beforeLeave) {
        beforeRouterLeaveCbs.unshift({
          name: "BeforeRouterLeave",
          pathname: state.currentRoute.path,
          fn: state.currentRoute.beforeLeave as BeforeLeaveI
        });
      }
      if (beforeRouterLeaveCbs.length) {
        executeEventCbs({
          to: getCurrentRoute(
            to as string,
            state.routesMap,
            state.flattenRoutes
          ),
          from: getCurrentRoute(pathname, state.routesMap, state.flattenRoutes),
          callbacks: beforeRouterLeaveCbs,
          finish: () => {
            return historyCb();
          }
        });
      } else {
        return historyCb();
      }
    },
    [
      routeHooksRef,
      state.currentRoute.beforeLeave,
      state.currentRoute.path,
      state.routesMap,
      state.flattenRoutes
    ]
  );

  useLayoutEffect(() => {
    // Intercept the methods used in history in useNavigator
    replaceHistoryMethods(history, allExecuteEventCbs, oldHistoryMethods);
  }, [allExecuteEventCbs, history, oldHistoryMethods]);

  const addRoutes = useCallback((newRoutes: RouteTypeI[]) => {
    dispatch({
      type: RouterActionEnum.ADD_ROUTES,
      payload: newRoutes
    });
  }, []);

  const removeRoutes = useCallback((routeNames: string[]) => {
    dispatch({
      type: RouterActionEnum.REMOVE_ROUTES,
      payload: routeNames
    });
  }, []);

  const updateRoutes = useCallback(
    (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]) => {
      dispatch({
        type: RouterActionEnum.UPDATE_ROUTES,
        payload: routes
      });
    },
    []
  );

  const updateCurrentRoute = useCallback((currentRoute: RouteTypeExtendsI) => {
    if (!currentRoute) {
      return;
    }
    dispatch({
      type: RouterActionEnum.UPDATE_CURRENT_ROUTE,
      payload: currentRoute
    });
  }, []);

  const routesConfig = useMemo(() => {
    const _routesConfig = computedUseRoutesConfig(state.authInputRoutes);
    return _routesConfig;
  }, [state.authInputRoutes]);
  // console.log(routesConfig);
  const routesChildren = useRoutes(routesConfig);

  const renders = useMemo(() => {
    return children ? children(routesChildren) : routesChildren;
  }, [children, routesChildren]);

  return (
    <MRouterContext.Provider
      value={{
        state,
        methods: {
          addRoutes,
          updateCurrentRoute,
          removeRoutes,
          updateRoutes
        }
      }}
    >
      {renders}
    </MRouterContext.Provider>
  );
};

const MRouterContextProvider = React.forwardRef(InternalMRouterContextProvider);

MRouterContextProvider.displayName = "MRouterContextProvider";

export default MRouterContextProvider;
