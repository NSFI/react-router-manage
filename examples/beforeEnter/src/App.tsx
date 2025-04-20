import * as React from "react";

import {
  defineRouterConfig,
  Link,
  MHRouter,
  MRouter
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

function Dashboard(props) {
  console.log(props);
  return (
    <div>
      <h2>Dashboard</h2>
      <p>{props.age}</p>
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
const Router = window.__INITIAL_DATA__.mode === "hash" ? MHRouter : MRouter;

const routerConfig = defineRouterConfig({
  basename:
    window.__INITIAL_DATA__.mode !== "hash"
      ? window.__INITIAL_DATA__.basename
      : "/",
  routes: [
    {
      path: "/",
      name: "layout",
      // component: Layout,
      items: [
        {
          path: "home",
          name: "home",
          component: React.lazy(() => import("./Home")),
          beforeEnter(to, next) {
            // alert("beforeEnter");
            // debugger;
            next();
          },
          props: {
            name: "home"
          }
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
          props: {
            name: "dashboard",
            age: 18
          }
        },
        {
          path: "about",
          name: "about",
          component: About,
          props: {
            name: "about"
          }
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
      <h1>beforeEnter Example</h1>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

      <Router routerConfig={routerConfig} wrapComponent={Layout} />
    </div>
  );
}
