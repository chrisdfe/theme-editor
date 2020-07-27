import { createSelector } from "reselect";
import { getEntityList } from "common/store/reducerUtils";

export const getSwatchColors = (state) => state.entities.swatchColors;

export const getSwatchColorsList = createSelector(
  getSwatchColors,
  getEntityList
);

export const getEditingSwatchColors = (state) => state.editing.swatchColors;

export const getEditingSwatchColorById = createSelector(
  getEditingSwatchColors,
  (_, id) => id,
  ({ byId }, id) => byId[id]
);

export const getEditingSwatchColorsList = createSelector(
  getEditingSwatchColors,
  getEntityList
);

export const getEditingSwatchColorsOriginalState = createSelector(
  getEditingSwatchColors,
  ({ originalState, allIds }) => allIds.map((id) => originalState[id])
);
