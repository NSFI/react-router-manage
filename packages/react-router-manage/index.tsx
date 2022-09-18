export type {
  FormEncType,
  FormMethod,
  ParamKeyValuePair,
  SubmitOptions,
  URLSearchParamsInit,
  ActionFunction,
  ActionFunctionArgs,
  AwaitProps,
  DataMemoryRouterProps,
  DataRouteMatch,
  DataRouteObject,
  Fetcher,
  Hash,
  IndexRouteProps,
  JsonFunction,
  LayoutRouteProps,
  LoaderFunction,
  LoaderFunctionArgs,
  Location,
  MemoryRouterProps,
  NavigateFunction,
  NavigateOptions,
  NavigateProps,
  Navigation,
  Navigator,
  OutletProps,
  Params,
  ParamParseKey,
  Path,
  PathMatch,
  Pathname,
  PathPattern,
  PathRouteProps,
  RedirectFunction,
  RelativeRoutingType,
  RouteMatch,
  RouteObject,
  RouteProps,
  RouterProps,
  RouterProviderProps,
  RoutesProps,
  Search,
  ShouldRevalidateFunction,
  To
} from "react-router-dom";

export {
  createSearchParams,
  AbortedDeferredError,
  Await,
  MemoryRouter,
  Navigate,
  NavigationType,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  createMemoryRouter,
  createPath,
  createRoutesFromChildren,
  createRoutesFromElements,
  defer,
  isRouteErrorResponse,
  generatePath,
  json,
  matchPath,
  matchRoutes,
  parsePath,
  redirect,
  renderMatches,
  resolvePath,
  useActionData,
  useAsyncError,
  useAsyncValue,
  useHref,
  useInRouterContext,
  useLoaderData,
  useLocation,
  useMatch,
  useMatches,
  useNavigate,
  useNavigation,
  useNavigationType,
  useOutlet,
  useOutletContext,
  useParams,
  useResolvedPath,
  useRevalidator,
  useRouteError,
  useRouteLoaderData,
  useRoutes
} from "react-router-dom";

///////////////////////////////////////////////////////////////////////////////
// DANGER! PLEASE READ ME!
// We provide these exports as an escape hatch in the event that you need any
// routing data that we don't provide an explicit API for. With that said, we
// want to cover your use case if we can, so if you feel the need to use these
// we want to hear from you. Let us know what you're building and we'll do our
// best to make sure we can support you!
//
// We consider these exports an implementation detail and do not guarantee
// against any breaking changes, regardless of the semver release. Use with
// extreme caution and only if you understand the consequences. Godspeed.
///////////////////////////////////////////////////////////////////////////////

/** @internal */
export {
  UNSAFE_DataRouterContext,
  UNSAFE_DataRouterStateContext,
  UNSAFE_DataStaticRouterContext,
  UNSAFE_NavigationContext,
  UNSAFE_LocationContext,
  UNSAFE_RouteContext,
  UNSAFE_enhanceManualRouteObjects
} from "react-router-dom";
//#endregion

export type {
  HashRouterProps,
  BrowserRouterProps,
  HistoryRouterProps,
  LinkProps,
  NavLinkProps,
  FormProps,
  SubmitFunction,
  FetcherWithComponents,
} from "react-router-dom";

export {
  createBrowserRouter,
  createHashRouter,
  Link,
  NavLink,
  Form,
  ScrollRestoration,
  useSearchParams,
  useFormAction,
  useFetcher,
  useFetchers,
//   BrowserRouter,
//   HashRouter
} from "react-router-dom";

export * from './src'
