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
            <Link to="/app/home">Home</Link>
          </li>
          <li>
            <Link to="/app/about">About</Link>
          </li>
          <li>
            <Link to="/app/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/app/nothing-here">Nothing Here</Link>
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

function Login() {
  return (
    <div>
      <h2>login</h2>
    </div>
  );
}

function NoJump() {
  return <h2>you can't jump</h2>
}

const routerConfig = defineRouterConfig({
  beforeEachMount: (to, next) => {
    if(to.name === 'home') {
      next();
      return;
    }
    const isCallJump = window.confirm('is can jump?')
    if (isCallJump) {
      next();
    }else {
      next(NoJump)
    }
  },
  basename: "/app",
  routes: [
    {
      path: "/",
      name: "layout",
      // component: Layout,
      items: [
        {
          path: "home",
          name: "home",
          component: Home
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
          path: "login",
          name: "login",
          component: Login
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
      <h1>beforeEachMount Example</h1>

      <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>,{" "}
        <code>
          &lt;routerConfig <code>beforeEachMount</code> property config&gt;
        </code>
        , <code>&lt;Link&gt;</code>, and using a "*" route (aka "splat route")
        to render a "not found" page when someone visits an unrecognized URL.
      </p>

      <p>
      if <code>StrictMode</code> is used in react, the <code>beforeEachMount</code> function may be called twice, which is normal
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

      <Router routerConfig={routerConfig} wrapComponent={Layout} />
    </div>
  );
}
