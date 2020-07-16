import * as types from "common/store/domains/swatches/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import { createReducer, addEntityIdToList } from "common/store/reducerUtils";

const initialState = [];

const swatchActionHandlers = {
  [types.SET_SWATCHES]: (state, { swatches }) => {
    return swatches.map(({ id }) => id);
  },

  [types.ADD_SWATCH]: (state, { swatch }) => {
    return [...state, swatch.id];
  },

  [types.ADD_SWATCHES]: (state, { swatches }) => {
    return [...state, ...swatches.map(({ id }) => id)];
  },

  [types.REMOVE_SWATCH]: (state, { id }) => {
    return state.filter((otherSwatchId) => otherSwatchId !== id);
  },

  [types.REMOVE_SWATCHES]: (state, { ids }) => {
    return state.filter((otherSwatchId) => !ids.includes(otherSwatchId));
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { swatch }) => {
    return addEntityIdToList(state, swatch);
  },
};
const allIds = createReducer(initialState, {
  ...swatchActionHandlers,
  ...themeBundleActionHandlers,
});

export default allIds;
