# react-router-manage

[docs](https://github.com/NSFI/react-router-manage/blob/main/README.md)

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

`react-router-manage` is based on `react-router` `v6`. It can realize the function of authentication, guard, add, delete and check of route by configuration. Because `react-router` `v5` upgrades to `v6` have a high cost, `react-router-manage` provides the API from the original `v5` section for compatible projects that use `v5` for smooth upgrades to `v6`

- 🛠 [**[`config router`](https://github.com/NSFI/react-router-manage/blob/main/README.md#routerConfig)**] - Centralized router configuration, fast and convenient management.
- ＋ [**[`addRoutes`](https://github.com/NSFI/react-router-manage/blob/main/README.md#useAddRoutes)**] - Dynamically add `routes`: you can use hook `useAddRoutes` to add routes and automatically refresh the view.
- ➖ [**[`removeRoutes`](https://github.com/NSFI/react-router-manage/blob/main/README.md#useRemoveRoutes)**] - Dynamically delete routes: you can use hook `useRemoveRoutes` to delete routes and automatically refresh the view.
- 🖇 [**[`updateRoutes`](https://github.com/NSFI/react-router-manage/blob/main/README.md#useUpdateRoutes)**] - Dynamically modify routes: you can use hook `useUpdateRoutes` to modify routes.
- 🔐 [**permission**] - Permission control: configure the code of the route and automatically manage the permission of the route
- 👨‍✈️‍ [**route guard**] - Provide hooks for route entry config `beforeEnter` and **[`beforeEachMount`](https://github.com/NSFI/react-router-manage/blob/main/README.md#beforeEachMount)**, route exit hook **[`useBeforeLeave`](https://github.com/NSFI/react-router-manage/blob/main/README.md#useBeforeLeave)**
- 🌲 [**navigation**] - level navigation: supports level navigation, and automatically generates navigation bars for parent-child routes, such as breadcrumbs and menu navigation

## About

`react-router-manage` is used in many projects within [Netease BizEase](https://growthease.com/). In order to give back to the community, it has decided to open source, and is willing to build a useful react router management library with friends in the community
