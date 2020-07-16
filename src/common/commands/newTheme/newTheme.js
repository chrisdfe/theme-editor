import * as themeSelectors from "common/store/domains/themes/selectors";
import * as themeActions from "common/store/domains/themes/actions";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";
import * as themeBundleActions from "common/store/domains/themeBundles/actions";

const newTheme = () => async (dispatch, getState) => {
  const state = getState();

  const editingTheme = themeSelectors.getEditingTheme(state);

  if (editingTheme) {
    const themeIsNew = themeSelectors.getEditingThemeIsNew(state);

    if (!themeIsNew) {
      const hasChanges = themeBundleSelectors.getEditingThemeBundleHasChanges(
        state
      );

      if (hasChanges) {
        const shouldContinue = confirm("Discard current changes to theme?");
        if (!shouldContinue) {
          return;
        }
      }
    }
  }

  dispatch(themeBundleActions.createThemeBundleAndBeginEditing());
};

export default newTheme;
