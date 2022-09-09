import {
  defineRouterConfig,
  MRouter,
  useRouter,
  useAddRoutes,
  useRemoveRoutes
} from "react-router-manage";
import { Link } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import "./index.css";

let addIndex = 0;

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

const Article = () => {
  const { currentRoute, routesMap } = useRouter();
  const addRoutes = useAddRoutes();
  const removeRoutes = useRemoveRoutes();

  const hasNavRoutes = useMemo(() => {
    return routesMap.index.items || [];
  }, [routesMap]);

  const onAdd = useCallback(() => {
    addIndex = addIndex + 1;
    addRoutes([
      {
        parentName: "index",
        component: Add,
        title: `add-${addIndex} route just added `,
        name: `add-${addIndex}`,
        path: `add-${addIndex}`
      }
    ]);
  }, [addRoutes]);

  const onDelete = useCallback(
    i => {
      removeRoutes([i.name]);
    },
    [removeRoutes]
  );

  return (
    <div>
      <h2>Article</h2>
      <ul>
        {hasNavRoutes.map(i => {
          return (
            <li key={i.name}>
              <Link to={i.path}>jump to {i.title} page</Link>
              <button style={{ marginLeft: 5 }} onClick={() => onDelete(i)}>
                删除
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAdd}>add route</button>
      </div>
    </div>
  );
};

const Add = () => {
  const { currentRoute } = useRouter();
  return (
    <div>
      {currentRoute.title}
      {/* <h2>This is the route just added</h2> */}
    </div>
  );
};

const routerConfig = defineRouterConfig({
  basename: "/",
  routes: [
    {
      name: "index",
      path: "",
      redirect: "/home",
      items: [
        {
          name: "home",
          path: "/home",
          title: "Home",
          component: Home
        },
        {
          name: "profile",
          path: "/profile",
          title: "Personal Center",
          component: Profile
        },
        {
          name: "article",
          path: "/article",
          title: "Article",
          component: Article
        }
      ]
    }
  ]
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRoute, routesMap } = useRouter();
  const addRoutes = useAddRoutes();
  const removeRoutes = useRemoveRoutes();

  const hasNavRoutes = useMemo(() => {
    return routesMap.index.items || [];
  }, [routesMap]);

  const onAdd = useCallback(() => {
    addIndex = addIndex + 1;
    addRoutes([
      {
        parentName: "index",
        component: Add,
        title: `add-${addIndex} route just added `,
        name: `add-${addIndex}`,
        path: `add-${addIndex}`
      }
    ]);
  }, [addRoutes]);

  const onDelete = useCallback(
    i => {
      removeRoutes([i.name]);
    },
    [removeRoutes]
  );
  return (
    <div>
      <ul>
        {hasNavRoutes.map(i => {
          return (
            <li key={i.name}>
              <Link to={i.path}>jump to {i.title} page</Link>
              <button style={{ marginLeft: 5 }} onClick={() => onDelete(i)}>
                删除
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAdd}>add route</button>
      </div>
      <h2>this is {currentRoute.title} page</h2>
      <div>{children}</div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>react-router-manage</h1>
      </div>
      <div className="content">
        <MRouter routerConfig={routerConfig} wrapComponent={Layout} />
      </div>
    </div>
  );
}
