import type { To } from "react-router-dom";
import { HistoryMethodsI, OldBrowserHistory } from "../../type";
import { getRealTo } from "../../util";

export default function replaceHistoryMethods(
  history: OldBrowserHistory,
  allExecuteEventCbs: (historyCb: () => void, to?: To) => void,
  oldHistoryMethods: HistoryMethodsI
) {
  history.go = (delta: number) => {
    allExecuteEventCbs(() => {
      const res = oldHistoryMethods.go(delta);
      // history.go = oldHistoryMethods.go;
      return res;
    });
  };
  history.push = (to: To, state?: any) => {
    to = getRealTo(to);
    allExecuteEventCbs(() => {
      const res = oldHistoryMethods.push(to, state);
      // history.push = oldHistoryMethods.push;
      return res;
    }, to);
  };

  history.replace = (to: To, state?: any) => {
    to = getRealTo(to);
    allExecuteEventCbs(() => {
      const res = oldHistoryMethods.replace(to, state);
      // history.replace = oldHistoryMethods.replace;
      return res;
    }, to);
  };

  history.back = () => {
    allExecuteEventCbs(() => {
      const res = oldHistoryMethods.go(-1);
      // history.back = oldHistoryMethods.back;
      return res;
    });
  };

  history.forward = () => {
    allExecuteEventCbs(() => {
      const res = oldHistoryMethods.go(1);
      // history.forward = oldHistoryMethods.forward;
      return res;
    });
  };
}
