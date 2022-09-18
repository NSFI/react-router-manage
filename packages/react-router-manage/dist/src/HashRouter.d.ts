import type { BrowserRouterProps, Location } from "react-router-dom";
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
export default function HashRouter({ basename, children, syncUpdateCurrentRoute }: BrowserRouterProps & {
    syncUpdateCurrentRoute: (location: Location) => void;
}): JSX.Element;
