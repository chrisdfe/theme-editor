import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";
import * as themeSelectors from "common/store/domains/themes/selectors";

const confirmDiscardingChangesToEditingTheme = (state) => {
  const editingTheme = themeSelectors.getEditingTheme(state);

  if (editingTheme) {
    const hasChanges = themeBundleSelectors.getEditingThemeBundleHasChanges(
      state
    );

    if (hasChanges) {
      const shouldContinue = confirm("Discard current changes to theme?");

      if (!shouldContinue) {
        return false;
      }
    }
  }

  return true;
};

export default confirmDiscardingChangesToEditingTheme;
