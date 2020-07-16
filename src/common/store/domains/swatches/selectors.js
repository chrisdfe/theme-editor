import { createSelector } from "reselect";
import { mapValues } from "lodash";

import { getEntityList } from "common/store/reducerUtils";

import * as swatchColorsSelectors from "../swatchColors/selectors";

export const getSwatches = (state) => state.entities.swatches;

export const getSwatchesList = createSelector(
  getSwatches,
  getEntityList
);

// TODO - 'get display swatches' or something
export const getThemelessSwatchesList = createSelector(
  getSwatchesList,
  (swatchesList) => swatchesList.filter((swatch) => !swatch.themeId)
);

export const getSwatchById = createSelector(
  getSwatches,
  (_, id) => id,
  (swatches, id) => swatches.byId[id]
);

export const getSwatchByThemeId = createSelector(
  getSwatchesList,
  (_, themeId) => themeId,
  (swatchesList, themeId) =>
    swatchesList.find((swatch) => swatch.themeId === themeId)
);

export const getSwatchSwatchColors = createSelector(
  swatchColorsSelectors.getSwatchColors,
  (_, swatch) => swatch,
  // TODO - use swatchColors.getSwatchColorById instead?
  (swatchColors, swatch) => {
    return swatch.swatchColorIds.map((id) => swatchColors.byId[id]);
  }
);

export const getEditingSwatches = (state) => state.editing.swatches;

// TODO - why is this plural + not singular?
export const getEditingSwatchesList = createSelector(
  getEditingSwatches,
  ({ byId, allIds }) => allIds.map((id) => byId[id])
);

// This makes the assumption that there will only ever be 1 editing swatch
export const getEditingSwatch = createSelector(
  getEditingSwatches,
  ({ byId, allIds }) => byId[allIds[0]]
);

export const getEditingSwatchOriginalState = createSelector(
  getEditingSwatches,
  ({ originalState, allIds }) => {
    const id = allIds[0];
    return originalState[id];
  }
);

// TODO - this should use the singular 'getEditingSwatch' selector
//  + not require input swatch
export const getEditingSwatchSwatchColors = createSelector(
  swatchColorsSelectors.getEditingSwatchColors,
  (_, swatch) => swatch,
  (swatchColors, swatch) => {
    return swatch.swatchColorIds.map((id) => swatchColors.byId[id]);
  }
);

export const getEditingSwatchesSwatchColors = createSelector(
  swatchColorsSelectors.getEditingSwatchColorsList,
  getEditingSwatchesList,
  (swatchesList, swatches) => {
    const swatchIds = swatches.map(({ id }) => id);
    return swatchesList.filter((swatchColor) =>
      swatchIds.includes(swatchColor.swatchId)
    );
  }
);
