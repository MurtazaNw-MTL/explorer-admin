// export const dis

import { REDUX_VAR } from "./ReduxVar";

const toggleTheme = (dispatch, value) =>
  dispatch({ type: REDUX_VAR.SHOW_THEME });
const saveMetamaskDetails = (dispatch, payload) =>
  dispatch({ type: REDUX_VAR.METAMASK, payload });

export const ACTIONS = {
  toggleTheme,
  saveMetamaskDetails
};
