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

## Installation

```sh

npm install react-router-manage --save

```

## DEMO

- [basic](https://codesandbox.io/s/react-router-manage-basic-c7h2vp)
- [config children routes, eg: **`Outlet`** children level routes](https://codesandbox.io/s/react-router-manage-children-obi6t2)
- [global guard `beforeEachMount`](https://codesandbox.io/s/react-router-manage-beforeeachmount-247k3l)
- [routes operation `useAddRoutes`,`useUpdateRoutes`, `useRemoveRoutes`](https://codesandbox.io/s/react-router-manage-actions-re4qxb?file=/src/App.tsx)

## Configuration items

### routerConfig

| field name | description | type | is required |
|---|---|---|---|
| `basename` |  the routing prefix of the route | `string` | `not required`, default is `/` |
| **[`routes`](#routeConfig)** |  hierarchical configuration of routes |[`RouteTypeI[]`](#RouteTypeI)| `required` |
| **[`beforeEachMount`](#beforeEachMount)** | each route is called before rendering |`(to: [RouteTypeI](#RouteTypeI) \| undefined, next: ({path?: string; name: string} | React.ComponentType<any>) => void): void`| `not required` |
|`autoDocumentTitle`| the title of the document changes depending on the route switch| `boolean` \| `(RouteTypeI[]) => string` |  `not required`, default is `false` |
| `LoadingComponent` |  Used for react `Suspend` component  to configure fallback when loading asynchronous components or before next called | React.FunctionComponent<any> | `not required` |

#### router modes

There are currently two router modes:

- `history`
- `hash`

**A simple global configuration(`history` mode)**

``` tsx
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

``` tsx
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

| field name | description | type | is required |
|---|---|---|---|
| `name` | the name of the route, **the name is globally unique and non-repeatable, and is used to obtain the route info** |`string` | required |
| `path`|  the path of the route, **the combined full path is globally unique and can not be repeated**| `string` | required |
| `title` | the Chinese name or other name of the route, the name of the display, used to automatically generate navigation and breadcrumbs | `string`| not required |
| `component` | current route matching component, **if it is not configured, it will jumps to the next level of privileged route**| `React.Component` \| `React.FunctionComponent` | not required|
| `items` | the visual sub-level routes, used for navigation parent-child relationship, is actually the same level of route | `RouteTypeI[]` | not required|
| `children`| sub-routing, rendering in `react-router V6` in `Outlet` component| `RouteTypeI[]` | not required |
| `props` | when rendering the route, the props content is automatically injected,, `<Component {...props}/>` | `Record<string, any>` | not required |
| `code` |  used for permission verification, will be compared `permissionList`| `string`\| `string[]`\| `(route: RouteTypeI) => boolean` | not required|
| `redirect` |  route redirect to the specified route with priority over component | `string` | not required |
| `beforeEnter` | render the method called by the routing money. if a component is passed in the call `next` function, the component will be rendered. if `next` function not call, The component configured by the route will not be rendered | `(to: RouteTypeI \| undefined, next: (options?: {name?: string; path?: string} | React.ComponentType<any>) => void): void` | not required |
| `beforeLeave` |  The callback called before leaving the route needs to be actively called | `(to: RouteTypeI \| undefined,from: RouteTypeI \| undefined, next: () => void): void` | not required |
| `meta` | Some custom information can be put here,，you call use `currentRoute.meta` get meta info | `Record<string, any>` | not required |
| `hidden` | display and hidden of navigation | `boolean`| not required, default is `false`|
| `fullscreen` | You can hidden navigation ui, `fullscreen` set `true`,navigation is hidden, *the current configuration is use in [`router-base-nav`](https://github.com/NSFI/router-base-nav)*| `boolean` | not required |
| `icon` | Icon for displaying navigation, *the current configuration is use in [`router-base-nav`](https://github.com/NSFI/router-base-nav)* | `string` | not required |
| `type` | if `type` is `null` string, this route is not really rendered, but the correct currentRoute can be set, *the current configuration is use in [`router-base-nav`](https://github.com/NSFI/router-base-nav)* | `real` \| `null` | not required, default is `real`|

**NOTE**

- If a function is configured in `code`, since it will be called in batch during route initialization, please do not call asynchronously. If necessary, i recommended to use 'beforeEnter' to achieve the same effect
- If `component` is not configured for the parent route, jump to the route to find the first route with permission under items and children. If it's not found, the page without permission will be displayed
- If `redirect` and `component` are configured at the same time, the `component` will be ignored
- If `beforeEnter` and `beforeEachMount`, `next` function called a `component`, the Component will be rendered, *if `StrictMode` is used in react, the function may be called twice, which is normal*

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

``` tsx
import React from 'react';
import { MRouter, defineRouterConfig } from 'react-router-manage';

const Users = () => {
  return <div>Users</div>
}
const Profile = () => {
  return <div>Profile</div>
}


const appRouterConfig = defineRouterConfig({
  basename: '/',
  // Configure level navigation
  routes: [
    {
      name: 'user', // Each route corresponds to a globally unique name
      path: 'user', // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [ // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: 'userList',
          path: 'list', // The path is automatically converted to `/user/list`
          component: Users,
        },
        {
          name: 'profile',
          path: 'profile', // The path is automatically converted to `/user/list`
          component: Profile,
        },
      ]
    }
  ],
});

function App () {
  return (
    <MRouter routeConfig={routeConfig}>
      {(children) => children}
    </MRouter>
  )
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

``` tsx
import React from 'react';
import Outlet from 'react-router';
import { MRouter, defineRouterConfig } from 'react-router-manage';

const Users = () => {
  return <div>
  <div>Users</div>
  <Outlet />
  </div>
}
const Profile = () => {
  return <div>Profile</div>
}

const UserProfile = () => {
  return <div>UserProfile</div>
}
const UserArticles = () => {
  return <div>UserArticles</div>
}

const appRouterConfig = defineRouterConfig({
  basename: '/',
  // Configure level navigation
  routes: [
    {
      name: 'user', // Each route corresponds to a globally unique name
      path: 'user', // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [ // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: 'userList',
          path: 'list', // The path is automatically converted to `/user/list`
          component: Users,
          children: [
            {
              name: 'userProfile',
              path: 'profile',
              component: UserProfile,
            },
            {
              name: 'userArticle',
              title: 'user articles',
              component: UserArticles,
            }
          ]
        },
        {
          name: 'profile',
          path: 'profile', // The path is automatically converted to `/user/list`
          component: Profile,
        },
      ]
    }
  ],
});

function App () {
  return (
    <MRouter routeConfig={routeConfig}>
      {(children) => children}
    </MRouter>
  )
}

```

## Permission routes

### Batch verification of configuration string `code`

- You need to pass in the `permissionList` in the `MRouter` component, and set the `hasAuth` to `true`, which is true by default
- You need to configure the `code` in the routing configuration. If it is not configured, you have permission by default

**An example of authentication configuration**

```jsx
const permissionList = [`admin`, 'staff'] // Represents that the current user is admin
// const permissionList = ['staff'] // Represents that the current user is an employee

const appRouterConfig = defineRouterConfig({
  basename: '/',
  // Configure level navigation
  routes: [
    {
      name: 'user', //Each route corresponds to a globally unique name
      path: 'user', // // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      code: [`admin`, 'staff'],
      items: [ // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: 'userList',
          path: 'list', // // The path is automatically converted to `/user/list`
          component: Users,
          code: 'admin', // This route will be filtered if the current user is an employee
          // code: (currentRoute) => {
          //   // You can also perform custom verification here
          //   // Do not check here, because this is a batch check during reinitialization. If you want to check only after entering this route, please use `beforeeachmount`
          //   return getHasAuth(currentRoute);
          // }
        },
        {
          name: 'profile',
          path: 'profile', // // The path is automatically converted to `/user/list`
          component: Profile,
          code: [`admin`, 'staff'], // Have a common route personal Center
        },
      ]
    }
  ],
});

// `hasAuth` It can not be configured. The default value is `true`
function App () {
  return (
    <MRouter routeConfig={routeConfig} permissionList={permissionList} hasAuth={true}>
      {(children) => children}
    </MRouter>
  )
}
```

### Route authentication of `beforeEachMount`

Modify the above appRouterConfig

``` jsx
const NoAuth = () => {
  return <div>NoAuth</div>
}
const appRouterConfig = defineRouterConfig({
  basename: '/',
  // Configure level navigation
  routes: [
    {
      name: 'user', //Each route corresponds to a globally unique name
      path: 'user', // // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [ // Items is used to configure navigation with a level structure, such as breadcrumb navigation，
        {
          name: 'userList',
          path: 'list', // // The path is automatically converted to `/user/list`
          component: Users,
        },
        {
          name: 'profile',
          path: 'profile', // // The path is automatically converted to `/user/list`
          component: Profile,
        },
      ]
    }
  ],
  beforeEachMount: (to, next) => {
    if (to.name === 'userList') {
      next();
    } else {
      next(NoAuth)
    }

  }
});


```

## Exported hooks

| `hook` name | type | describe |
|---|---|---|
| **[`useAddRoutes`](#useAddRoutes)** |  `() => (routes: RouteTypeI[]) => void` | Dynamically add routes |
| **[`useRemoveRoutes`](#useRemoveRoutes)** | `() => (routes: { routeName: string; routeData: Partial<RouteTypeI> }[]) => void` | Dynamically update routes |
| **[`useUpdateRoutes`](#useUpdateRoutes)** | `() => (routeNames: string[]) => void` | Dynamically remove routes |
| **[`useBeforeLeave`](#useBeforeLeave)** |(`fn: BeforeLeaveI) => void` | The guard when the route leaves needs to call next to jump normally |
| **[`useRouter`](#useRouter)** | `() => RoutesStateStruct` | state of route storage |
| `useHistory` | `() => BrowserHistory` | get `history`，`react-router v6` There is no exposure. The user's V5 upgrade to V6 is too smooth. It is not recommended |

### useRouter

Route navigation by `useRouter`

`useRouter` state data can be obtained in all components

`useRouter()` is return `state:RoutesStateStruct`

| field name | describe | type |
|---|---|---|
| **[`currentRoute`](#currentRoute)** | Current route object | `RouteTypeI` |
| `routesMap`| All routes corresponding to route name and path are stored in this object | `Record<string, RouteTypeI>`|
| `navigate` | Used to jump route | `(to: string, {query: Record<string, any>; params: Record<string, any>; state: any}) => void}` |
| `authRoutes` | Routes objects with permission after authentication| `RouteTypeI[]`|
| `routes` | Incoming routes | `RouteTypeI[]`|
| `query` | Current address bar query parameters | `Record<string, string>` |
| `params` | Current address bar dynamic route query parameters | `Record<string, string>` |

#### navigate

`useRouter` called return navigate is base on `react-router` export `useNavigate`，some interception processing has been done for route jump，so **Do't use `navigate` in import react router**

`navigate` has two parameters. The first parameter is the path to jump, and the second parameter is the route configuration to jump. The type is as follows:
`(to: string, {query: Record<string, any>; params: Record<string, any>; state: any}) => void}`

- `query`, The `query` parameters will be automatically added to the address when jumping the route, for example: `navigate('/user/detail', { query: {id: 13}})`, It will turn into `/user/detail?id=13`
- params, When a dynamic route with parameters is configured, it will be automatically replaced. For example:
 `navigate('/user/detail/:id', { params: {id: 13}})`, It will turn into `/user/detail/13`
- state, 这个是history原始的state

### currentRoute

`currentRoute` the route information passed in when the configuration is included will be automatically added internally `parent`, `parent` is used to identify the parent route, for example: `parentRoute = currentRoute.parent`

``` jsx
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

``` jsx
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
const AddRoutesWrapComponent = ({children}) => {
    const addRoutes = useAddRoutes();

    useEffect(() => {
        addRoutes([{
            parentName: 'PAGE1', // 'parentName' needs to be passed in, otherwise it will be inserted under the first level
            title: 'Dynamically added pages',
            name: 'add',
            path: 'add',
            component: Page,
            code: 'staff',
        }])
    }, [])
    return <div data-testid='__router-children'>
        {children}
    </div>
}
```

#### useUpdateRoutes

`useUpdateRoutes` update routes

```js


const UpdateRoutesWrapComponent = ({children}) => {
    const updateRoutes = useUpdateRoutes();

    useEffect(() => {
        updateRoutes([{
            routeName: 'PAGE1',
            routeData: {
                title: 'Modified page' // Modified title
            }
        }])
    }, [updateRoutes])
    return <div data-testid='__router-children'>
        {children}
    </div>
}


```

#### useRemoveRoutes

`useRemoveRoutes` delete routes

```js

const RemoveRoutesWrapComponent = ({children}) => {
    const removeRoutes = useRemoveRoutes();

    useEffect(() => {
        removeRoutes(['PAGE1']) // 传入要删除的 route的name字段
    }, [])
    return <div data-testid='__router-children'>
        {children}
    </div>
}
```

## Route guard

### Global route guard

| name | describe | type |
|---|---|---|
| `beforeEachMount` | Called before each route rendering, `next` Must be called to render the component |  `(to: RouteTypeI \| undefined, next: {name?: string; path?: string} | React.ComponentType<any>) =void` |

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

| name | describe | type |
|---|---|---|
| `beforeEnter` | Called before rendering the current route (after `beforeEachMount`), `next` must be called before rendering the component |  `(to: RouteTypeI \| undefined, next: {name?: string; path?: string} | React.ComponentType<any>): void` |
| `beforeLeave` | The callback called before leaving the route needs to actively call 'next' to jump normally| `(to: RouteTypeI \| undefined,from: RouteTypeI \| undefined, next: {name?: string; path?: string} | React.ComponentType<any>): void`

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

## More complete examples

**For specific examples, see the examples**
`clone` this project to the corresponding example, and then`npm run start`

```js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MRouter, useRouter } from 'react-router-manage';

import './index.less';

const users = [{ id: 1, name: '张三' }, { id: 2, name: '李四' }];

const usersInfo = {
  1: {
    name: '张三',
    age: 18,
    address: '网易一期'
  },
  2: {
    name: '李四',
    age: 28,
    address: '网易二期'
  }
};

const usersArticle = {
  1: [
    { name: '为什么的理发师的积分拉时代峻峰打分卡水电费拉屎京东卡' },
    { name: 'dfasdfasdfasd打法是的发送到大是大非a' },
    { name: '为什么的理发师的积分大赛的发生拉时代峻峰打分卡水电费拉屎京东卡' },
    { name: '打法是的发送到发撒旦法大法师打发二分干' },
  ],
  2: [{
    name: '钢铁是怎打法是的发送到发样炼成的1'
  }, {
    name: '大是大大懂法守法是非'
  }, {
    name: '钢铁是怎样大是大非炼成的1'
  }]
};

const Users = () => {
  const { navigate, routesMap, currentRoute } = useRouter();
  return <div className='users'>
    <div className="list">
      <div className="user">
        <div className="user-id">用户ID</div>
        <div className='user-name'>用户姓名</div>
        <div style={{ textAlign: 'center' }}>
         操作
        </div>
      </div>
      {
        users.map(user => {
          return <div key={user.id} className="user">
            <div className='user-id'>{user.id}</div>
            <div className='user-name'>{user.name}</div>
            <div>
              <a onClick={() => navigate(routesMap.userProfile.path, { query: { id: user.id } })} style={{ marginRight: 16 }}>查看用户信息</a>
              <a onClick={() => navigate(routesMap.userArticle.path, { query: { id: user.id } })}>查看用户发布的文章</a>
            </div>
          </div>;
        })
      }
    </div>
    <div className='info'>
      <Outlet />
    </div>
  </div>;
};

const UserProfile = () => {
  const { navigate, routesMap, query } = useRouter();
  const id = query.id as '1' | '2';
  const user = usersInfo[id];

  return <div>
    <h2>用户信息</h2>
    {
      user
        ? <div>
          <div>用户ID: {query.id}</div>
          <div>用户年龄：{user.age}</div>
          <div>用户姓名：{user.name}</div>
          <div>办公地址：{user.address}</div>
        </div>
        : '用户信息不存在'
    }

  </div>;
};

const UserArticles = () => {
  const { query } = useRouter();
  const id = query.id as '1' | '2';
  const articles = usersArticle[id];
  return <div>
    <h2>文章信息</h2>
    {
      articles && articles.length
        ? articles.map((s, index) => {
          return <div key={index}><a onClick={() => {
            alert(s.name);
          }}>{s.name}</a></div>;
        })
        : '用户信息不存在'
    }

  </div>;
};

const Profile = () => {
  return <div className='profile'>
    <h2>user center</h2>
    <p>
            网易云商是网易智企旗下的服务营销一体化平台，通过打通企业线上、线下的服务触点，帮助企业洞察市场和消费者，实现自动化营销和精细化客户运营，
        以智能化的优质服务提升用户体验，不断巩固并提升企业与消费者的关系，最终助力企业的业务增长。
        旗下包含六大产品体系：问卷调研、消费者洞察、营销自动化、SCRM、智能客服、外呼机器人。
    <p>
          问卷调研：真实专业的用户调研与体验管理平台，提供覆盖亿级用户、颠覆传统调研的精准市场研究服务，洞察消费者真实态度，让营销决策更科学。
        消费者洞察：罗兰贝格和网易联合出品的数字化品牌定位工具“数字罗盘”Digital Profiler ，揭示消费者选品奥秘，洞察其底层价值观，让品牌战略更有效。
        营销自动化：整合企业全域数据，分析建立深度用户画像，提供丰富的营销工具，自动执行精细化分群运营策略，全程数据监测还原真实用户旅程，让企业营销更简单。
        SCRM：赋能销售获客转化的一站式 SCRM，从全渠道拓客到多触点沟通，从私域互动转化到客户精细管理，为你计划好每一步销售动作，步步为”赢“，让销售转化更高效。
        网易云商六大产品能力
        网易云商六大产品能力
        智能客服：智能驱动的客户服务 SaaS 系统，融合智能机器人、在线客服、售前机器人、呼叫中心、工单等功能，提升企业服务效率，让客户服务更优质
      </p>
    </p>
  </div>;
};

const appRouterConfig = defineRouterConfig({
  basename: '/',
  routes: [
    {
      name: 'user', //Each route corresponds to a globally unique name
      path: 'user', // // The path will be automatically converted to '/user'. Since there is no component configured here, entering '/user' will be redirected to '/user/list'
      items: [
        {
          name: 'userList',
          path: 'list', // // The path is automatically converted to `/user/list`
          component: Users,
          children: [
            {
              name: 'userProfile',
              path: 'profile',
              component: UserProfile,
            },
            {
              name: 'userArticle',
              path: 'article',
              component: UserArticles,
            }
          ]
        },
        {
          name: 'profile',
          path: 'profile', // // The path is automatically converted to `/user/list`
          component: Profile,
          title: 'user center',
        },
      ]
    }
  ],
});

export function App () {
  return (
    <MRouter
      routerConfig={appRouterConfig}
    >
      {
        children => {
          return <div>
            <h1 className='title'>基本示例</h1>
            <div className='nav'>
              <Link to="/user/list" style={{ marginRight: 20 }}>跳转到user list</Link>
              <Link to="/user/profile">跳转到user center</Link>
            </div>
            {children}
          </div>;
        }
      }
    </MRouter>);
}


```
## Developing

- Keepalive support
- Improvement of sample code
- Route switching transition animation

## About

`react-router-manage` is used in many projects within [Netease BizEase](https://growthease.com/). In order to give back to the community, it has decided to open source, and is willing to build a useful react router management library with friends in the community
