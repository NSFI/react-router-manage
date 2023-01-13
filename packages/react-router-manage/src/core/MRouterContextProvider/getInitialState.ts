import { NewStateI, NewStateQueryI } from "../../type";
import { computedNewState } from "../../util";

// Initialized data to prevent double calculation
// defineRouterConfig may be called multiple times in the same application
let initialStateMap = new Map<
  number,
  {
    queryData: NewStateQueryI;
    initialData: NewStateI;
  }
>();

function getSameQueryData(
  prevData: NewStateQueryI,
  currentData: NewStateQueryI
) {
  return (
    prevData.basename === currentData.basename &&
    prevData.hasAuth === currentData.hasAuth &&
    prevData.beforeEachMount === currentData.beforeEachMount &&
    prevData.inputRoutes === currentData.inputRoutes && 
    prevData.permissionList === currentData.permissionList
  );
}
function getInitialState(
  currentQueryData: NewStateQueryI & { _defineId: number }
): NewStateI {
  const {
    inputRoutes,
    hasAuth,
    permissionList,
    permissionMode,
    beforeEachMount,
    basename,
    location,
    _defineId
  } = currentQueryData;
  const prevData = initialStateMap.get(_defineId);
  if (prevData) {
    const isSameQueryData = getSameQueryData(
      prevData.queryData,
      currentQueryData
    );
    if (isSameQueryData) {
      return prevData.initialData;
    }
  }
  const _initialState = computedNewState({
    inputRoutes,
    permissionList,
    permissionMode,
    hasAuth,
    beforeEachMount,
    basename,
    location
  });
  initialStateMap.set(_defineId, {
    queryData: currentQueryData,
    initialData: _initialState
  });
  return _initialState;
}

export default getInitialState;
