import * as React from "react";

import {
  defineRouterConfig,
  MRouter,
  MHRouter,
  Link,
  useRouter
} from "react-router-manage";

const Router = window.__INITIAL_DATA__.mode === "hash" ? MHRouter : MRouter;

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
  const { routesMap, navigate } = useRouter();
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <button
          onClick={() =>
            navigate(routesMap.dashboardDetail.path, {
              params: { id: 1 }
            })!
          }
        >
          dashboard1
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            navigate(routesMap.dashboardDetail.path, {
              params: { id: 2 }
            })!
          }
        >
          dashboard2
        </button>
      </div>
    </div>
  );
}

function DashboardDetail() {
  const { params } = useRouter();
  return (
    <div>
      <h2>DashboardDetail</h2>
      <div>id: {params?.id}</div>
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
  basename:
    window.__INITIAL_DATA__.mode !== "hash"
      ? window.__INITIAL_DATA__.basename
      : "/",
  routes: [
    {
      path: "/",
      name: "layout",
      code: "GLOBAL",
      items: [
        {
          path: "/home",
          name: "home",
          code: "GLOBAL",
          component: Home
        },
        {
          path: "dashboard",
          name: "dashboard",
          code: "GLOBAL",
          component: Dashboard,
          items: [
            {
              path: "detail/:id",
              name: "dashboardDetail",
              code: "GLOBAL2",
              component: DashboardDetail
            }
          ]
        },
        {
          path: "about",
          name: "about",
          code: "GLOBAL",
          component: About
        }
      ]
    },
    {
      path: "*",
      name: "all",
      component: NoMatch
    }
  ]
});

const permission = ["GLOBAL"];

export default function App() {
  return (
    <div>
      <h1>Permission Example</h1>

      <p>
        This example demonstrates some of the core features of
        react-router-manage including nested <code>routes</code>,{" "}
        <code>
          routerConfig <code>items</code> property config
        </code>
        ,{" "}
        <code>
          route config property 'permission' to configure access permissions for
          user's router enter
        </code>
        , <code>&lt;Link&gt;</code>, and using "*" route (aka "splat route") to
        render a "not found" page when someone visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

      <Router
        permissionList={permission}
        routerConfig={routerConfig}
        wrapComponent={Layout}
        permissionMode="parent"
      />
    </div>
  );
}
