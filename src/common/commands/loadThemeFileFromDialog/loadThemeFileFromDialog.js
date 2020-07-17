import * as themeActions from "common/store/domains/themes/actions";
import * as themeFs from "common/store/domains/themes/fs";
import * as themeSelectors from "common/store/domains/themes/selectors";

import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import { confirmDiscardingChangesToEditingTheme } from "../utils";

const loadThemeFileFromDialog = () => async (dispatch, getState) => {
  const state = getState();

  const shouldContinue = confirmDiscardingChangesToEditingTheme(state);

  if (!shouldContinue) {
    return;
  }

  // TODO - maybe the dialog should get opened from this command,
  // so themeFs will be purely fs-related things (no UI)
  // e.g
  // themeFs.getThemeFilePathFromDialog
  const themeBundle = await themeFs.loadThemeFileFromDialog();

  // User has canceled
  if (!themeBundle) {
    return;
  }

  const { id } = themeBundle.theme;

  const existingTheme = themeSelectors.getThemeById(
    state,
    themeBundle.theme.id
  );

  if (existingTheme) {
    await dispatch(themeBundleActions.updateThemeBundle({ themeBundle }));
  } else {
    await dispatch(themeBundleActions.addThemeBundle({ themeBundle }));
  }

  await dispatch(themeBundleActions.beginEditingExistingThemeBundle({ id }));
};

export default loadThemeFileFromDialog;
