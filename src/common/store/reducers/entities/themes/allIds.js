import { omit, mapValues } from "lodash";

import * as types from "common/store/domains/themes/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  addEntityIdToList,
  addEntityIdsToList,
} from "common/store/reducerUtils";

const allIds = createReducer([], {
  [types.SET_THEME]: (state, { theme }) => {
    return [...state, theme.id];
  },

  [types.SET_THEMES]: (state, { themes }) => {
    return themes.map(({ id }) => id);
  },

  [types.ADD_THEME]: (state, { theme }) => {
    return addEntityIdToList(state, theme);
  },

  [types.ADD_THEMES]: (state, { themes }) => {
    return addEntityIdsToList(state, themes);
  },

  [types.REMOVE_THEME]: (state, { id }) => {
    return state.filter((otherThemeId) => otherThemeId !== id);
  },

  [types.REMOVE_THEMES]: (state, { ids }) => {
    return state.filter((otherThemeId) => !ids.includes(otherThemeId));
  },

  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { theme }) => {
    return addEntityIdToList(state, theme);
  },

  [themeBundleTypes.ADD_THEME_BUNDLES]: (state, { themes }) => {
    return addEntityIdsToList(state, themes);
  },
});

export default allIds;
