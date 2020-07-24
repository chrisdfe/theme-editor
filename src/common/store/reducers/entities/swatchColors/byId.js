import { omit, mapValues, reject } from "lodash";

import * as types from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  setEntitiesById,
  addEntityById,
  addEntitiesById,
  updateEntityById,
  updateEntitiesById,
  removeEntityById,
  removeEntitiesById,
} from "common/store/reducerUtils";

export const initialState = {};

const swatchColorActionHandlers = {
  [types.SET_SWATCH_COLORS]: (state, { swatchColors }) => {
    return setEntitiesById(state, swatchColors);
  },

  [types.ADD_SWATCH_COLOR]: (state, { swatchColor }) => {
    return addEntityById(state, swatchColor);
  },

  [types.ADD_SWATCH_COLORS]: (state, { swatchColors }) => {
    return addEntitiesById(state, swatchColors);
  },

  [types.UPDATE_SWATCH_COLOR]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_SWATCH_COLORS]: (state, { swatchColors }) => {
    return updateEntitiesById(state, swatchColors);
  },

  [types.REMOVE_SWATCH_COLOR]: (state, { id }) => {
    return removeEntityById(state, id);
  },

  [types.REMOVE_SWATCH_COLORS]: (state, { ids }) => {
    return removeEntitiesById(state, ids);
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { swatchColors }) => {
    return addEntitiesById(state, swatchColors);
  },

  [themeBundleTypes.ADD_THEME_BUNDLES]: (state, { swatchColors }) => {
    return addEntitiesById(state, swatchColors);
  },

  [themeBundleTypes.UPDATE_THEME_BUNDLE]: (state, { swatchColors }) => {
    const idMap = swatchColors.reduce(
      (acc, swatchColor) => ({ ...acc, [swatchColor.id]: swatchColor }),
      {}
    );
    return updateEntitiesById(state, idMap);
  },
};

const byId = createReducer(initialState, {
  ...swatchColorActionHandlers,
  ...themeBundleActionHandlers,
});

export default byId;
