import * as React from "react";

import {
  defineRouterConfig,
  MRouter as Router,
  Link
} from "react-router-manage";

function Layout({ children }) {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {children}
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const routerConfig = defineRouterConfig({
  routes: [
    {
      path: "/",
      name: "layout",
      // component: Layout,
      items: [
        {
          path: "home",
          name: "home",
          component: React.lazy(() => import("./Home"))
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard
        },
        {
          path: "about",
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
      <h1>Basic Example</h1>

      <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>,{" "}
        <code>
          &lt;routerConfig <code>items</code> property config&gt;
        </code>
        , <code>&lt;Link&gt;</code>, and using a "*" route (aka "splat route")
        to render a "not found" page when someone visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

      <Router routerConfig={routerConfig} wrapComponent={Layout} />
    </div>
  );
}
