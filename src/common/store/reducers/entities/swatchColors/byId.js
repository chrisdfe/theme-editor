import { omit, mapValues, reject } from "lodash";

import * as types from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  addEntitiesById,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

export const initialState = {};

const swatchColorActionHandlers = {
  [types.SET_SWATCH_COLORS]: (state, { swatchColors }) => {
    return swatchColors.reduce(
      (acc, swatchColor) => ({ ...acc, [swatchColor.id]: swatchColor }),
      {}
    );
  },

  [types.ADD_SWATCH_COLOR]: (state, { swatchColor }) => {
    return {
      ...state,
      [swatchColor.id]: swatchColor,
    };
  },

  [types.ADD_SWATCH_COLORS]: (state, { swatchColors }) => {
    return {
      ...state,
      ...swatchColors.reduce((acc, swatchColor) => {
        return { ...acc, [swatchColor.id]: swatchColor };
      }, {}),
    };
  },

  [types.UPDATE_SWATCH_COLOR]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_SWATCH_COLORS]: (state, { swatchColors }) => {
    return updateEntitiesById(state, swatchColors);
  },

  [types.REMOVE_SWATCH_COLOR]: (state, { id }) => {
    return omit(state, [id]);
  },

  [types.REMOVE_SWATCH_COLORS]: (state, { ids }) => {
    return omit(state, ids);
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { swatchColors }) => {
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
