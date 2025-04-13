import * as React from "react";
import Spin from "./components/Spin";
const LoadingCmp = () => (
  <>
    <Spin tip="应用正在加载中…" />
  </>
);

/**
 * LoadingComponent Define the Suspense component's fallback and beforeEnter when a component is loaded,
 * and the state component when calling next
 */
interface ChangeableI {
  LoadingComponent: React.FunctionComponent<any>;
}

const changeable: ChangeableI = {
  LoadingComponent: LoadingCmp
};

function setChangeable(options: Partial<ChangeableI>) {
  Object.entries(options).forEach(([key, value]) => {
    changeable[key as keyof ChangeableI] = value;
  });
}

export { changeable, setChangeable };
