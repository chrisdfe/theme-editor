import { combineReducers } from "redux";
import { mapValues } from "lodash";

import * as types from "common/store/domains/colorTokenGroups/types";
import * as colorTokenTypes from "common/store/domains/colorTokens/types";
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

const colorTokenGroupActionHandlers = {
  [types.SET_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return setEntitiesById(state, colorTokenGroups);
  },

  [types.ADD_COLOR_TOKEN_GROUP]: (state, { colorTokenGroup }) => {
    return addEntityById(state, colorTokenGroup);
  },

  [types.ADD_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return addEntitiesById(state, colorTokenGroups);
  },

  [types.UPDATE_COLOR_TOKEN_GROUP]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_COLOR_TOKEN_GROUPS]: (state, { colorTokenGroups }) => {
    return updateEntitiesById(state, colorTokenGroups);
  },

  [types.REMOVE_COLOR_TOKEN_GROUP]: (state, { id }) => {
    return removeEntityById(state, id);
  },

  [types.REMOVE_COLOR_TOKEN_GROUPS]: (state, { ids }) => {
    return removeEntitiesById(state, ids);
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
      const colorTokenIds = colorTokenGroup.colorTokenIds.filter(
        (colorTokenId) => colorTokenId !== id
      );

      return {
        ...colorTokenGroup,
        colorTokenIds,
      };
    });
  },

  [colorTokenTypes.REMOVE_COLOR_TOKENS]: (state, { ids }) => {
    return mapValues(state, (colorTokenGroup) => {
      const colorTokenIds = colorTokenGroup.colorTokenIds.filter(
        (id) => !ids.includes(id)
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
    return addEntitiesById(
      state,
      colorTokenGroups.map((colorTokenGroup) => {
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
      })
    );
  },

  [themeBundleTypes.ADD_THEME_BUNDLES]: (
    state,
    { colorTokenGroups, colorTokens }
  ) => {
    return addEntitiesById(
      state,
      colorTokenGroups.map((colorTokenGroup) => {
        const colorTokenIds = colorTokens
          .filter(
            (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
          )
          .map(({ id }) => id);

        return {
          ...colorTokenGroup,
          colorTokenIds,
        };
      })
    );
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
