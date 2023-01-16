# @rrmc/antd-breadcrumbs

基于`antd`组件库和`react-router-manage`自动生成面包屑组件

## 安装

```
yarn add @rrmc/antd-breadcrumbs
```

或者

```
npm i @rrmc/antd-breadcrumbs

```

## 示例

[@rrmc/antd-breadcrumbs](https://codesandbox.io/s/antd-breadcrumbs-kfq3t0?file=/src/App.tsx)

## Props

| name | describe                                                           | type     | default     |
| ---- | ------------------------------------------------------------------ | -------- | ----------- |
| `text` | 可能需要自定义面包屑的名称，这会覆盖路由配置中的`breadcrumbs.text` | `string` | `undefined` |
| `separator`| `antd`中`breadcrumbs`组件中的`props.separator`| `string` | `undefined`

## 如何使用

Suppose the configuration file of a route is as follows


```js

import { useMemo } from "react";
import { MRouter, defineRouterConfig, useRouter } from "react-router-manage";
import Breadcrumbs from "@rrmc/antd-breadcrumbs";
import { Menu, Layout } from "antd";

import "./styles.css";

const { Sider, Content } = Layout;

function A() {
  return "A";
}
function ADetail() {
  return "ADetail";
}

function B() {
  return "B";
}
function BDetail() {
  return "BDetail";
}

function Edit() {
  return "edit";
}

function getItems(routes) {
  return routes.map((i) => {
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
    <Layout style={{ height: "100%" }}>
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
        <div style={{marginBottom: 10}}>
          <Breadcrumbs />
        </div>

        <div>{children}</div>
      </Content>
    </Layout>
  );
}

const routerConfig = defineRouterConfig({
  routes: [
    {
      title: "GroupA",
      name: "groupA",
      path: "group-a",
      items: [
        {
          title: "Alist",
          name: "Alist",
          path: "list",
          component: A,
          items: [
            {
              title: "Edit",
              name: "AEdit",
              path: "edit",
              component: Edit
            }
          ]
        },
        {
          title: "ADetail",
          name: "aDetail",
          path: "detail",
          component: ADetail
        }
      ]
    },
    {
      title: "GroupB",
      name: "groupB",
      path: "group-b",
      items: [
        {
          title: "Blist",
          name: "Blist",
          path: "list",
          component: B
        },
        {
          title: "BDetail",
          name: "bDetail",
          path: "detail",
          component: BDetail
        }
      ]
    }
  ]
});

export default function App() {
  return <MRouter routerConfig={routerConfig} wrapComponent={RouterLayout} />;
}


```
