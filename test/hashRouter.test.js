import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import {
  MHRouter,
  defineRouterConfig,
  useRouter
} from "../packages/react-router-manage/index";
import { routes, Page } from "./routeConfig";

const WrapComponent = ({ children }) => {
  const { currentRoute } = useRouter();
  return (
    <div data-testid="__router-children">
      <div>{currentRoute.path}</div>
      <div>{children}</div>
    </div>
  );
};

const WrapComponent2 = ({ children }) => {
  const { currentRoute, flattenRoutes, basename } = useRouter();
  // console.log(flattenRoutes)
  return (
    <div data-testid="__router-children">
      <div>{currentRoute.path}</div>
      <div>{children}</div>
    </div>
  );
};

const appRouterConfig = defineRouterConfig({
  basename: "/",
  routes: routes
});

const appRouterConfig2 = defineRouterConfig({
  basename: "/app/",
  routes: routes
});

const beforeEachNoJumpConfig = defineRouterConfig({
  basename: "/",
  routes: routes,
  beforeEachMount: (to, next) => {
    // 什么都不做则不跳转
  }
});

const beforeEachJumpConfig = defineRouterConfig({
  basename: "/",
  routes: routes,
  beforeEachMount: (to, next) => {
    next();
  }
});

const permissionList = ["staff"];

describe("MHRouter 测试", () => {
  it("组件正常渲染", () => {
    history.pushState({}, "", "/#/a/page1");
    const { container } = render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MHRouter>
    );
    const fiber = screen.getByTestId("__router-children");
    expect(fiber).toBeDefined();

    const button = screen.getByTestId("__test_button");

    act(() => {
        button.click();
      })
  });

  it("路由切换正常渲染", () => {
    history.pushState({}, "", "/#/a/page2");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MHRouter>
    );

    const result = screen.getByText(/页面2/);
    expect(result).toBeInTheDocument();
  });

  it("路由跳转到404不存在页面", () => {
    history.pushState({}, "", "/#/a/page3/404");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MHRouter>
    );

    const result = screen.getByText(/404 NOT FOUND/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEnter组件显示加载中", () => {
    history.pushState({}, "", "/#/a/page2/noJump");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MHRouter>
    );

    const result = screen.getByText(/加载中/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEnter组件显示正常跳转渲染", () => {
    history.pushState({}, "", "/#/a/page2/jump");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MHRouter>
    );

    const result = screen.getByText(/页面/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEachMount 不跳转渲染", () => {
    history.pushState({}, "", "/#/a/page1");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachNoJumpConfig}
        hasAuth={false}
      ></MHRouter>
    );

    const result = screen.getByText(/加载中/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEachMount 跳转渲染", () => {
    history.pushState({}, "", "/#/a/page1");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachJumpConfig}
        hasAuth={false}
      ></MHRouter>
    );

    const result = screen.getByText(/页面1/);
    expect(result).toBeInTheDocument();
  });

  it("配置了权限无权限显示无权限页面", () => {
    history.pushState({}, "", "/#/a/page2");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachJumpConfig}
        permissionList={permissionList}
      ></MHRouter>
    );

    const result = screen.getByText(/401 NO PERMISSION/);
    expect(result).toBeInTheDocument();
  });

  it("配置了权限有权限正常渲染", () => {
    history.pushState({}, "", "/#/a/page1");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachJumpConfig}
        permissionList={permissionList}
      ></MHRouter>
    );

    const result = screen.getByText(/页面1/);
    expect(result).toBeInTheDocument();
  });

  it("配置了basename", () => {
    history.pushState({}, "", "/#/app/a/page1");
    render(
      <MHRouter
        wrapComponent={WrapComponent2}
        routerConfig={appRouterConfig2}
        permissionList={permissionList}
      ></MHRouter>
    );

    const result = screen.getByText(/页面1/);
    expect(result).toBeInTheDocument();
  });

  it("正常跳转配置了params的页面", () => {
    history.pushState({}, "", "/#/a/page1");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        permissionList={permissionList}
      ></MHRouter>
    );

    const button = screen.getByTestId("__test_button_params");

    act(() => {
        button.click();
      })
  });

  it("找有权限的下一级路由", () => {
    history.pushState({}, "", "/#/a/page6");
    render(
      <MHRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        permissionList={permissionList}
      ></MHRouter>
    );

    const result = screen.getByText(/页面6/);
    expect(result).toBeInTheDocument();
  });
});
