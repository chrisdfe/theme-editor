import * as themeSelectors from "common/store/domains/themes/selectors";
import * as themeActions from "common/store/domains/themes/actions";
import * as themeFs from "common/store/domains/themes/fs";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";
import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import * as swatchColorSelectors from "common/store/domains/swatchColors/selectors";

import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import * as colorTokenSelectors from "common/store/domains/colorTokens/selectors";

const saveCurrentEditedTheme = () => async (dispatch, getState) => {
  const state = getState();
  const themeBundle = themeBundleSelectors.getEditingThemeBundle(state);
  const { theme } = themeBundle;

  return;

  dispatch(themeBundleActions.saveEditedThemeBundle({ filePath }));
};

export default saveCurrentEditedTheme;
