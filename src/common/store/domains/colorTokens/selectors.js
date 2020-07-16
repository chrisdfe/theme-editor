import { createSelector } from "reselect";
import { getEntityList } from "common/store/reducerUtils";

import * as swatchColorSelectors from "../swatchColors/selectors";

export const getColorTokens = (state) => state.entities.colorTokens;

export const getColorTokensList = createSelector(
  getColorTokens,
  getEntityList
);

export const getColorTokenSwatchColor = createSelector(
  swatchColorSelectors.getSwatchColorsList,
  (_, colorToken) => colorToken,
  (swatchColorsList, colorToken) =>
    swatchColorsList.find(
      (swatchColor) => swatchColor.id === colorToken.swatchColorId
    )
);

export const getEditingColorTokens = (state) => state.editing.colorTokens;

export const getEditingColorTokensList = createSelector(
  getEditingColorTokens,
  getEntityList
);

export const getEditingColorTokensOriginalState = createSelector(
  getEditingColorTokens,
  ({ originalState, allIds }) => allIds.map((id) => originalState[id])
);
