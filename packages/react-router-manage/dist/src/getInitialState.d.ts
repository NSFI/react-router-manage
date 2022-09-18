import { NewStateI, NewStateQueryI } from "./type";
declare function getInitialState(currentQueryData: NewStateQueryI & {
    _defineId: number;
}): NewStateI;
export default getInitialState;
