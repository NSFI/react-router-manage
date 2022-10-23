import * as React from "react";
import { useMemo } from "react";
import { Navigate } from "react-router";
import { useRouter } from "../../hooks";
import NoAuth from "../NoAuth";

const RedirectChild: React.FC = () => {
  const { currentRoute } = useRouter();

  const redirectPath = useMemo(() => {
    if (!currentRoute) {
      return "";
    }
    const itemsAndChildren = currentRoute._itemsAndChildren || [];

    const childRoute = itemsAndChildren?.find(i => {
      return i._isHasAuth;
    });

    return childRoute?.path || "";
  }, [currentRoute]);

  let replace = false;
  // 父级也没配置component，则会进行多次重定向进行replace, 以便浏览器回退行为
  if (!currentRoute.parent?.component) {
    replace = true;
  }
  if (!redirectPath) {
    return <NoAuth />;
  }
  return <Navigate to={redirectPath} replace={replace} />;
};

export default RedirectChild;
