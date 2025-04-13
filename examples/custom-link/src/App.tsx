import * as React from "react";
import type { LinkProps } from "react-router-dom";
import {
  defineRouterConfig,
  MRouter,
  MHRouter,
  Outlet,
  Link,
  useMatch,
  useResolvedPath
} from "react-router-manage";

const Router = window.__INITIAL_DATA__.mode === "hash" ? MHRouter : MRouter;

const routerConfig = defineRouterConfig({
  basename:
    window.__INITIAL_DATA__.mode !== "hash"
      ? window.__INITIAL_DATA__.basename
      : "/",
  routes: [
    {
      path: "",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/about",
          name: "about",
          component: About
        },
        {
          path: "*",
          name: "all",
          component: NoMatch
        }
      ]
    }
  ]
});

export default function App() {
  return (
    <div>
      <h1>Custom Link Example</h1>

      <p>
        This example demonstrates how to create a custom{" "}
        <code>&lt;Link&gt;</code> component that knows whether or not it is
        "active" using the low-level <code>useResolvedPath()</code> and
        <code>useMatch()</code> hooks.
      </p>

      <Router routerConfig={routerConfig}>{children => children}</Router>
    </div>
  );
}

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && " (active)"}
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <CustomLink to="/home">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/about">About</CustomLink>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
