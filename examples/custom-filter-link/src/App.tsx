import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { brands, filterByBrand, getSneakerById, SNEAKERS } from "./snkrs";

import {
  defineRouterConfig,
  MRouter as Router,
  Outlet,
  Link,
  useSearchParams,
  useParams
} from "react-router-manage";

import type { LinkProps } from "react-router-manage";

const routerConfig = defineRouterConfig({
  routes: [
    {
      path: "",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "/sneakers",
          name: "SneakerGrid",
          component: SneakerGrid
        },
        {
          path: "/sneakers/:id",
          name: "sneakers",
          component: SneakerView
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
      <h1>Custom Filter Link Example</h1>

      <p>
        This example demonstrates how to create a "filter link" like one that is
        commonly used to filter a list of products on an e-commerce website. The
        <code>&lt;BrandLink&gt;</code> component is a custom{" "}
        <code>&lt;Link&gt;</code> that knows whether or not it is currently
        "active" by what is in the URL query string.
      </p>

      <Router routerConfig={routerConfig}>{children => children}</Router>
    </div>
  );
}

interface BrandLinkProps extends Omit<LinkProps, "to"> {
  brand: string;
}

function BrandLink({ brand, children, ...props }: BrandLinkProps) {
  let [searchParams] = useSearchParams();
  let isActive = searchParams.get("brand") === brand;

  return (
    <Link
      to={`/sneakers?brand=${brand}`}
      {...props}
      style={{
        ...props.style,
        color: isActive ? "red" : "black"
      }}
    >
      {children}
    </Link>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <h3>Filter by brand</h3>
        <ul>
          <li>
            <Link to="/">All</Link>
          </li>
          {brands.map(brand => (
            <li key={brand}>
              <BrandLink brand={brand}>{brand}</BrandLink>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function SneakerGrid() {
  let [searchParams] = useSearchParams();
  let brand = searchParams.get("brand");

  const sneakers = React.useMemo(() => {
    if (!brand) return SNEAKERS;
    return filterByBrand(brand);
  }, [brand]);

  return (
    <main>
      <h2>Sneakers</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "12px 24px"
        }}
      >
        {sneakers.map(snkr => {
          let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
          return (
            <div key={snkr.id} style={{ position: "relative" }}>
              <img
                width={200}
                height={200}
                src={snkr.imageUrl}
                alt={name}
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1 / 1"
                }}
              />
              <Link
                style={{ position: "absolute", inset: 0 }}
                to={`/sneakers/${snkr.id}`}
              >
                <VisuallyHidden>{name}</VisuallyHidden>
              </Link>
              <div>
                <p>{name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function SneakerView() {
  let { id } = useParams<"id">();

  if (!id) {
    return <NoMatch />;
  }

  let snkr = getSneakerById(id);

  if (!snkr) {
    return <NoMatch />;
  }

  let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;

  return (
    <div>
      <h2>{name}</h2>
      <img
        width={400}
        height={400}
        style={{
          borderRadius: "8px",
          maxWidth: "100%",
          aspectRatio: "1 / 1"
        }}
        src={snkr.imageUrl}
        alt={name}
      />
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
