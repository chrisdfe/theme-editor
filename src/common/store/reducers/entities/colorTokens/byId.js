import { combineReducers } from "redux";
import { omit, mapValues, isEmpty } from "lodash";

import * as types from "common/store/domains/colorTokens/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
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

const initialState = {};

const colorTokenActionHandlers = {
  [types.SET_COLOR_TOKENS]: (state, { colorTokens }) => {
    return setEntitiesById(state, colorTokens);
  },

  [types.ADD_COLOR_TOKEN]: (state, { colorToken }) => {
    return addEntityById(state, colorToken);
  },

  [types.ADD_COLOR_TOKENS]: (state, { colorTokens }) => {
    return addEntitiesById(state, colorTokens);
  },

  [types.UPDATE_COLOR_TOKEN]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_COLOR_TOKENS]: (state, { colorTokens }) => {
    return updateEntitiesById(state, colorTokens);
  },

  [types.REMOVE_COLOR_TOKEN]: (state, { id }) => {
    return removeEntityById(state, id);
  },

  [types.REMOVE_COLOR_TOKENS]: (state, { ids }) => {
    return removeEntitiesById(state, ids);
  },
};

const swatchColorActionHandlers = {
  [swatchColorTypes.REMOVE_SWATCH_COLOR]: (state, { id }) => {
    return mapValues(state, (colorToken) => {
      if (colorToken.swatchColorId === id) {
        return {
          ...colorToken,
          swatchColorId: null,
        };
      }
      return colorToken;
    });
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { colorTokens }) => {
    return addEntitiesById(state, colorTokens);
  },

  [themeBundleTypes.ADD_THEME_BUNDLES]: (state, { colorTokens }) => {
    return addEntitiesById(state, colorTokens);
  },

  [themeBundleTypes.UPDATE_THEME_BUNDLE]: (state, { colorTokens }) => {
    const idMap = colorTokens.reduce(
      (acc, colorToken) => ({
        ...acc,
        [colorToken.id]: colorToken,
      }),
      {}
    );
    return updateEntitiesById(state, idMap);
  },
};

const byId = createReducer(initialState, {
  ...colorTokenActionHandlers,
  ...swatchColorActionHandlers,
  ...themeBundleActionHandlers,
});

export default byId;
