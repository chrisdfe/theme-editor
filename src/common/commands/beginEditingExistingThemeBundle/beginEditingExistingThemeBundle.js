import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import { confirmDiscardingChangesToEditingTheme } from "../utils";

const beginEditingExistingThemeBundle = ({ id }) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const shouldContinue = confirmDiscardingChangesToEditingTheme(state);

  if (!shouldContinue) {
    return;
  }

  dispatch(themeBundleActions.beginEditingExistingThemeBundle({ id }));
};

export default beginEditingExistingThemeBundle;
