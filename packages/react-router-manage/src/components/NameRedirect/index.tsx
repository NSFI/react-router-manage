import * as React from "react";
import { Navigate } from "react-router-dom";
import { useRouter } from "../../index";

const NameRedirect: React.FC<{
  name: string;
  component?: React.ComponentType<any>;
}> = ({ name, component: Component }) => {
  const { routesMap, currentRoute } = useRouter();

  const targetRoute = routesMap[name];

  if (!targetRoute) {
    if (__DEV__) {
      Error(`routesMap.${name} 路由不存在`);
    }
  }

  if (name === currentRoute.name) {
    if (Component) {
      return <Component />;
    }
    return <></>;
  }

  return <Navigate to={targetRoute.path || ""} />;
};

export default NameRedirect;
