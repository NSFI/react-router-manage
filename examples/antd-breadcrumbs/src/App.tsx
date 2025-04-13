import * as React from "react";
import { Menu, Layout } from "antd";

import { MRouter, MHRouter, useRouter } from "react-router-manage";
import routerConfig from "./router";
import AntdRouterBreadcrumbs from "@rrmc/antd-breadcrumbs";
import { useMemo } from "react";

const { Sider, Content } = Layout;

const Router = window.__INITIAL_DATA__.mode === "hash" ? MHRouter : MRouter;

function getItems(routes) {
  return routes.map(i => {
    const item: any = {
      key: i.name,
      label: i.title
    };
    if (i.items?.length) {
      item.children = getItems(i.items);
    }
    return item;
  });
}

function RouterLayout({ children }) {
  const { routes, routesMap, navigate } = useRouter();

  const items = useMemo(() => {
    return getItems(routes);
  }, [routes]);
  return (
    <Layout style={{ height: 600 }}>
      <Sider trigger={null} collapsed={false}>
        <Menu
          mode="inline"
          theme="dark"
          items={items}
          onSelect={({ key }) => {
            console.log(key);
            navigate(routesMap[key]?.path);
          }}
        ></Menu>
      </Sider>
      <Content style={{ padding: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <AntdRouterBreadcrumbs />
        </div>

        <div>{children}</div>
      </Content>
    </Layout>
  );
}

export default function App() {
  return (
    <div>
      <h1>Antd router breadcrumbs2</h1>
      <Router routerConfig={routerConfig} wrapComponent={RouterLayout} />
    </div>
  );
}
