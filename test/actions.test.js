import React, { useCallback, useEffect } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  MRouter,
  useAddRoutes,
  useRemoveRoutes,
  useUpdateRoutes,
  defineRouterConfig
} from "../packages/react-router-manage/index";
import { routes, Page } from "./routeConfig";

const appRouterConfig = defineRouterConfig({
  basename: "/",
  routes: routes
});

const AddRoutesWrapComponent = ({ children }) => {
  const addRoutes = useAddRoutes();

  useEffect(() => {
    addRoutes([
      {
        parentName: "PAGE1",
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

const AddRouteRoutesWrapComponent = ({ children }) => {
  const addRoutes = useAddRoutes();

  useEffect(() => {
    addRoutes([
      {
        title: "在root动态添加的页面",
        name: "rootAdd",
        path: "rootAdd",
        component: Page,
        code: "staff"
      }
    ]);
  }, []);
  return <div data-testid="__router-children">{children}</div>;
};

const RemoveRoutesWrapComponent = ({ children }) => {
  const removeRoutes = useRemoveRoutes();

  useEffect(() => {
    removeRoutes(["PAGE1"]);
  }, []);
  return <div data-testid="__router-children">{children}</div>;
};

const RemoveRootRoutesWrapComponent = ({ children }) => {
  const removeRoutes = useRemoveRoutes();

  useEffect(() => {
    removeRoutes(["ROOT"]);
  }, []);
  return <div data-testid="__router-children">{children}</div>;
};

const UpdateRoutesWrapComponent = ({ children }) => {
  const updateRoutes = useUpdateRoutes();

  useEffect(() => {
    updateRoutes([
      {
        routeName: "PAGE1",
        routeData: {
          title: "修改后的页面"
        }
      }
    ]);
  }, [updateRoutes]);
  return <div data-testid="__router-children">{children}</div>;
};

describe("路由增删改测试", () => {
  it("在PAGE1添加路由正常渲染", async () => {
    history.pushState({}, "", "/a/page1/add");
    render(
      <MRouter
        wrapComponent={AddRoutesWrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );
    const result = screen.getByText(/动态添加的页面/);
    expect(result).toBeInTheDocument();
  });

  it("在根路径添加路由正常渲染", async () => {
    history.pushState({}, "", "/rootAdd");
    render(
      <MRouter
        wrapComponent={AddRouteRoutesWrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );
    const result = screen.getByText(/在root动态添加的页面/);
    expect(result).toBeInTheDocument();
  });

  it("删除路由正常渲染", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={RemoveRoutesWrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/404 NOT FOUND/);
    expect(result).toBeInTheDocument();
  });

  it("删除跟路由下的路由", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={RemoveRootRoutesWrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/404 NOT FOUND/);
    expect(result).toBeInTheDocument();
  });

  it("修改路由正常渲染", () => {
    history.pushState({}, "", "/a/page1");
    render(
      <MRouter
        wrapComponent={UpdateRoutesWrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/修改后的页面/);
    expect(result).toBeInTheDocument();
  });
});
