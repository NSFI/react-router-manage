import { NewStateI, NewStateQueryI } from "./type";
import { computedNewState } from "./util";

// Initialized data to prevent double calculation
let initialState: NewStateI | undefined = undefined;
function getInitialState({
  inputRoutes,
  hasAuth,
  permissionList,
  beforeEachMount,
  basename,
  location
}: NewStateQueryI): NewStateI {
  if (initialState) {
    return initialState;
  }
  const _initialState = computedNewState({
    inputRoutes,
    permissionList,
    hasAuth,
    beforeEachMount,
    basename,
    location
  });
  initialState = _initialState;
  return _initialState;
}


export default getInitialState;
