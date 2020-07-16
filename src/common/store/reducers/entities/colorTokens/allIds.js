import * as types from "common/store/domains/colorTokens/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import { createReducer, addEntityIdsToList } from "common/store/reducerUtils";

const initialState = [];

const colorTokenActionHandlers = {
  [types.SET_COLOR_TOKENS]: (state, { colorTokens }) => {
    return colorTokens.map(({ id }) => id);
  },

  [types.ADD_COLOR_TOKEN]: (state, { colorToken }) => {
    return [...state, colorToken.id];
  },

  [types.ADD_COLOR_TOKENS]: (state, { colorTokens }) => {
    return [...state, ...colorTokens.map(({ id }) => id)];
  },

  [types.REMOVE_COLOR_TOKEN]: (state, { id }) => {
    return state.filter((otherColorTokenId) => otherColorTokenId !== id);
  },

  [types.REMOVE_COLOR_TOKENS]: (state, { ids }) => {
    return state.filter(
      (otherColorTokenId) => !ids.includes(otherColorTokenId)
    );
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { colorTokens }) => {
    return addEntityIdsToList(state, colorTokens);
  },
};

const allIds = createReducer(initialState, {
  ...colorTokenActionHandlers,
  ...themeBundleActionHandlers,
});

export default allIds;
