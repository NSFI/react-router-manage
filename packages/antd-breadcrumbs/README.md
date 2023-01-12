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

## Props

| name | describe                                                           | type     | default     |
| ---- | ------------------------------------------------------------------ | -------- | ----------- |
| `text` | You may need to customize the name of bread crumbs, which will override the`breadcrumbs.text` | `string` | `undefined` |
| `separator`| `props.separator` in the`breadcrumbs` component of `antd`| `string` | `undefined`|

## 如何使用

假如一个路由的配置文件是这样的

```js

import React from 'React';
import { MRouter, defineRouterConfig } from "react-router-manage";
import Breadcrumbs from "@rrmc/antd-breadcrumbs";

function A() {
    return 'A'
}
function ADetail() {
    return 'ADetail'
}

function B() {
    return 'B'
}
function BDetail() {
    return 'BDetail'
}

function Layout({children}) {
    return (<div>
        <Breadcrumbs />
        <div>{children}</div>
    </div>)
}

const routerConfig = defineRouterConfig({
    routes: [
        {
            title: 'A',
            name: 'a',
            component: A,
            items: [
                {
                    title: 'ADetail',
                    name: 'detail',
                    component: ADetail,
                }
            ]
        },
        {
            title: 'B',
            name: 'b',
            component: B,
            items: [
                {
                    title: 'BDetail',
                    name: 'detail',
                    component: BDetail,
                }
            ]
        }
    ]
})

export default function App() {
    return <MRouter routerConfig={defineRouterConfig} />
}

```
