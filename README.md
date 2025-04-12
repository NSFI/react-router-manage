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
  <a href="https://bundlephobia.com/result?p=react-router-manage" title="react-router-manage latest minified+gzip size"><img src="https://badgen.net/bundlephobia/minzip/react-router-manage" alt="gzip size"></a>
</p>

<p align='center'>
  English | <a href='./README.zh-CN.md'>简体中文</a>
</p>

## Features

`react-router-manage` is based on `react-router` `v6`. It can realize the function of authentication, guard, add, delete and check of route by configuration.
Because `react-router` `v5` upgrades to `v6` have a high cost, `react-router-manage` provides the API from the original `v5` section for compatible projects that use `v5` for smooth upgrades to `v6`

- 🛠 [**[`config router`](#routerConfig)**] - Centralized router configuration, fast and convenient management.
- ＋ [**[`addRoutes`](#useAddRoutes)**] - Dynamically add `routes`: you can use hook `useAddRoutes` to add routes and automatically refresh the view.
- ➖ [**[`removeRoutes`](#useRemoveRoutes)**] - Dynamically delete routes: you can use hook `useRemoveRoutes` to delete routes and automatically refresh the view.
- 🖇 [**[`updateRoutes`](#useUpdateRoutes)**] - Dynamically modify routes: you can use hook `useUpdateRoutes` to modify routes.
- 🔐 [**permission**] - Permission control: configure the code of the route and automatically manage the permission of the route
- 👨‍✈️‍ [**route guard**] - Provide hooks for route entry config `beforeEnter` and **[`beforeEachMount`](#beforeEachMount)**, route exit hook **[`useBeforeLeave`](#useBeforeLeave)**
- 🌲 [**navigation**] - level navigation: supports level navigation, and automatically generates navigation bars for parent-child routes, such as breadcrumbs and menu navigation
  - Breadcrumb navigation based on `antd` automatic generation [`antd-breadcrumbs`](https://github.com/NSFI/react-router-manage/blob/main/packages/antd-breadcrumbs/README.md)

## Installation

```sh

npm install react-router-manage --save

```

## DEMO

- [basic](https://codesandbox.io/s/react-router-manage-basic-c7h2vp)
- [config children routes, eg: **`Outlet`** children level routes](https://codesandbox.io/s/react-router-manage-children-obi6t2)
- [global guard `beforeEachMount`](https://codesandbox.io/s/react-router-manage-beforeeachmount-247k3l)
- [routes operation `useAddRoutes`,`useUpdateRoutes`, `useRemoveRoutes`](https://codesandbox.io/s/react-router-manage-actions-re4qxb?file=/src/App.tsx)
- [auth-basic](https://codesandbox.io/s/react-router-manage-auth-nww6rp)
- [@rrmc/antd-breadcrumbs](https://codesandbox.io/s/antd-breadcrumbs-kfq3t0?file=/src/App.tsx)

## Configuration items

### routerConfig

| field name                                | description                                                                                                         | type                                                                               | is required                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | -------------- |
| `basename`                                | the routing prefix of the route                                                                                     | `string`                                                                           | `not required`, default is `/`            |
| **[`routes`](#routeConfig)**              | hierarchical configuration of routes                                                                                | [`RouteTypeI[]`](#RouteTypeI)                                                      | `required`                                |
| **[`beforeEachMount`](#beforeEachMount)** | each route is called before rendering                                                                               | `(to: [RouteTypeI](#RouteTypeI) \| undefined, next: ({path?: string; name: string} | React.ComponentType<any>) => void): void` | `not required` |
| `autoDocumentTitle`                       | the title of the document changes depending on the route switch                                                     | `boolean` \| `(RouteTypeI[]) => string`                                            | `not required`, default is `false`        |
| `LoadingComponent`                        | Used for react `Suspend` component to configure fallback when loading asynchronous components or before next called | React.FunctionComponent<any>                                                       | `not required`                            |

#### router modes

There are currently two router modes:

- `history`
- `hash`

**A simple global configuration(`history` mode)**

```tsx
import React from 'react';
import { MRouter, defineRouterConfig } from 'react-router-manage';

const routerConfig = defineRouterConfig({
  basename: '/',
  routes: [{...}], // Please check the routes configuration below
  // autoDocumentTitle: true, // if true，the transform is automatically set document.title,
  // autoDocumentTitle: (routes) => return `网易云商-${routes.map((i) => i.title).join('-')}`, // custom configuration document.title

  // beforeEachMount: (to, next) => { // configure the global route entry guard. You can see the introduction of the global route guard below
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

**A simple global configuration(`hash` mode)**

```tsx
import React from 'react';
import { MHRouter, defineRouterConfig } from 'react-router-manage';

const routerConfig = defineRouterConfig({
  basename: '/',
  routes: [{...}], // Please check the routes configuration below
  // autoDocumentTitle: true, // if true，the transform is automatically set document.title,
  // autoDocumentTitle: (routes) => return `网易云商-${routes.map((i) => i.title).join('-')}`, // custom configuration document.title

  // beforeEachMount: (to, next) => { // configure the global route entry guard. You can see the introduction of the global route guard below
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

### RouteTypeI

| field name    | description                                                                                                                                                                                                                                      | type                                                                                  | is required                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------- | ------------ |
| `name`        | the name of the route, **the name is globally unique and non-repeatable, and is used to obtain the route info**                                                                                                                                  | `string`                                                                              | required                                  |
| `path`        | the path of the route, **the combined full path is globally unique and can not be repeated。 But if it is a nested sub route, it can not be configured, it is equivalent to setting the `index` attribute in the react-route `Route` component** | `string`                                                                              | required                                  |
| `title`       | the Chinese name or other name of the route, the name of the display, used to automatically generate navigation and breadcrumbs                                                                                                                  | `string`                                                                              | not required                              |
| `index`       | the first route                                                                                                                                                                                                                                  | `boolean`                                                                             | not required                              |
| `component`   | current route matching component, **if it is not configured, it will jumps to the next level of privileged route**                                                                                                                               | `React.Component` \| `React.FunctionComponent`                                        | not required                              |
| `items`       | the visual sub-level routes, used for navigation parent-child relationship, is actually the same level of route                                                                                                                                  | `RouteTypeI[]`                                                                        | not required                              |
| `children`    | sub-routing, rendering in `react-router V6` in `Outlet` component                                                                                                                                                                                | `RouteTypeI[]`                                                                        | not required                              |
| `props`       | when rendering the route, the props content is automatically injected,, `<Component {...props}/>`                                                                                                                                                | `Record<string, any>`                                                                 | not required                              |
| `code`        | used for permission verification, will be compared `permissionList`                                                                                                                                                                              | `string`\| `string[]`\| `(route: RouteTypeI) => boolean`                              | not required                              |
| `redirect`    | route redirect to the specified route with priority over component                                                                                                                                                                               | `string`                                                                              | not required                              |
| `beforeEnter` | render the method called by the routing money. if a component is passed in the call `next` function, the component will be rendered. if `next` function not call, The component configured by the route will not be rendered                     | `(to: RouteTypeI \| undefined, next: (options?: {name?: string; path?: string}        | React.ComponentType<any>) => void): void` | not required |
| `beforeLeave` | The callback called before leaving the route needs to be actively called                                                                                                                                                                         | `(to: RouteTypeI \| undefined,from: RouteTypeI \| undefined, next: () => void): void` | not required                              |
| `meta`        | Some custom information can be put here,，you call use `currentRoute.meta` get meta info                                                                                                                                                         | `Record<string, any>`                                                                 | not required                              |
| `hidden`      | display and hidden of navigation                                                                                                                                                                                                                 | `boolean`                                                                             | not required, default is `false`          |
| `fullscreen`  | You can hidden navigation ui, `fullscreen` set `true`,navigation is hidden, _the current configuration is use in [`router-base-nav`](https://github.com/NSFI/router-base-nav)_                                                                   | `boolean`                                                                             | not required                              |
| `icon`        | Icon for displaying navigation, _the current configuration is use in [`router-base-nav`](https://github.com/NSFI/router-base-nav)_                                                                                                               | `string`                                                                              | not required                              |
| `type`        | if `type` is `null` string, this route is not really rendered, but the correct currentRoute can be set, _the current configuration is use in [`router-base-nav`](https://github.com/NSFI/router-base-nav)_                                       | `real` \| `null`                                                                      | not required, default is `real`           |
| `bredcrumbs`  | used to configure breadcrumbs in routing, [`antd-breadcrumbs`](https://github.com/NSFI/react-router-manage/blob/main/packages/antd-breadcrumbs/README.md)                                                                                        | [BreadcrumbsI](#BreadcrumbsI)                                                         | not required                              |

#### BreadcrumbsI

| field name | description                                                                               | type                                                                      | is required  |
| ---------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------ |
| `isRoot`   | Is it the root node of breadcrumbs? If it is, it will be calculated from the next level   | `boolean`                                                                 | `false`      |
| `text`     | The name of breadcrumbs. If it is not configured, it will be used by default`route.title` | `string` \| `React.ReactNode` \| `(route: RouteTypeI) => React.ReactNode` | not required |
| `hidden`   | Whether to hide the display of bread crumbs at this level                                 | `boolean`                                                                 | `false`      |

**NOTE**

- If a function is configured in `code`, since it will be called in batch during route initialization, please do not call asynchronously. If necessary, i recommended to use 'beforeEnter' to achieve the same effect
- If `component` is not configured for the parent route, jump to the route to find the first route with permission under items and children. If it's not found, the page without permission will be displayed
- If `redirect` and `component` are configured at the same time, the `component` will be ignored
- If `beforeEnter` and `beforeEachMount`, `next` function called a `component`, the Component will be rendered, _if `StrictMode` is used in react, the function may be called twice, which is normal_

#### `items` and `children`

The `react-router-manage`,you can configuration `children`, `items`, to express the parent-child relationship of route context.

##### `items` routes at the same level, parent and child render one

```js

/**
 *  The article list page and the article details page are on different pages
 *  /user/article/list  The article list page
 *  /user/article/detail The article detail page
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

**An example with basic router configuration**

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
  // Configure level navigation
  routes: [
    {
      name: "user", // Each route corresponds to a globally unique name
      path: "user", // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [
        // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: "userList",
          path: "list", // The path is automatically converted to `/user/list`
          component: Users
        },
        {
          name: "profile",
          path: "profile", // The path is automatically converted to `/user/list`
          component: Profile
        }
      ]
    }
  ]
});

function App() {
  return <MRouter routeConfig={routeConfig}>{children => children}</MRouter>;
}
```

##### `children` nested Route

The UI of some applications consists of multiple nested components. In this case, the fragment of the URL usually corresponds to a specific nested component structure, for example:

```js
/**
 * The article list page and the article detail page are on the same page
 * /user/article/list  The article list page
 * /user/article/detail The article detail page
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

**An example with nested route configuration**

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
  // Configure level navigation
  routes: [
    {
      name: "user", // Each route corresponds to a globally unique name
      path: "user", // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [
        // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: "userList",
          path: "list", // The path is automatically converted to `/user/list`
          component: Users,
          children: [
            {
              name: "userProfile",
              path: "profile",
              component: UserProfile
            },
            {
              name: "userArticle",
              title: "user articles",
              component: UserArticles
            }
          ]
        },
        {
          name: "profile",
          path: "profile", // The path is automatically converted to `/user/list`
          component: Profile
        }
      ]
    }
  ]
});

function App() {
  return <MRouter routeConfig={routeConfig}>{children => children}</MRouter>;
}
```

## Permission routes

### Permission `permissionMode` supports two modes `parent` and `children`. The default is `parent`

- If `permissionMode` is `parent`, if the parent route does not have permission, then the child routes do not have permission
- If `permissionMode` is `children`, if the child route has permission, the parent route will automatically change to have permission regardless of whether it has permission configured

### Batch verification of configuration string `code`

- You need to pass in the `permissionList` in the `MRouter` component, and set the `hasAuth` to `true`, which is true by default
- You need to configure the `code` in the routing configuration. If it is not configured, you have permission by default

**An example of authentication configuration**

```jsx
const permissionList = [`admin`, "staff"]; // Represents that the current user is admin
// const permissionList = ['staff'] // Represents that the current user is an employee

const appRouterConfig = defineRouterConfig({
  basename: "/",
  // Configure level navigation
  routes: [
    {
      name: "user", //Each route corresponds to a globally unique name
      path: "user", // // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      code: [`admin`, "staff"],
      items: [
        // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: "userList",
          path: "list", // // The path is automatically converted to `/user/list`
          component: Users,
          code: "admin" // This route will be filtered if the current user is an employee
          // code: (currentRoute) => {
          //   // You can also perform custom verification here
          //   // Do not check here, because this is a batch check during reinitialization. If you want to check only after entering this route, please use `beforeeachmount`
          //   return getHasAuth(currentRoute);
          // }
        },
        {
          name: "profile",
          path: "profile", // // The path is automatically converted to `/user/list`
          component: Profile,
          code: [`admin`, "staff"] // Have a common route personal Center
        }
      ]
    }
  ]
});

// `hasAuth` It can not be configured. The default value is `true`
function App() {
  return (
    <MRouter
      routeConfig={routeConfig}
      permissionList={permissionList}
      hasAuth={true}
      permissionMode="parent"
    >
      {children => children}
    </MRouter>
  );
}
```

### Route authentication of `beforeEachMount`

Modify the above appRouterConfig

```jsx
const NoAuth = () => {
  return <div>NoAuth</div>;
};
const appRouterConfig = defineRouterConfig({
  basename: "/",
  // Configure level navigation
  routes: [
    {
      name: "user", //Each route corresponds to a globally unique name
      path: "user", // // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [
        // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: "userList",
          path: "list", // // The path is automatically converted to `/user/list`
          component: Users
        },
        {
          name: "profile",
          path: "profile", // // The path is automatically converted to `/user/list`
          component: Profile
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

## Exported hooks

| `hook` name                               | type                                                                              | describe                                                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **[`useAddRoutes`](#useAddRoutes)**       | `() => (routes: RouteTypeI[]) => void`                                            | Dynamically add routes                                                                                                  |
| **[`useRemoveRoutes`](#useRemoveRoutes)** | `() => (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]) => void` | Dynamically update routes                                                                                               |
| **[`useUpdateRoutes`](#useUpdateRoutes)** | `() => (routeNames: string[]) => void`                                            | Dynamically remove routes                                                                                               |
| **[`useBeforeLeave`](#useBeforeLeave)**   | (`fn: BeforeLeaveI, options: {beforeunload?: ((event?: Event) => any)}) => void`  | The guard when the route leaves needs to call next to jump normally                                                     |
| **[`useRouter`](#useRouter)**             | `() => RoutesStateStruct`                                                         | state of route storage                                                                                                  |
| `useHistory`                              | `() => BrowserHistory`                                                            | get `history`，`react-router v6` There is no exposure. The user's V5 upgrade to V6 is too smooth. It is not recommended |

### useRouter

Route navigation by `useRouter`

`useRouter` state data can be obtained in all components

`useRouter()` is return `state:RoutesStateStruct`

| field name                          | describe                                                                  | type                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **[`currentRoute`](#currentRoute)** | Current route object                                                      | `RouteTypeI`                                                                                   |
| `routesMap`                         | All routes corresponding to route name and path are stored in this object | `Record<string, RouteTypeI>`                                                                   |
| `navigate`                          | Used to jump route                                                        | `(to: string, {query: Record<string, any>; params: Record<string, any>; state: any}) => void}` |
| `authRoutes`                        | Routes objects with permission after authentication                       | `RouteTypeI[]`                                                                                 |
| `routes`                            | Incoming routes                                                           | `RouteTypeI[]`                                                                                 |
| `query`                             | Current address bar query parameters                                      | `Record<string, string>`                                                                       |
| `params`                            | Current address bar dynamic route query parameters                        | `Record<string, string>`                                                                       |

#### navigate

`useRouter` called return navigate is base on `react-router` export `useNavigate`，some interception processing has been done for route jump，so **Do't use `navigate` in import react router**

`navigate` has two parameters. The first parameter is the path to jump, and the second parameter is the route configuration to jump. The type is as follows:
`(to: string, {query: Record<string, any>; params: Record<string, any>; state: any}) => void}`

- `query`, The `query` parameters will be automatically added to the address when jumping the route, for example: `navigate('/user/detail', { query: {id: 13}})`, It will turn into `/user/detail?id=13`
- params, When a dynamic route with parameters is configured, it will be automatically replaced. For example:
  `navigate('/user/detail/:id', { params: {id: 13}})`, It will turn into `/user/detail/13`
- state, 这个是 history 原始的 state

### currentRoute

`currentRoute` the route information passed in when the configuration is included will be automatically added internally `parent`, `parent` is used to identify the parent route, for example: `parentRoute = currentRoute.parent`

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

### useBeforeLeave

`useBeforeLeave` You need to call next to jump normally

```jsx
import { useBeforeLeave, useRouter } from 'react-router-manage';
import { Modal } from 'ppfish';

const function Item() {
  const {navigate, routesMap} = useRouter();
  useBeforeLeave((to, from, next) => {
    Modal.confirm({
      title: 'Are you sure you want to jump ？',
      onOk: () => {
        next();
      }
    })
  })
  const onClick = () => {
    navigate(routesMap.List.path);
  }
  return (<div>
    <Button onClick={onClick}>jump</Button>
  </div>)
}
```

### Dynamic routes

#### useAddRoutes

`useAddRoutes` Add routes

```js
const AddRoutesWrapComponent = ({ children }) => {
  const addRoutes = useAddRoutes();

  useEffect(() => {
    addRoutes([
      {
        parentName: "PAGE1", // 'parentName' needs to be passed in, otherwise it will be inserted under the first level
        title: "Dynamically added pages",
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

`useUpdateRoutes` update routes

```js
const UpdateRoutesWrapComponent = ({ children }) => {
  const updateRoutes = useUpdateRoutes();

  useEffect(() => {
    updateRoutes([
      {
        routeName: "PAGE1",
        routeData: {
          title: "Modified page" // Modified title
        }
      }
    ]);
  }, [updateRoutes]);
  return <div data-testid="__router-children">{children}</div>;
};
```

#### useRemoveRoutes

`useRemoveRoutes` delete routes

```js
const RemoveRoutesWrapComponent = ({ children }) => {
  const removeRoutes = useRemoveRoutes();

  useEffect(() => {
    removeRoutes(["PAGE1"]); // 传入要删除的 route的name字段
  }, []);
  return <div data-testid="__router-children">{children}</div>;
};
```

## Route guard

### Global route guard

| name              | describe                                                                          | type                                                                |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------- |
| `beforeEachMount` | Called before each route rendering, `next` Must be called to render the component | `(to: RouteTypeI \| undefined, next: {name?: string; path?: string} | React.ComponentType<any>) =void` |

#### beforeEachMount

```js

import NoAuth from './NoAuth', // No permission component

const appRouterConfig = {
    basename: '/',
    routes: [
        {
            name: 'root',
            path: '/',
            items: [
                {
                    name: 'page1',
                    path: 'page1',
                    components: Page,
                    custom: 'aaa',
                },
                {
                    name: 'page2',
                    path: 'page2',
                    components: Page2,
                    custom: 'bbb',
                }
            ]
        }
    ],
    beforeEachMount(to, next) {
        if (to.custom === 'aaa) {
            next(); // if call, The component corresponding to the route will be rendered normally
        } else {
            next(NoAuth) // render components without permission
        }
    }
}

```

### part route guard

| name          | describe                                                                                                                  | type                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| `beforeEnter` | Called before rendering the current route (after `beforeEachMount`), `next` must be called before rendering the component | `(to: RouteTypeI \| undefined, next: {name?: string; path?: string}                               | React.ComponentType<any>): void` |
| `beforeLeave` | The callback called before leaving the route needs to actively call 'next' to jump normally                               | `(to: RouteTypeI \| undefined,from: RouteTypeI \| undefined, next: {name?: string; path?: string} | React.ComponentType<any>): void` |

```js
import NoAuth from './NoAuth', // No permission component

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

## Developing

- Keepalive support
- Improvement of sample code
- Route switching transition animation

## About

`react-router-manage` is used in many projects within [Netease BizEase](https://growthease.com/). In order to give back to the community, it has decided to open source, and is willing to build a useful react router management library with friends in the community
