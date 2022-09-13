import { NewStateI, NewStateQueryI } from "./type";
import { computedNewState } from "./util";

// Initialized data to prevent double calculation
// defineRouterConfig may be called multiple times in the same application
let initialStateMap = new Map<number, NewStateI>();
function getInitialState({
  inputRoutes,
  hasAuth,
  permissionList,
  beforeEachMount,
  basename,
  location,
  _defineId
}: NewStateQueryI & { _defineId: number }): NewStateI {
  const prevInitialData = initialStateMap.get(_defineId);
  if (prevInitialData) {
    return prevInitialData;
  }
  const _initialState = computedNewState({
    inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount,
    basename,
    location
  });
  initialStateMap.set(_defineId, _initialState);
  return _initialState;
}

export default getInitialState;
