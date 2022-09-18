import * as React from 'react';
/**
 * LoadingComponent Define the Suspense component's fallback and beforeEnter when a component is loaded,
 * and the state component when calling next
 */
interface ChangeableI {
    LoadingComponent: React.FunctionComponent<any>;
}
declare const changeable: ChangeableI;
declare function setChangeable(options: Partial<ChangeableI>): void;
export { changeable, setChangeable };
