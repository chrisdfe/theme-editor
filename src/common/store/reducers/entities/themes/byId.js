import { combineReducers } from "redux";
import { omit, mapValues, isEmpty } from "lodash";

import * as types from "common/store/domains/themes/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  addEntityById,
  addEntitiesById,
  updateEntityById,
  updateEntitiesById,
  removeEntityById,
  removeEntitiesById,
} from "common/store/reducerUtils";

const initialState = {};

const themeActionHandlers = {
  [types.SET_THEME]: (state, { theme }) => {
    return {
      ...state,
      [theme.id]: theme,
    };
  },

  [types.SET_THEMES]: (state, { themes }) => {
    return themes.reduce((acc, theme) => {
      return {
        ...acc,
        [theme.id]: theme,
      };
    }, {});
  },

  [types.ADD_THEME]: (state, { theme }) => {
    return addEntityById(state, theme);
  },

  [types.ADD_THEMES]: (state, { themes }) => {
    return addEntitiesById(state, themes);
  },

  [types.UPDATE_THEME]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_THEMES]: (state, { themes }) => {
    return updateEntitiesById(state, themes);
  },

  [types.REMOVE_THEME]: (state, { id }) => {
    return removeEntityById(state, id);
  },

  [types.REMOVE_THEMES]: (state, { ids }) => {
    return removeEntitiesById(state, ids);
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { theme }) => {
    return addEntityById(state, theme);
  },

  [themeBundleTypes.UPDATE_THEME_BUNDLE]: (state, { theme }) => {
    return updateEntityById(state, theme.id, theme);
  },
};

const byId = createReducer(initialState, {
  ...themeActionHandlers,
  ...themeBundleActionHandlers,
});

export default byId;
