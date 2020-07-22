import { omit, mapValues, reject } from "lodash";

import * as types from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import { createReducer, addEntityIdsToList } from "common/store/reducerUtils";

const initialState = [];

const swatchColorActionHandlers = {
  [types.SET_SWATCH_COLORS]: (state, { swatchColors }) => {
    return swatchColors.map(({ id }) => id);
  },

  [types.ADD_SWATCH_COLOR]: (state, { swatchColor }) => {
    return [...state, swatchColor.id];
  },

  [types.ADD_SWATCH_COLORS]: (state, { swatchColors }) => {
    return [...state, ...swatchColors.map(({ id }) => id)];
  },

  [types.REMOVE_SWATCH_COLOR]: (state, { id }) => {
    return state.filter((otherSwatchColorId) => otherSwatchColorId !== id);
  },

  [types.REMOVE_SWATCH_COLORS]: (state, { ids }) => {
    return reject(state, (id) => ids.includes(id));
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { swatchColors }) => {
    return addEntityIdsToList(state, swatchColors);
  },

  [themeBundleTypes.ADD_THEME_BUNDLES]: (state, { swatchColors }) => {
    return addEntityIdsToList(state, swatchColors);
  },
};

const allIds = createReducer(initialState, {
  ...swatchColorActionHandlers,
  ...themeBundleActionHandlers,
});

export default allIds;
