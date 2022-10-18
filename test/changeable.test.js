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

const appRouterConfig = defineRouterConfig({
  basename: "/",
  routes: routes,
  LoadingComponent: () => <div>current component is loading</div>
});

describe("changeable tests", () => {
  it("配置了beforeEnter组件显示加载中", () => {
    history.pushState({}, "", "/a/page2/noJump");
    render(
      <MRouter
        wrapComponent={WrapComponent}
        routerConfig={appRouterConfig}
        hasAuth={false}
      ></MRouter>
    );

    const result = screen.getByText(/current component is loading/);
    expect(result).toBeInTheDocument();
  });
});
