import * as ThemeModule from "./module";
import * as types from "./types";
import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as themeBundleSelectors from "../themeBundles/selectors";

import * as swatchActions from "../swatches/actions";
import * as swatchSelectors from "../swatches/selectors";
import * as SwatchModule from "../swatches/module";

import * as swatchColorActions from "../swatchColors/actions";
import * as SwatchColorModule from "../swatchColors/module";

import * as colorTokenActions from "../colorTokens/actions";
import * as colorTokenSelectors from "../colorTokens/selectors";
import * as ColorTokenModule from "../colorTokens/module";

import * as colorTokenGroupActions from "../colorTokenGroups/actions";
import * as colorTokenGroupSelectors from "../colorTokenGroups/selectors";
import * as ColorTokenGroupModule from "../colorTokenGroups/module";

import * as selectors from "./selectors";

// TODO
export const setTheme = ({ theme }) => {
  return { type: types.SET_THEME, themes };
};

export const setThemes = ({ themes }) => {
  return { type: types.SET_THEMES, themes };
};

export const addTheme = (payload = {}) => {
  validateActionPayload(payload, { required: ["theme"] });
  const { theme } = payload;
  return { type: types.ADD_THEME, theme };
};

export const addThemes = (payload = {}) => {
  validateActionPayload(payload, { required: ["themes"] });
  const { themes } = payload;
  return { type: types.ADD_THEMES, themes };
};

export const createTheme = (payload = {}) => async (dispatch, getState) => {
  validateActionPayload(payload, { required: ["theme"] });
  const { theme: themeAttributes } = payload;

  // TODO - validation
  // const allThemesList = selectors.getThemesList(state);
  // const { errors } = ThemeModule.validate(themeAttributes, allThemesList);

  const theme = ThemeModule.create(themeAttributes);

  dispatch(addTheme({ theme }));

  // TODO - put this in createThemeBundle
  dispatch(
    swatchActions.createSwatchForTheme({
      theme,
      attributes: { name: `${theme.name} swatch` },
    })
  );

  // dispatch(colorTokenGroupActions.createColorTokenGroupForTheme({ theme }));
};

export const updateTheme = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;

  // TODO - ThemeModule.validate();

  return dispatch({ type: types.UPDATE_THEME, id, attributes });
};

export const updateThemes = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["themes"] });
  const { themes } = payload;
  return dispatch({ type: types.UPDATE_THEMES, themes });
};

export const removeThemeById = (payload = {}) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  return { type: types.REMOVE_THEME, id };
};

export const removeThemesById = (payload = {}) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return { type: types.REMOVE_THEMES, ids };
};

export const deleteThemeById = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;

  // TODO - delete file here

  // TODO - move this into 'deleteThemeBundleById'
  await dispatch(swatchActions.deleteSwatchByThemeId({ themeId: id }));

  await dispatch(
    colorTokenGroupActions.deleteColorTokenGroupsByThemeId({ themeId: id })
  );

  return dispatch(removeThemeById({ id }));
};

export const deleteThemesById = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return dispatch(removeThemesById({ ids }));
};

export const updateEditedTheme = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;

  // TODO - ThemeModule.validate();

  return dispatch({ type: types.UPDATE_EDITED_THEME, id, attributes });
};

export const beginEditingExistingTheme = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  const state = getState();

  const themeBundle = themeBundleSelectors.getThemeBundleByThemeId({ id });

  return dispatch(beginEditingTheme(themeBundle));
};

export const createThemeFromSwatchAndBeginEditing = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["swatch"] });
  const { swatch } = payload;
  const state = getState();

  // TODO - same things as in createThemeAndBeginEditing
  const existingTheme = selectors.getEditingTheme(state);
  if (existingTheme) {
    return;
  }

  const theme = ThemeModule.create({ name: `${swatch.name} theme` });

  const swatchColors = swatchSelectors.getSwatchSwatchColors(state, swatch);

  const swatchCopy = SwatchModule.copyWithNewId({
    ...swatch,
    themeId: theme.id,
  });

  const swatchColorCopies = swatchColors.map((swatchColor) =>
    SwatchColorModule.copyWithNewId({ ...swatchColor, swatchId: swatchCopy.id })
  );

  const colorTokenGroup = ColorTokenGroupModule.createForTheme({ theme });
  const colorTokenGroups = [colorTokenGroup];
  const colorTokens = ColorTokenGroupModule.createDefaultColorTokensForGroup({
    colorTokenGroup,
  });

  return dispatch(
    beginEditingTheme({
      theme,
      swatch: swatchCopy,
      swatchColors: swatchColorCopies,
      colorTokenGroups,
      colorTokens,
    })
  );
};

const saveNewTheme = (payload = {}) => async (dispatch, getState) => {
  console.log("saving new theme", payload);
  const {
    theme,
    swatch: swatchCopy,
    swatchColors: swatchColorCopies,
    colorTokenGroups,
    colorTokens,
  } = payload;
  // TODO
  // 1) combine this into 1 action like 'addThemeBundle'
  // 2) save this all to a file
};

const saveExistingTheme = (payload = {}) => async (dispatch, getState) => {
  const {
    theme,
    swatch: swatchCopy,
    swatchColors: swatchColorCopies,
    colorTokenGroups,
    colorTokens,
  } = payload;
  console.log("saving existing theme", payload);
  // 1) combine this into 1 action like 'addThemeBundle'
  // 2) save this all to a file
  // dispatch(addTheme({ theme }));
  // dispatch(swatchActions.addSwatch({ swatch }));
  // dispatch(swatchColorActions.addSwatchColors({ swatchColors }));
  // dispatch(colorTokenGroupActions.addColorTokenGroup({ colorTokenGroup }));
};

export const saveEditedTheme = (payload = {}) => async (dispatch, getState) => {
  const state = getState();

  const themeBundle = themeBundleSelectors.getEditingThemeBundle(state);

  const existingTheme = selectors.getThemeById(state, theme.id);

  // TODO
  // - get diff of changes
  //   if there have been changes then save them
  //   if nothing has changed then just clear

  if (existingTheme) {
    dispatch(saveExistingTheme(themeBundle));
  } else {
    dispatch(saveNewTheme(themeBundle));
  }

  dispatch({ type: types.EDIT_CLEARED });
};

export const cancelEditingTheme = () => async (dispatch) => {
  // TODO
  // - if there are pending changes
  //   prompt the user whether they want to discard changes
  dispatch({ type: types.EDIT_CLEARED });
};
