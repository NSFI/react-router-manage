import {
    MemoryRouter,
    Navigate,
    Outlet,
    Route,
    Router,
    Routes,
    createRoutesFromChildren,
    generatePath,
    matchRoutes,
    matchPath,
    resolvePath,
    renderMatches,
    useHref,
    useInRouterContext,
    useLocation,
    useMatch,
    useNavigationType,
    useOutlet,
    useParams,
    useResolvedPath,
    useRoutes,
    useOutletContext
  } from "react-router";

  import {
    createSearchParams,
    useSearchParams,
    useLinkClickHandler,
    NavLink,
    Link,
  } from 'react-router-dom'

  import type {
    LinkProps,
    NavLinkProps,
    ParamKeyValuePair,
    URLSearchParamsInit,
    NavigateOptions
  }from 'react-router-dom'

  export type {
    LinkProps,
    NavLinkProps,
    ParamKeyValuePair,
    URLSearchParamsInit,
    NavigateOptions,
  }

  export {
    createSearchParams,
    useSearchParams,
    useLinkClickHandler,
    NavLink,
    Link,
    
  }

  export {
    MemoryRouter,
    Navigate,
    Outlet,
    Route,
    Router,
    Routes,
    createRoutesFromChildren,
    generatePath,
    matchRoutes,
    matchPath,
    resolvePath,
    renderMatches,
    useHref,
    useInRouterContext,
    useLocation,
    useMatch,
    useNavigationType,
    useOutlet,
    useParams,
    useResolvedPath,
    useRoutes,
    useOutletContext
  }

export * from './src'