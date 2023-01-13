import * as React from "react";
import BrowserRouter from "./core/BrowserRouter";
import HashRouter from "./core/HashRouter";
import {
  useAddRoutes,
  useRemoveRoutes,
  useUpdateRoutes
} from "./context/MRouterContext";
import {
  useHistory} from "./context/MRouterHistoryContext";

import CoreRouter, { MRouterPropsI } from './core/CoreRouter'

export type {
  RouterConfigI,
  RouteTypeI,
  RouteTypeExtendsI,
  RoutesMapI
} from "./type";

export { defineRouterConfig } from "./util";
export { useBeforeLeave, useNavigate, useRouter } from "./hooks";


const MRouter: React.FC<MRouterPropsI> = props => {
  return <CoreRouter {...props} RouterComponent={BrowserRouter} />;
};

const MHRouter: React.FC<MRouterPropsI> = props => {
  return <CoreRouter {...props} RouterComponent={HashRouter} />;
};

export {
  MRouter,
  MHRouter,
  useAddRoutes,
  useRemoveRoutes,
  useUpdateRoutes,
  useHistory
};
