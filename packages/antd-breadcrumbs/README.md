# @rrmc/antd-breadcrumbs

Automatically generate breadcrumb components based on `antd` component library and `reat-router-manage`

## install

```
yarn add @rrmc/antd-breadcrumbs
```

or

```
npm i @rrmc/antd-breadcrumbs

```

## DEMO

[@rrmc/antd-breadcrumbs](https://codesandbox.io/s/antd-breadcrumbs-kfq3t0?file=/src/App.tsx)

## Props

| name        | describe                                                                                      | type     | default     |
| ----------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `text`      | You may need to customize the name of bread crumbs, which will override the`breadcrumbs.text` | `string` | `undefined` |
| `separator` | `props.separator` in the`breadcrumbs` component of `antd`                                     | `string` | `undefined` |

## 如何使用

假如一个路由的配置文件是这样的

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
        <div style={{ marginBottom: 10 }}>
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
