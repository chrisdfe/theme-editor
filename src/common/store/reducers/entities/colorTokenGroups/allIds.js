import * as types from "common/store/domains/colorTokenGroups/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import { createReducer, addEntityIdsToList } from "common/store/reducerUtils";

const initialState = [];

const colorTokenGroupActionHandlers = {
  [types.SET_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return colorTokenGroups.map(({ id }) => id);
  },

  [types.ADD_COLOR_TOKEN_GROUP]: (state, { colorTokenGroup }) => {
    return [...state, colorTokenGroup.id];
  },

  [types.ADD_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return [...state, ...colorTokenGroups.map(({ id }) => id)];
  },

  [types.REMOVE_COLOR_TOKEN_GROUP]: (state, { id }) => {
    return state.filter((otherColorTokenId) => otherColorTokenId !== id);
  },

  [types.REMOVE_COLOR_TOKEN_GROUPS]: (state, { ids }) => {
    return state.filter(
      (otherColorTokenId) => !ids.includes(otherColorTokenId)
    );
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { colorTokenGroups }) => {
    return addEntityIdsToList(state, colorTokenGroups);
  },
};

const allIds = createReducer(initialState, {
  ...colorTokenGroupActionHandlers,
  ...themeBundleActionHandlers,
});

export default allIds;
