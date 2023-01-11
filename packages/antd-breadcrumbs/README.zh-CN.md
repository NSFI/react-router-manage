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

## Props

| name | describe                                                           | type     | default     |
| ---- | ------------------------------------------------------------------ | -------- | ----------- |
| `text` | 可能需要自定义面包屑的名称，这会覆盖路由配置中的`breadcrumbs.text` | `string` | `undefined` |
| `separator`| `antd`中`breadcrumbs`组件中的`props.separator`| `string` | `undefined`

## 如何使用

加入一个路由的配置文件是这样的

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
