import React from "react";
import { useRouter } from "react-router-manage";
import { Breadcrumb } from "antd";

interface AntdRouterBreadcrumbsProps {
  id?: number;
}

const modulePrefix = "RouterBreadcrumbs";
const AntdRouterBreadcrumbs: React.FC<AntdRouterBreadcrumbsProps> = (
  props: AntdRouterBreadcrumbsProps
) => {
  const {currentRoute, routes} = useRouter();
  return <div className={modulePrefix}></div>;
};

export default AntdRouterBreadcrumbs;
