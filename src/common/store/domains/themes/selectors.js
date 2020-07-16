import { createSelector } from "reselect";

import { getEntityList } from "common/store/reducerUtils";

import * as swatchSelectors from "../swatches/selectors";
import * as colorTokenGroupSelectors from "../colorTokenGroups/selectors";

export const getThemes = (state) => state.entities.themes;

export const getThemesList = createSelector(
  getThemes,
  getEntityList
);

export const getThemeById = createSelector(
  getThemes,
  (_, id) => id,
  ({ byId }, id) => byId[id]
);

export const getSavedThemesList = createSelector(
  getThemesList,
  (themesList) => themesList.filter((theme) => !theme.isEditing)
);

export const getThemeSwatch = createSelector(
  swatchSelectors.getSwatchesList,
  (_, theme) => theme,
  (swatchesList, theme) =>
    swatchesList.find((swatch) => swatch.themeId === theme.id)
);

export const getThemeColorTokenGroups = createSelector(
  colorTokenGroupSelectors.getColorTokenGroupsList,
  (_, theme) => theme,
  (colorTokenGroupsList, theme) =>
    colorTokenGroupsList.filter(
      (colorTokenGroup) => colorTokenGroup.themeId === theme.id
    )
);

export const getEditingThemes = (state) => state.editing.themes;

// This assumes that only 1 theme will be being edited at a time
export const getEditingTheme = createSelector(
  getEditingThemes,
  ({ byId, allIds }) => byId[allIds[0]]
);

export const getEditingThemeOriginalState = createSelector(
  getEditingThemes,
  getEditingTheme,
  ({ originalState }, theme) => originalState[theme.id]
);

export const getEditingThemeSwatch = createSelector(
  (state) => state,
  swatchSelectors.getEditingSwatch
);

export const getEditingThemeColorTokenGroups = createSelector(
  colorTokenGroupSelectors.getEditingColorTokenGroupsList,
  getEditingTheme,
  (colorTokenGroupsList, editingTheme) =>
    colorTokenGroupsList.filter(
      (colorTokenGroup) => colorTokenGroup.themeId === editingTheme.id
    )
);

export const getEditingThemeIsNew = createSelector(
  [getThemes, getEditingTheme],
  ({ byId }, editingTheme) => !byId[editingTheme.id]
);
