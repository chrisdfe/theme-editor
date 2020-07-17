import { createSelector } from "reselect";
import { isEmpty } from "lodash";

import * as themeSelectors from "common/store/domains/themes/selectors";
import * as swatchSelectors from "common/store/domains/swatches/selectors";
import * as swatchColorSelectors from "common/store/domains/swatchColors/selectors";
import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";
import * as colorTokenSelectors from "common/store/domains/colorTokens/selectors";

import objectDiff from "common/utils/objectDiff";

export const getThemeBundleByThemeId = createSelector(
  (state) => state,
  (_, id) => id,
  // TODO - try to split this up in a more cache-able way,
  (state, id) => {
    const theme = themeSelectors.getThemeById(state, id);
    const swatch = themeSelectors.getThemeSwatch(state, theme);
    const swatchColors = swatchSelectors.getSwatchSwatchColors(state, swatch);
    const colorTokenGroups = themeSelectors.getThemeColorTokenGroups(
      state,
      theme
    );
    const colorTokens = colorTokenGroupSelectors.getColorTokenGroupsColorTokensFlatList(
      state,
      colorTokenGroups
    );

    return {
      theme,
      swatch,
      swatchColors,
      colorTokenGroups,
      colorTokens,
    };
  }
);

export const getThemeBundlesList = createSelector(
  (state) => state,
  themeSelectors.getThemes,
  (state, { allIds }) => allIds.map((id) => getThemeBundleByThemeId(state, id))
);

export const getEditingThemeBundle = createSelector(
  (state) => state,
  themeSelectors.getEditingTheme,
  themeSelectors.getEditingThemeSwatch,
  themeSelectors.getEditingThemeColorTokenGroups,
  (state, theme, swatch, colorTokenGroups) => {
    const swatchColors = swatchSelectors.getEditingSwatchSwatchColors(
      state,
      swatch
    );

    const colorTokens = colorTokenGroupSelectors.getEditingColorTokenGroupsColorTokensFlatList(
      state,
      colorTokenGroups
    );

    return {
      theme,
      swatch,
      swatchColors,
      colorTokenGroups,
      colorTokens,
    };
  }
);

export const getEditingThemeBundleOriginalState = createSelector(
  [
    themeSelectors.getEditingThemeOriginalState,
    swatchSelectors.getEditingSwatchOriginalState,
    swatchColorSelectors.getEditingSwatchColorsOriginalState,
    colorTokenGroupSelectors.getEditingColorTokenGroupsOriginalState,
    colorTokenSelectors.getEditingColorTokensOriginalState,
  ],
  (theme, swatch, swatchColors, colorTokenGroups, colorTokens) => {
    return {
      theme,
      swatch,
      swatchColors,
      colorTokenGroups,
      colorTokens,
    };
  }
);

export const getEditingThemeBundleDiff = createSelector(
  [getEditingThemeBundleOriginalState, getEditingThemeBundle],
  (editingThemeBundleOriginalState, editingThemeBundle) =>
    objectDiff(editingThemeBundleOriginalState, editingThemeBundle)
);

export const getEditingThemeBundleHasChanges = createSelector(
  getEditingThemeBundleDiff,
  (diff) => !isEmpty(diff)
);
