import * as themeTypes from "../themes/types";
import * as themeSelectors from "../themes/selectors";
import * as themeFs from "../themes/fs";
import * as Theme from "../themes/module";

import * as swatchSelectors from "../swatches/selectors";
import * as SwatchModule from "../swatches/module";

import * as SwatchColorModule from "../swatchColors/module";

import * as ThemeBundle from "./module";
import * as types from "./types";
import * as selectors from "./selectors";

import { validateActionPayload } from "common/store/errors/PayloadError";

export const addThemeBundle = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, {
    required: ["themeBundle"],
  });

  const {
    theme: themeAttributes,
    swatch: swatchAttributes,
    swatchColors: swatchColorAttributesList,
    colorTokenGroups: colorTokenGroupAttributesList,
    colorTokens: colorTokenAttributesList,
  } = payload.themeBundle;

  const themeBundle = ThemeBundle.create({
    themeAttributes,
    swatchAttributes,
    swatchColorAttributesList,
    colorTokenGroupAttributesList,
    colorTokenAttributesList,
  });

  // TODO - ThemeBundleModule.validate

  dispatch({ type: types.ADD_THEME_BUNDLE, ...themeBundle });
};

export const updateThemeBundle = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, {
    required: ["themeBundle"],
  });

  const { themeBundle } = payload;

  dispatch({ type: types.UPDATE_THEME_BUNDLE, ...themeBundle });
};

export const deleteThemeBundleById = (payload = {}) => async () => {};

export const loadThemeBundleFromFile = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, {
    required: ["filePath"],
  });

  const { filePath } = payload;
  const themeBundle = themeFs.loadThemeFile(filePath);

  return dispatch(addThemeBundle({ themeBundle }));
};

export const beginEditingThemeBundle = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, {
    required: ["themeBundle"],
  });

  const { themeBundle } = payload;

  return dispatch({
    type: themeTypes.EDIT_STARTED,
    ...themeBundle,
  });
};

export const beginEditingExistingThemeBundle = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  const state = getState();

  const themeBundle = selectors.getThemeBundleByThemeId(state, id);

  return dispatch(beginEditingThemeBundle({ themeBundle }));
};

export const createThemeBundleAndBeginEditing = (payload = {}) => async (
  dispatch,
  getState
) => {
  const { attributes = {} } = payload;
  const state = getState();

  const themeBundle = ThemeBundle.create(attributes);

  return dispatch(beginEditingThemeBundle({ themeBundle }));
};

export const createThemeBundleFromSwatchAndBeginEditing = (
  payload = {}
) => async (dispatch, getState) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  const state = getState();
  const swatch = swatchSelectors.getSwatchById(state, id);
  const swatchColors = swatchSelectors.getSwatchSwatchColors(state, swatch);

  // TODO - SwatchModule.create
  const newSwatch = SwatchModule.copyWithNewId({
    ...swatch,
    swatchColorIds: [],
  });
  const newSwatchColors = swatchColors.map((swatchColor) =>
    SwatchColorModule.copyWithNewId({ ...swatchColor, swatchId: newSwatch.id })
  );
  newSwatch.swatchColorIds = newSwatchColors.map(({ id }) => id);

  return dispatch(
    createThemeBundleAndBeginEditing({
      attributes: {
        swatchAttributes: newSwatch,
        swatchColorAttributesList: newSwatchColors,
      },
    })
  );
};

const saveThemeBundle = async (payload = {}) => {
  const { filePath, themeBundle } = payload;
  return themeFs.saveThemeFile(filePath, themeBundle);
};

const saveExistingThemeBundle = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["filePath", "themeBundle"] });

  const { filePath, themeBundle } = payload;

  await saveThemeBundle({ filePath, themeBundle });
  return dispatch(updateThemeBundle({ themeBundle }));
};

const saveNewThemeBundle = (payload = {}) => async (dispatch, getState) => {
  validateActionPayload(payload, { required: ["filePath", "themeBundle"] });

  const { filePath, themeBundle } = payload;

  await saveThemeBundle({ filePath, themeBundle });
  return dispatch(addThemeBundle({ themeBundle }));
};

export const saveEditedThemeBundle = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["filePath"] });
  const { filePath } = payload;

  const state = getState();

  const themeBundle = selectors.getEditingThemeBundle(state);
  const existingTheme = themeSelectors.getThemeById(
    state,
    themeBundle.theme.id
  );

  // TODO
  // - get diff of changes
  //   if there have been changes then save them
  //   if nothing has changed then just clear

  if (existingTheme) {
    await dispatch(saveExistingThemeBundle({ filePath, themeBundle }));
  } else {
    await dispatch(saveNewThemeBundle({ filePath, themeBundle }));
  }

  dispatch({ type: themeTypes.EDIT_CLEARED });
};
