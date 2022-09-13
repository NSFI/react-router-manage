import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  MRouter,
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

describe("MRouter 测试", () => {
  it("组件正常渲染", () => {
    history.pushState({}, "", "/a/page1");
    const { container } = render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );
    const fiber = screen.getByTestId("__router-children");
    expect(fiber).toBeDefined();

    const button = screen.getByTestId("__test_button");

    button.click();
  });

  it("路由切换正常渲染", () => {
    history.pushState({}, "", "/a/page2");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/页面2/);
    expect(result).toBeInTheDocument();
  });

  it("路由跳转到404不存在页面", () => {
    history.pushState({}, "", "/a/page3/404");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/页面不存在/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEnter组件显示加载中", () => {
    history.pushState({}, "", "/a/page2/noJump");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/加载中/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEnter组件显示正常跳转渲染", () => {
    history.pushState({}, "", "/a/page2/jump");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/页面/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEachMount 不跳转渲染", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachNoJumpConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/加载中/);
    expect(result).toBeInTheDocument();
  });

  it("配置了beforeEachMount 跳转渲染", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachJumpConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/页面1/);
    expect(result).toBeInTheDocument();
  });

  it("配置了权限无权限显示无权限页面", () => {
    history.pushState({}, "", "/a/page2");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachJumpConfig}
        permissionList={permissionList}
      ></MRouter>
    );

    const result = screen.getByText(/无权限/);
    expect(result).toBeInTheDocument();
  });

  it("配置了权限有权限正常渲染", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={beforeEachJumpConfig}
        permissionList={permissionList}
      ></MRouter>
    );

    const result = screen.getByText(/页面1/);
    expect(result).toBeInTheDocument();
  });

  it("配置了basename", () => {
    history.pushState({}, "", "/app/a/page1");
    render(
      <MRouter
        wrapComponent={WrapComponent2}
        routerConfig={appRouterConfig2}
        permissionList={permissionList}
      ></MRouter>
    );

    const result = screen.getByText(/页面1/);
    expect(result).toBeInTheDocument();
  });

  it("正常跳转配置了params的页面", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        permissionList={permissionList}
      ></MRouter>
    );

    const button = screen.getByTestId("__test_button_params");

    button.click();
  });

  it("找有权限的下一级路由", () => {
    history.pushState({}, "", "/a/page6");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        permissionList={permissionList}
      ></MRouter>
    );

    const result = screen.getByText(/页面6/);
    expect(result).toBeInTheDocument();
  });
});
