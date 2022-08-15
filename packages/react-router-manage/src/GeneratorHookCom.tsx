import React, { useLayoutEffect, useState } from 'react';
import Spin from './components/Spin'
import NameRedirect from './components/NameRedirect';
import type { BeforeEachMountI, BeforeEnterI, NextOptionsType, RouteTypeI } from './type';

import { useRouter } from './index';
import { isComponent, isString } from './util';
import { Navigate } from 'react-router-dom';

function getComponent (options?: NextOptionsType, Component?: React.ComponentType) {
  let ReplaceComponent: React.ComponentType<any> | undefined;
  if (!options) {
    return ReplaceComponent;
  }
  // 如果传入的是组件
  if (isComponent(options)) {
    ReplaceComponent = options;
  } else if (isString(options.path)) { // 有path，则优先使用path
    ReplaceComponent = function Redirect () {
      return <Navigate to={options.path!} />;
    };
  } else if (isString(options.name)) { // 没有path，则使用name
    ReplaceComponent = function Redirect () {
      return <NameRedirect name={options.name!} component={Component} />;
    };
  }
  return ReplaceComponent;
}

const LoadingCmp = <Spin tip="应用正在加载中…" />;
export const GeneratorHookCom: React.FC<{
  beforeEnter?: BeforeEnterI
  beforeEachMount?: BeforeEachMountI
  Component: any
  _route: RouteTypeI
}> = ({ beforeEnter, Component, beforeEachMount }) => {
  /**
     * 由于setCurrentComponent(Component)可能Component是个函数
     * react 默认认为 preState 为函数则会执行函数而出错
     * 所以转为一个对象
     */
  const [CurrentComponent, setCurrentComponent] = useState<{ Component: any }>({
    Component: undefined,
  });
  const { currentRoute } = useRouter();
  useLayoutEffect(() => {
    // 是否激活状态(未卸载)
    let isActive = true;
    // 全局的
    if (beforeEachMount) {
      beforeEachMount(currentRoute, options => {
        if (!isActive) {
          return;
        }

        // 全局的
        const EachReplaceComponent = getComponent(options, Component);
        if (beforeEnter) {
          // 局部的
          beforeEnter(currentRoute, enterOptions => {
            if (!isActive) {
              return;
            }
            const EnterReplaceComponent = getComponent(enterOptions, EachReplaceComponent || Component);
            // 如果beforeEnter中next传入了组件，则以beforeEnter的为准
            // 否则以beforeEachBeforeMount为准
            setCurrentComponent({ Component: EnterReplaceComponent || EachReplaceComponent || Component });
          });
        } else {
          setCurrentComponent({ Component: EachReplaceComponent || Component });
        }
      });
    } else {
      // 局部的
      if (beforeEnter) {
        beforeEnter(currentRoute, enterOptions => {
          if (!isActive) {
            return;
          }
          const EnterReplaceComponent = getComponent(enterOptions, Component);
          setCurrentComponent({
            Component: EnterReplaceComponent || Component,
          });
        });
      }
    }
    return () => {
      isActive = false;
    };
  }, [Component, currentRoute, beforeEnter, beforeEachMount]);

  return CurrentComponent.Component ? <CurrentComponent.Component /> : <>{LoadingCmp}</>;
};

export default GeneratorHookCom;
