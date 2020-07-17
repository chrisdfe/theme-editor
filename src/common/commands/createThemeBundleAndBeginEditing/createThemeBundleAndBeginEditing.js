import * as themeSelectors from "common/store/domains/themes/selectors";
import * as themeActions from "common/store/domains/themes/actions";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";
import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import { confirmDiscardingChangesToEditingTheme } from "../utils";

const createThemeBundleAndBeginEditing = () => async (dispatch, getState) => {
  const state = getState();

  const shouldContinue = confirmDiscardingChangesToEditingTheme(state);

  if (!shouldContinue) {
    return;
  }

  dispatch(themeBundleActions.createThemeBundleAndBeginEditing());
};

export default createThemeBundleAndBeginEditing;
