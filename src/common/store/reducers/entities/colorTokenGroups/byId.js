import { combineReducers } from "redux";
import { omit, reject, mapValues, isEmpty } from "lodash";

import * as types from "common/store/domains/colorTokenGroups/types";
import * as colorTokenTypes from "common/store/domains/colorTokens/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  addEntitiesById,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

const initialState = {};

const colorTokenGroupActionHandlers = {
  [types.SET_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return colorTokenGroups.reduce((acc, colorTokenGroup) => {
      return {
        ...acc,
        [colorTokenGroup.id]: colorTokenGroup,
      };
    }, {});
  },

  [types.ADD_COLOR_TOKEN_GROUP]: (state, { colorTokenGroup }) => {
    return {
      ...state,
      [colorTokenGroup.id]: colorTokenGroup,
    };
  },

  [types.ADD_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return {
      ...state,
      ...colorTokenGroups.reduce(
        (acc, colorTokenGroup) => ({
          ...acc,
          [colorTokenGroup.id]: colorTokenGroup,
        }),
        {}
      ),
    };
  },

  [types.UPDATE_COLOR_TOKEN_GROUP]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return updateEntitiesById(state, colorTokenGroups);
  },

  [types.REMOVE_COLOR_TOKEN_GROUP]: (state, { id }) => {
    return omit(state, id);
  },

  [types.REMOVE_COLOR_TOKEN_GROUPS]: (state, { ids }) => {
    return omit(state, ids);
  },
};

const colorTokenActionHandlers = {
  [colorTokenTypes.ADD_COLOR_TOKEN]: (state, { colorToken }) => {
    return mapValues(state, (colorTokenGroup) => {
      if (colorToken.colorTokenGroupId === colorTokenGroup.id) {
        const { colorTokenIds } = colorTokenGroup;
        return {
          ...colorTokenGroup,
          colorTokenIds: [...colorTokenIds, colorToken.id],
        };
      }

      return colorTokenGroup;
    });
  },

  [colorTokenTypes.ADD_COLOR_TOKENS]: (state, { colorTokens }) => {
    return mapValues(state, (colorTokenGroup) => {
      const newColorTokenIds = colorTokens
        .filter(
          (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
        )
        .map(({ id }) => id);

      return {
        ...colorTokenGroup,
        colorTokenIds: [...colorTokenGroup.colorTokenIds, ...newColorTokenIds],
      };
    });
  },

  [colorTokenTypes.REMOVE_COLOR_TOKEN]: (state, { id }) => {
    return mapValues(state, (colorTokenGroup) => {
      const colorTokenIds = reject(
        colorTokenGroup.colorTokenIds,
        (colorTokenId) => colorTokenId === id
      );

      return {
        ...colorTokenGroup,
        colorTokenIds,
      };
    });
  },

  [colorTokenTypes.REMOVE_COLOR_TOKENS]: (state, { ids }) => {
    return mapValues(state, (colorTokenGroup) => {
      const colorTokenIds = reject(colorTokenGroup.colorTokenIds, (id) =>
        ids.includes(id)
      );

      return {
        ...colorTokenGroup,
        colorTokenIds,
      };
    });
  },
};

const themeBundleActionHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (
    state,
    { colorTokenGroups, colorTokens }
  ) => {
    return {
      ...state,
      ...colorTokenGroups.reduce((acc, colorTokenGroup) => {
        const colorTokenGroupColorTokens = colorTokens.filter(
          (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
        );
        const colorTokenIds = colorTokenGroupColorTokens.map(({ id }) => id);

        return {
          ...acc,
          [colorTokenGroup.id]: {
            ...colorTokenGroup,
            colorTokenIds,
          },
        };
      }, {}),
    };
  },

  [themeBundleTypes.UPDATE_THEME_BUNDLE]: (state, { colorTokenGroups }) => {
    const idMap = colorTokenGroups.reduce(
      (acc, colorTokenGroup) => ({
        ...acc,
        [colorTokenGroup.id]: colorTokenGroup,
      }),
      {}
    );
    return updateEntitiesById(state, idMap);
  },
};

const byId = createReducer(initialState, {
  ...colorTokenGroupActionHandlers,
  ...colorTokenActionHandlers,
  ...themeBundleActionHandlers,
});

export default byId;
