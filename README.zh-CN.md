# react-router-manage

<p align="center">
  <a href="https://www.npmjs.com/package/react-router-manage">
    <img src="https://img.shields.io/npm/v/react-router-manage.svg" />
  </a>
  <a href="https://www.npmjs.com/package/react-router-manage">
    <img src="https://img.shields.io/npm/dm/react-router-manage.svg" alt="Downloads per month on npm."  />
  </a>
   <a href="https://npmcharts.com/compare/react-router-manage?minimal=true">
    <img src="https://img.shields.io/npm/dt/react-router-manage.svg" alt="Total downloads on npm." />
  </a>
  <a href="http://packagequality.com/#?package=react-router-manage">
    <img src="http://npm.packagequality.com/shield/react-router-manage.svg" />
  </a>
</p>

<p align='center'>
  简体中文 | <a href='./README.md'>English</a>
</p>

## 功能简介

`react-router-manage`基于`react-router` `v6`版本实现，通过配置可实现路由的鉴权、路由守卫、路由的增删改查等功能。由于`react-router` `v5`升级到`v6`有较大的成本，`react-router-manage`提供了原来 v5 部分的 api 用于兼容使用 v5 的项目，用于平滑升级 v6

- 🛠 [**[`config router`](#routerConfig)**] - 集中配置路由，快捷、方便管理。
- ＋ [**[`addRoutes`](#useAddRoutes)**] - 动态增加路由：可使用 hook`useAddRoutes`添加路由，自动刷新视图。
- ➖ [**[`removeRoutes`](#useRemoveRoutes)**] - 动态删除路由：可使用 hook`useRemoveRoutes`删除路由，自动刷新视图。
- 🖇 [**[`updateRoutes`](#useUpdateRoutes)**] - 动态修改路由：可使用 hook`useUpdateRoutes`修改路由。
- 🔐 [**permission**] - 权限控制：配置路由的 code，自动管理路由的权限
- 👨‍✈️‍ [**Route guard**] - 提供路由进入时的回调 `beforeEnter` and `beforeEachMount`, 路由离开时的钩子 `useBeforeLeave`
- 🌲 [**navigation**] - 层级导航：支持层级导航，自动实现父子级路由的导航栏生成，例如面包屑、菜单导航
  - 基于 antd 自动生成的面包屑导航 [`antd-breadcrumbs`](https://github.com/NSFI/react-router-manage/blob/main/packages/antd-breadcrumbs/README.zh-CN.md)

## 安装

```sh

npm install react-router-manage --save

```

## 示例

- [基本示例](https://codesandbox.io/s/react-router-manage-basic-c7h2vp)
- [子级路由的配置，即：**`Outlet`** 路由的配置](https://codesandbox.io/s/react-router-manage-children-obi6t2)
- [全局路由守卫`beforeEachMount`](https://codesandbox.io/s/react-router-manage-beforeeachmount-247k3l)
- [路由操作`useAddRoutes`,`useUpdateRoutes`, `useRemoveRoutes`](https://codesandbox.io/s/react-router-manage-actions-re4qxb?file=/src/App.tsx)
- [认证-基础示例](https://codesandbox.io/s/react-router-manage-auth-nww6rp)
- [基于 antd 的自动生成面包屑](https://codesandbox.io/s/antd-breadcrumbs-kfq3t0?file=/src/App.tsx), [`antd-breadcrumbs`](https://github.com/NSFI/react-router-manage/blob/main/packages/antd-breadcrumbs/README.zh-CN.md)

## 配置项

### routerConfig

路由的全局配置

| 字段名                                    | 说明                                                                                    | 类型                                                                                                             | 是否必填             |
| ----------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| `basename`                                | 路由的路由前缀                                                                          | `string`                                                                                                         | 非必填，默认 `/`     |
| **[`routes`](#routeConfig)**              | 路由的层级配置                                                                          | [`RouteTypeI[]`](#RouteTypeI)                                                                                    | 必填                 |
| **[`beforeEachMount`](#beforeEachMount)** | 每个路由在渲染前调用                                                                    | `(to: RouteTypeI \| undefined, next: ({path?: string; name: string} \| React.ComponentType<any>) => void): void` | 非必填               |
| `autoDocumentTitle`                       | 文档的 title 会根据路由切换而改变                                                       | `boolean` \| `(RouteTypeI[]) => string`                                                                          | 非必填, 默认 `false` |
| `LoadingComponent`                        | 用于 Suspense 加载异步组件时配置 fallback 或在有 beforeEnter 钩子的`next`时，显示加载中 | React.FunctionComponent<any>                                                                                     | `not required`       |

#### 路由模式

路由模式目前有两种

- `history模式`
- `hash模式`

**一个简单的全局配置（`history模式`）**

```tsx
import React from 'react';
import { MRouter, defineRouterConfig } from 'react-router-manage';

const routerConfig = defineRouterConfig({
  basename: '/',
  routes: [{...}], // 请查看下方路由配置 routes
  // autoDocumentTitle: true, // 设置true，会自动设置变换document.title,
  // autoDocumentTitle: (routes) => return `网易云商-${routes.map((i) => i.title).join('-')}`, // 自定已配置document.title的设置

  // beforeEachMount: (to, next) => { // 配置全局的路由进入守卫，可查看下方全局路由守卫介绍
  //   console.log(to)
  //   next();
  // }
})

function App () {
  return (
    <MRouter routeConfig={routeConfig}>
      {(children) => children}
    </MRouter>
  )
}

```

**一个简单的全局配置（`hash模式`）**

```tsx
import React from 'react';
import { MHRouter, defineRouterConfig } from 'react-router-manage';

const routerConfig = defineRouterConfig({
  basename: '/',
  routes: [{...}], // 请查看下方路由配置 routes
  // autoDocumentTitle: true, // 设置true，会自动设置变换document.title,
  // autoDocumentTitle: (routes) => return `网易云商-${routes.map((i) => i.title).join('-')}`, // 自定已配置document.title的设置

  // beforeEachMount: (to, next) => { // 配置全局的路由进入守卫，可查看下方全局路由守卫介绍
  //   console.log(to)
  //   next();
  // }
})

function App () {
  return (
    <MHRouter routeConfig={routeConfig}>
      {(children) => children}
    </MHRouter>
  )
}

```

### 路由配置 routes

| 字段名        | 说明                                                                                                                                              | 类型                                                                                                                        | 是否必填             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `name`        | 路由的名称, **名称全局唯一、不能重复，用于获取路由**                                                                                              | `string`                                                                                                                    | 必填                 |
| `path`        | 路由的路径，**组合后的完整路径全局唯一、不能重复，但是如果是嵌套的子路由，可以不配置, 相当于`Route`组件中设置`index`属性**                        | `string`                                                                                                                    | 必填                 |
| `title`       | 路由的中文名称，显示的名称，用于自动生成导航和面包屑中                                                                                            | `string`                                                                                                                    | 非必填               |
| `index`       | 同级有多个路由，会找带 index 的路由作为进入的路由                                                                                                 | `boolean`                                                                                                                   | 非必填               |
| `component`   | 路由匹配的组件, **如果没有配置，则会跳到下一级有权限的路由**                                                                                      | `React.Component` \| `React.FunctionComponent`                                                                              | 非必填               |
| `items`       | 视觉上的子级路由，用于导航时的父子级关系，实际为同一级路由                                                                                        | `RouteTypeI[]`                                                                                                              | 非必填               |
| `children`    | 子级路由、在 v6 版本中渲染在 `Outlet`组件中                                                                                                       | `RouteTypeI[]`                                                                                                              | 非必填               |
| `props`       | 渲染组建时候会自动注入 Props 里面的内容, `<Component {...props}/>`                                                                                | `Record<string, any>`                                                                                                       | 非必填               |
| `hidden`      | 导航的显示与隐藏                                                                                                                                  | `boolean`                                                                                                                   | 非必填, 默认 `false` |
| `code`        | 用于权限校验，会对比`permissionList`里的值                                                                                                        | `string`\| `string[]`\| `(route: RouteTypeI) => boolean`                                                                    | 非必填，默认无       |
| `redirect`    | 路由重定向到指定路由，优先级高于 component                                                                                                        | `string`                                                                                                                    | 非必填，默认无       |
| `beforeEnter` | 渲染该路由钱调用的方法，如果调用`next`中传入了组件，则会渲染该组件，路由配置的组件则不会渲染                                                      | `(to: RouteTypeI \| undefined, next: (options?: {name?: string; path?: string} \| React.ComponentType<any>) => void): void` | 非必填， 默认无      |
| `beforeLeave` | 离开路由前调用的回调，需主动调用`next`                                                                                                            | `(to: RouteTypeI \| undefined,from: RouteTypeI \| undefined, next: () => void): void`                                       | 非必填               |
| `meta`        | 一些自定义的信息可以放这里，`currentRoute.meta可以获取到该字段`                                                                                   | `Record<string, any>`                                                                                                       | 非必填               |
| `fullscreen`  | 是否全屏，在`base-layout-router`中监测到当前`route` `fullscreen`为`true`,则会隐藏导航栏                                                           | `boolean`                                                                                                                   | 非必填,默认无        |
| `icon`        | 用于显示导航的 icon                                                                                                                               | `string`                                                                                                                    | 非必填, 默认无       |
| `type`        | 如果`type`为`null`字符串，则此路由不会真正渲染，但是可以设置正确的 currentRoute                                                                   | `real` \| `null`                                                                                                            | 非必填，默认 `real`  |
| `bredcrumbs`  | 用于配置路由中面包屑的配置, [`antd-breadcrumbs`](https://github.com/NSFI/react-router-manage/blob/main/packages/antd-breadcrumbs/README.zh-CN.md) | [BreadcrumbsI](#BreadcrumbsI)                                                                                               | 非必填               |

#### BreadcrumbsI

| 字段名   | 说明                                              | 类型                                                                      | 是否必填 |
| -------- | ------------------------------------------------- | ------------------------------------------------------------------------- | -------- |
| `isRoot` | 是否是面包屑的根节点，如果是，则从下一级开始算    | `boolean`                                                                 | `false`  |
| `text`   | 面包屑的名称，如果不配置，则默认使用`route.title` | `string` \| `React.ReactNode` \| `(route: RouteTypeI) => React.ReactNode` | 非必填   |
| `hidden` | 是否隐藏本级面包屑显示                            | `boolean`                                                                 | `false`  |

**注意事项**

- 如果在`code`里配置了一个函数，由于在路由初始化会批量调用，请不要进行异步调用，如果需要建议使用`beforeEnter`达到同样效果
- 如果父级路由没有配置 `component，` 跳转到该路由则会寻找 items,children 下第一个有权限的路由，若找不到，则会显示无权限页面
- 如果`redirect`和`component`同时进行了配置，则`component`会被忽略
- `beforeEnter` 和 `beforeEachMount` 中 `next`可传入一个组件，若传入则会渲染该组件, _如果在 react 使用严格模式，则函数可能会调用两次，这个是正常情况_

#### items 与 children

通过 `ys-router`，你可以使用`children`, `items`配置来表达路由导航的父子关系。

##### items 同一级别的路由，父级与子级渲染一个

```js

/**
 *  文章列表页和文章详情页在不同的页面
 *  /user/article/list  文章列表页面
 *  /user/article/detail 文章详情页
 * */
/user/article/list                     /user/article/detail
+------------------+                  +-----------------+
| +--------------+ |                  | +-------------+ |
| | ------------ | |  +------------>  | | content     | |
| | ------------ | |                  | |             | |
| | ------------ | |                  | |             | |
| | ------------ | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

**一个有基本路由配置的示例**

```tsx
import React from "react";
import { MRouter, defineRouterConfig } from "react-router-manage";

const Users = () => {
  return <div>Users</div>;
};
const Profile = () => {
  return <div>Profile</div>;
};

const appRouterConfig = defineRouterConfig({
  basename: "/",
  // 配置层级导航
  routes: [
    {
      name: "user", // 每个路由对应一个全局唯一的name
      path: "user", // 路径会自动在内部转换为 /user, 由于这里没有配置component，进入 /user 会重定向到 /user/list
      title: "用户中心", // 路由名字
      items: [
        // items用于配置具有层级结构的导航，例如面包屑导航，
        {
          name: "userList",
          path: "list", // 路径会自动在内部转换为 /user/list
          component: Users,
          title: "用户列表"
        },
        {
          name: "profile",
          path: "profile", // 路径会自动在内部转换为 /user/list
          component: Profile,
          title: "个人中心"
        }
      ]
    }
  ]
});

function App() {
  return <MRouter routeConfig={routeConfig}>{children => children}</MRouter>;
}
```

##### children 嵌套路由

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如：

```js
/**
 * 文章列表页和文章详情页在相同的页面
 *  /user/article/list  文章列表页面
 *  /user/article/detail 文章详情页
 * */
/user/article/list                     /user/article/detail
+------------------+                  +-----------------+
| user             |                  | user          |
| +--------------+ |                  | +-------------+ |
| |     list     | |  +------------>  | | content     | |
| | ------------ | |                  | |             | |
| | ------------ | |                  | |             | |
| | ------------ | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

**一个有嵌套路由配置的示例**

```tsx
import React from "react";
import Outlet from "react-router";
import { MRouter, defineRouterConfig } from "react-router-manage";

const Users = () => {
  return (
    <div>
      <div>Users</div>
      <Outlet />
    </div>
  );
};
const Profile = () => {
  return <div>Profile</div>;
};

const UserProfile = () => {
  return <div>UserProfile</div>;
};
const UserArticles = () => {
  return <div>UserArticles</div>;
};

const appRouterConfig = defineRouterConfig({
  basename: "/",
  // 配置层级导航
  routes: [
    {
      name: "user", // 每个路由对应一个全局唯一的name
      path: "user", // 路径会自动在内部转换为 /user, 由于这里没有配置component，进入 /user 会重定向到 /user/list
      title: "用户中心", // 路由名字
      items: [
        // items用于配置具有层级结构的导航，例如面包屑导航，
        {
          name: "userList",
          path: "list", // 路径会自动在内部转换为 /user/list
          component: Users,
          title: "用户列表",
          children: [
            {
              name: "userProfile",
              path: "profile",
              title: "用户信息",
              component: UserProfile
            },
            {
              name: "userArticle",
              path: "article",
              title: "用户文章列表",
              component: UserArticles
            }
          ]
        },
        {
          name: "profile",
          path: "profile", // 路径会自动在内部转换为 /user/list
          component: Profile,
          title: "个人中心"
        }
      ]
    }
  ]
});

function App() {
  return <MRouter routeConfig={routeConfig}>{children => children}</MRouter>;
}
```

## 权限路由

### 权限`permissionMode`支持两种模式 `parent` adn `children`, 默认是`parent`

- 如果 `permissionMode` 是 `parent`，如果父路由没有权限，那么子路由都没有权限
- 如果 `permissionMode` 是 `children`，如果子路由有权限，那么父路由不管配置的有无权限，都会自动转为有权限

### 配置字符串 code 的批量校验

- 需要在`MRouter`组件中传入`permissionList`，并设置 `hasAuth` 为 `true`， 默认为 true
- 需要在路由配置中配置 code，如果不配置，则默认有权限

**一个鉴权配置的示例**

```jsx
const permissionList = [`admin`, "staff"]; // 代表当前用户是admin
// const permissionList = ['staff'] // 代表当前用户是员工

const appRouterConfig = defineRouterConfig({
  basename: "/",
  // 配置层级导航
  routes: [
    {
      name: "user", // 每个路由对应一个全局唯一的name
      path: "user", // 路径会自动在内部转换为 /user, 由于这里没有配置component，进入 /user 会重定向到 /user/list
      title: "用户中心", // 路由名字
      code: [`admin`, "staff"],
      items: [
        // items用于配置具有层级结构的导航，例如面包屑导航，
        {
          name: "userList",
          path: "list", // 路径会自动在内部转换为 /user/list
          component: Users,
          title: "用户列表",
          code: "admin" // 此路由如果是是员工，则会被过滤
          // code: (currentRoute) => {
          //   // 也可以在这里进行自定义的校验，
          //   // 不要在这里进行校验，因为这里是再初始化时进行批量的校验，如果要实现进入该路由才校验，请使用 beforeEachMount
          //   return getHasAuth(currentRoute);
          // }
        },
        {
          name: "profile",
          path: "profile", // 路径会自动在内部转换为 /user/list
          component: Profile,
          title: "个人中心",
          code: [`admin`, "staff"] // 都有个人中心
        }
      ]
    }
  ]
});

// hasAuth 可以不配置，默认为true
function App() {
  return (
    <MRouter routeConfig={routeConfig} permissionList={permissionList} hasAuth={true} permissionMode="parent">
      {children => children}
    </MRouter>
  );
}
```

### beforeEachMount 的路由鉴权

修改上述的 appRouterConfig

```jsx
const NoAuth = () => {
  return <div>无权限</div>;
};
const appRouterConfig = defineRouterConfig({
  basename: "/",
  // 配置层级导航
  routes: [
    {
      name: "user", // 每个路由对应一个全局唯一的name
      path: "user", // 路径会自动在内部转换为 /user, 由于这里没有配置component，进入 /user 会重定向到 /user/list
      title: "用户中心", // 路由名字
      items: [
        // items用于配置具有层级结构的导航，例如面包屑导航，
        {
          name: "userList",
          path: "list", // 路径会自动在内部转换为 /user/list
          component: Users,
          title: "用户列表"
        },
        {
          name: "profile",
          path: "profile", // 路径会自动在内部转换为 /user/list
          component: Profile,
          title: "个人中心"
        }
      ]
    }
  ],
  beforeEachMount: (to, next) => {
    if (to.name === "userList") {
      next();
    } else {
      next(NoAuth);
    }
  }
});
```

## 导出的 hooks

| hooks 名          | 类型                                                                              | 用途                                                                              |
| ----------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `useAddRoutes`    | `() => (routes: RouteTypeI[]) => void`                                            | 动态添加路由                                                                      |
| `useUpdateRoutes` | `() => (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]) => void` | 动态更新路由                                                                      |
| `useRemoveRoutes` | `() => (routeNames: string[]) => void`                                            | 动态删除路由                                                                      |
| `useBeforeLeave`  | (`fn: BeforeLeaveI, options: {beforeunload?: ((event?: Event) => any)}) => void`  | 路由离开时的守卫，需调用 next 才可以正常跳转                                      |
| `useRouter`       | `() => RoutesStateStruct`                                                         | 路由存储的一些状态                                                                |
| `useHistory`      | `() => BrowserHistory`                                                            | 获取`history`，`react-router v6` 没有暴露，用户 v5 升级 v6 的平滑过度, 不推荐使用 |

### 路由导航 useRouter

`useRouter`可在组件中获取各类状态数据

`useRouter()` 返回的 `state:RoutesStateStruct`

| 字段名         | 说明                                               | 类型                                                                                           |
| -------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `currentRoute` | 当前路由对象                                       | `RouteTypeI`                                                                                   |
| `routesMap`    | 所有的路由 name，path 对应的路由都存储在这个对象中 | `Record<string, RouteTypeI>`                                                                   |
| `navigate`     | 用于跳转路由                                       | `(to: string, {query: Record<string, any>; params: Record<string, any>; state: any}) => void}` |
| `authRoutes`   | 认证后有权限的路由对象                             | `RouteTypeI[]`                                                                                 |
| `routes`       | 传入的路由对象 routes                              | `RouteTypeI[]`                                                                                 |
| `query`        | 当前地址栏查询参数                                 | `Record<string, string>`                                                                       |
| `params`       | 当前地址栏动态路由查询参数                         | `Record<string, string>`                                                                       |

#### navigate

useRouter 返回的 navigate 是在 `react-router`中`useNavigate`上进行的扩展，对路由的跳转做了一些拦截处理，所以大家**不要使用`react-router`中的`userNavigate`**

navigate 有两个参数，第一个参数为要跳转的路径，第二个参数为跳转的路由配置, 类型如下

`(to: string, {query: Record<string, any>; params: Record<string, any>; state: any}) => void}`

- query, 在跳转路由的时候会自动把查询参数添加到地址中，例如 `navigate('/user/detail', { query: {id: 13}})`, 会在跳转的时候转为 `/user/detail?id=13`
- params, 当配置了带有参数的动态路由，会自动替换， 例如 `navigate('/user/detail/:id', { params: {id: 13}})`, 会在跳转的时候转为 `/user/detail/13`
- state, 这个是 history 原始的 state

### currentRoute

`currentRoute` 包含配置的时候传入的路由信息，内部会自动添加 ` parent`` 用来标识父级路由, 例如：  `parentRoute = currentRoute.parent`

```jsx
...
import { useRouter } from 'react-router-manage'
...

function Item() {
  const { currentRoute, routesMap } = useRouter();

  const onClick = () => {
    navigate(routesMap.LIST.path); // navigate接收一个字符串
  }
  return (
    <div><Button onClick={onClick}>跳转到LIST</Button></div>
  )
}

```

### useBeforeLeave 组件中的路由守卫

useBeforeLeave 需要调用 next 才可以正常跳转

```jsx
import { useBeforeLeave, useRouter } from 'react-router-manage';
import { Modal } from 'ppfish';

const function Item() {
  const {navigate, routesMap} = useRouter();
  useBeforeLeave((to, from, next) => {
    Modal.confirm({
      title: '您确定要跳转吗？',
      onOk: () => {
        next();
      }
    })
  })
  const onClick = () => {
    navigate(routesMap.List.path);
  }
  return (<div>
    <Button onClick={onClick}>跳转</Button>
  </div>)
}
```

### 动态路由

#### useAddRoutes

`useAddRoutes` 添加路由

```js
const AddRoutesWrapComponent = ({ children }) => {
  const addRoutes = useAddRoutes();

  useEffect(() => {
    addRoutes([
      {
        parentName: "PAGE1", // 需传入parentName，不传则会插入到第一层级下
        title: "动态添加的页面",
        name: "add",
        path: "add",
        component: Page,
        code: "staff"
      }
    ]);
  }, []);
  return <div data-testid="__router-children">{children}</div>;
};
```

#### useUpdateRoutes

`useUpdateRoutes` 更新路由

```js
const UpdateRoutesWrapComponent = ({ children }) => {
  const updateRoutes = useUpdateRoutes();

  useEffect(() => {
    updateRoutes([
      {
        routeName: "PAGE1",
        routeData: {
          title: "修改后的页面" // 修改title
        }
      }
    ]);
  }, [updateRoutes]);
  return <div data-testid="__router-children">{children}</div>;
};
```

#### useRemoveRoutes

`useRemoveRoutes` 删除路由

```js
const RemoveRoutesWrapComponent = ({ children }) => {
  const removeRoutes = useRemoveRoutes();

  useEffect(() => {
    removeRoutes(["PAGE1"]); // 传入要删除的 route的name字段
  }, []);
  return <div data-testid="__router-children">{children}</div>;
};
```

## 路由守卫

### 全局路由守卫

| 名称              | 说明                                                 | 类型                                                                |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------- |
| `beforeEachMount` | 在每一个路由渲染之前调用, `next`必须调用才会渲染组件 | `(to: RouteTypeI \| undefined, next: {name?: string; path?: string} | React.ComponentType<any>) =void` |

```js

import NoAuth from './NoAuth', // 无权限组件

const appRouterConfig = {
    basename: '/',
    routes: [
        {
            name: 'root',
            title: '根路径',
            path: '/',
            items: [
                {
                    name: 'page1',
                    title: '页面1',
                    path: 'page1',
                    components: Page,
                    custom: 'aaa',
                },
                {
                    name: 'page2',
                    title: '页面2',
                    path: 'page2',
                    components: Page2,
                    custom: 'bbb',
                }
            ]
        }
    ],
    beforeEachMount(to, next) {
        if (to.custom === 'aaa) {
            next(); // 调用，则会正常渲染该路由对应的组件
        } else {
            next(NoAuth) // 则渲染无权限组件
        }
    }
}

```

### 局部路由守卫

| 名称          | 说明                                                                         | 类型                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `beforeEnter` | 在当前路由渲染之前调用（在`beforeEachMount`之后）, next 必须调用才会渲染组件 | `(to: RouteTypeI \| undefined, next: {name?: string; path?: string} \| React.ComponentType<any>): void`                               |
| `beforeLeave` | 离开路由前调用的回调, 需主动调用`next`才会正常跳转                           | `(to: RouteTypeI \| undefined,from: RouteTypeI \| undefined, next: {name?: string; path?: string} \| React.ComponentType<any>): void` |

```js
import NoAuth from './NoAuth', // 无权限组件

const appRouterConfig = {
    basename: '/',
    routes: [
        {
            name: 'root',
            title: '根路径',
            path: '/',
            items: [
                {
                    name: 'page1',
                    title: '页面1',
                    path: 'page1',
                    components: Page,
                    custom: 'aaa',
                    beforeEnter: (to, next) => {
                        //...
                        next(); // 需要跳转则调用
                    },
                    beforeLeave: (to, next) => {
                        //...
                        next(); // 需要跳转则调用
                    }
                },
                {
                    name: 'page2',
                    title: '页面2',
                    path: 'page2',
                    components: Page2,
                     custom: 'bbb',
                }
            ]
        }
    ],
    beforeEachMount(to, next) {
        if (to.custom === 'aaa) {
            next(); // 调用，则会正常渲染该路由对应的组件
        } else {
            next(NoAuth) // 则渲染无权限组件
        }
    }
}

```

## 正在开发中的内容

- KeepAlive 的支持
- 示例代码的完善
- 路由切换过渡动画

## 关于

`react-router-manage`在[网易云商](https://b.163.com)内部多个项目中使用，为回馈社区，决定开源，愿和社区的小伙伴共建好用的 react 路由管理库
