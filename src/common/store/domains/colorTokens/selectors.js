import { createSelector } from "reselect";
import { getEntityList } from "common/store/reducerUtils";

import * as ColorTokenModule from "common/store/domains/colorTokens/module";

import * as swatchColorSelectors from "../swatchColors/selectors";

import * as colorTokenModificationSelectors from "../colorTokenModifications/selectors";

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

export const getEditingColorTokenById = createSelector(
  getEditingColorTokens,
  (_, id) => id,
  ({ byId }, id) => byId[id]
);

export const getEditingColorTokenSwatchColor = createSelector(
  swatchColorSelectors.getEditingSwatchColorsList,
  (_, colorToken) => colorToken,
  (swatchColorsList, colorToken) =>
    swatchColorsList.find(
      (swatchColor) => swatchColor.id === colorToken.swatchColorId
    )
);

export const getEditingColorTokenModifications = createSelector(
  colorTokenModificationSelectors.getEditingColorTokenModifications,
  (_, colorToken) => colorToken,
  (colorTokenModifications, colorToken) =>
    colorToken.modificationIds.map((id) => colorTokenModifications.byId[id])
);

export const getEditingColorTokensOriginalState = createSelector(
  getEditingColorTokens,
  ({ originalState, allIds }) => allIds.map((id) => originalState[id])
);

const collectModifications = (state, modifications) =>
  modifications.map((modification) => {
    if (modification.type === "mix") {
      const { mixColorId } = modification.params;
      const swatchColor = swatchColorSelectors.getEditingSwatchColorById(
        state,
        mixColorId
      );

      if (swatchColor) {
        return {
          ...modification,
          params: {
            ...modification.params,
            mixColor: swatchColor.hex,
          },
        };
      }
    }

    return modification;
  });

export const getEditingColorTokenModifiedColor = createSelector(
  // prettier-ignore
  [
    (state) => state,
    (_, id) => id,
    getEditingColorTokenById,
  ],
  (state, id, colorToken) => {
    const swatchColor = getEditingColorTokenSwatchColor(state, colorToken);

    if (!swatchColor) {
      return "#ffffff00";
    }

    const modifications = getEditingColorTokenModifications(state, colorToken);

    const collectedModifications = collectModifications(state, modifications);

    const baseColor = swatchColor.hex;
    const modifiedColor = ColorTokenModule.applyModifications(
      baseColor,
      collectedModifications
    );

    return modifiedColor;
  }
);
