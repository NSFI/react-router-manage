import * as React from "react";

import {
  MRouter,
  MHRouter} from "react-router-manage";
import routerConfig from "./router";
import AntdRouterBreadcrumbs from '@rrm/antd-breadcrumbs'

const Router = window.__INITIAL_DATA__.mode === 'hash' ? MHRouter : MRouter;

console.log(window.__INITIAL_DATA__.mode)

function Layout({ children }) {
  return (
    <div>
      <AntdRouterBreadcrumbs />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Antd router breadcrumbs</h1>
      <Router routerConfig={routerConfig} wrapComponent={Layout} />
    </div>
  );
}
