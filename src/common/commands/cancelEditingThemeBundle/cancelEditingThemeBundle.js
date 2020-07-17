import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import { confirmDiscardingChangesToEditingTheme } from "../utils";

const cancelEditingThemeBundle = () => async (dispatch, getState) => {
  const state = getState();

  const shouldContinue = confirmDiscardingChangesToEditingTheme(state);

  if (!shouldContinue) {
    return;
  }

  dispatch(themeBundleActions.cancelEditingThemeBundle());
};

export default cancelEditingThemeBundle;
