import * as React from "react";
import { useParams, useRouter } from "react-router-manage";
import type { RouteTypeExtendsI } from "react-router-manage";
import { Breadcrumb } from "antd";

interface AntdRouterBreadcrumbsProps {
  text?: string; // 面包屑文案，例如新增xx还是编辑xx可以自定义
  separator?: string; // 分隔符
}

const AntdRouterBreadcrumbs: React.FC<AntdRouterBreadcrumbsProps> = ({
  text,
  separator
}) => {
  const { currentRoute, navigate } = useRouter();
  const params = useParams();
  const _routes = React.useMemo(() => {
    const _levelRoutes: RouteTypeExtendsI[] = [];
    let _parentRoute: RouteTypeExtendsI | undefined = currentRoute;
    while (_parentRoute) {
      // @ts-ignore
      if (_parentRoute.breadcrumbs?.isRoot) {
        // 如果是面包屑的根节点，则不再向上找
        _parentRoute = undefined;
      } else {
        _levelRoutes.unshift(_parentRoute);
        _parentRoute = _parentRoute.parent;
      }
    }
    return _levelRoutes;
  }, [currentRoute]);

  // 点击面包屑
  const onClick = React.useCallback(
    (item: RouteTypeExtendsI) => {
      const { path } = item;
      const { component } = item;
      // 接下path中的参数
      // let realPath = path;
      path && component && navigate(path, { params });
    },
    [navigate, params]
  );

  const getIsCanClick = React.useCallback(
    (item: RouteTypeExtendsI, index: number) => {
      if (!item.component || index === _routes.length - 1) {
        return false;
      }
      return true;
    },
    [_routes.length]
  );

  return (
    <Breadcrumb separator={separator}>
      {_routes.map((item: RouteTypeExtendsI, index) => {
        const isCanClick = getIsCanClick(item, index);
        const routeBreadcrumbTittle = item.breadcrumbs?.text || item.title;
         const title =  index === _routes.length - 1 ? text || routeBreadcrumbTittle : routeBreadcrumbTittle;
        return (
          <Breadcrumb.Item
            key={item.path}
            className={
              isCanClick ? "antd-breadcrumbs__link" : "breadcrumbs__static"
            }
          >
            {isCanClick ? (
              <a
                onClick={() => {
                  // 最后一个面包屑不点击
                  index !== _routes.length - 1 && onClick(item);
                }}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default AntdRouterBreadcrumbs;
