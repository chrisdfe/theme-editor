import { omit, mapValues } from "lodash";
import {
  createReducer,
  addEntityById,
  addEntityIdToList,
  updateEntityById,
  removeEntityById,
  removeEntityIdFromList,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/colorTokenGroups/types";
import * as colorTokenTypes from "common/store/domains/colorTokens/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const themeActionHandlers = {
  // Makes the assumption that there is 1 theme being edited at a time
  [themeTypes.EDIT_CLEARED]: () => {
    return { ...initialState };
  },

  [themeTypes.EDIT_STARTED]: (state, { colorTokenGroups, colorTokens }) => {
    const byId = colorTokenGroups.reduce((acc, colorTokenGroup) => {
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
    }, {});

    const allIds = colorTokenGroups.map(({ id }) => id);

    const originalState = colorTokenGroups.reduce((acc, colorTokenGroup) => {
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
    }, {});

    return {
      byId,
      allIds,
      originalState,
    };
  },
};

const colorTokenGroupActionHandlers = {
  [types.ADD_EDITING_COLOR_TOKEN_GROUP]: (state, { colorTokenGroup }) => {
    const byId = addEntityById(state.byId, colorTokenGroup);

    const allIds = addEntityIdToList(state.allIds, colorTokenGroup);

    return {
      ...state,
      byId,
      allIds,
    };
  },

  [types.UPDATE_EDITING_COLOR_TOKEN_GROUP]: (state, { id, attributes }) => {
    const byId = updateEntityById(state.byId, id, attributes);

    return {
      ...state,
      byId,
    };
  },

  [types.REMOVE_EDITING_COLOR_TOKEN_GROUP]: (state, { id }) => {
    const byId = removeEntityById(state.byId, id);
    const allIds = removeEntityIdFromList(state.allIds, id);

    return {
      ...state,
      byId,
      allIds,
    };
  },
};

const colorTokenActionHandlers = {
  [colorTokenTypes.ADD_EDITING_COLOR_TOKEN]: (state, { colorToken }) => {
    const byId = mapValues(state.byId, (colorTokenGroup) => {
      if (colorToken.colorTokenGroupId === colorTokenGroup.id) {
        const { colorTokenIds } = colorTokenGroup;
        return {
          ...colorTokenGroup,
          colorTokenIds: [...colorTokenIds, colorToken.id],
        };
      }

      return colorTokenGroup;
    });

    return {
      ...state,
      byId,
    };
  },

  [colorTokenTypes.REMOVE_EDITING_COLOR_TOKEN]: (state, { id }) => {
    const byId = mapValues(state.byId, (colorTokenGroup) => {
      const colorTokenIds = colorTokenGroup.colorTokenIds.filter(
        (colorTokenId) => colorTokenId !== id
      );

      return {
        ...colorTokenGroup,
        colorTokenIds,
      };
    });

    return {
      ...state,
      byId,
    };
  },
};

const colorTokenGroupsReducer = createReducer(initialState, {
  ...themeActionHandlers,
  ...colorTokenGroupActionHandlers,
  ...colorTokenActionHandlers,
});

export default colorTokenGroupsReducer;
