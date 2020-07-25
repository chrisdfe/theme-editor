import { mapValues } from "lodash";

import {
  createReducer,
  addEntityById,
  addEntityIdToList,
  updateEntityById,
  updateEntitiesById,
  removeEntityById,
  removeEntitiesById,
  removeEntityIdFromList,
  removeEntityIdsFromList,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
import * as types from "common/store/domains/colorTokens/types";
import * as colorTokenGroupTypes from "common/store/domains/colorTokenGroups/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const themeActionHandlers = {
  [themeTypes.EDIT_STARTED]: (state, { colorTokens }) => {
    const byId = {
      ...colorTokens.reduce((acc, colorToken) => {
        return {
          ...acc,
          [colorToken.id]: colorToken,
        };
      }, {}),
    };

    const allIds = colorTokens.map(({ id }) => id);

    const originalState = colorTokens.reduce((acc, colorToken) => {
      return {
        ...acc,
        [colorToken.id]: colorToken,
      };
    }, {});

    return {
      byId,
      allIds,
      originalState,
    };
  },

  // Makes the assumption that there is 1 theme being edited at a time
  [themeTypes.EDIT_CLEARED]: () => {
    return { ...initialState };
  },
};

const colorTokenActionHandlers = {
  [types.UPDATE_EDITING_COLOR_TOKEN]: (state, { id, attributes }) => {
    const byId = updateEntityById(state.byId, id, attributes);

    return {
      ...state,
      byId,
    };
  },

  [types.ADD_EDITING_COLOR_TOKEN]: (state, { colorToken }) => {
    const byId = addEntityById(state.byId, colorToken);
    const allIds = addEntityIdToList(state.allIds, colorToken);

    return {
      ...state,
      byId,
      allIds,
    };
  },

  [types.REMOVE_EDITING_COLOR_TOKEN]: (state, { id }) => {
    const byId = removeEntityById(state.byId, id);
    const allIds = removeEntityIdFromList(state.allIds, id);

    return {
      ...state,
      byId,
      allIds,
    };
  },
};

const swatchColorActionHandlers = {
  [swatchColorTypes.REMOVE_EDITING_SWATCH_COLOR]: (state, { id }) => {
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

const colorTokenGroupActionHandlers = {
  [colorTokenGroupTypes.REMOVE_EDITING_COLOR_TOKEN_GROUP]: (state, { id }) => {
    console.log("reducer", id);
    const childColorTokenIds = state.allIds.filter((colorTokenId) => {
      return state.byId[colorTokenId].colorTokenGroupId === id;
    });
    console.log("childColorTokenIds", childColorTokenIds);
    const byId = removeEntitiesById(state.byId, childColorTokenIds);
    const allIds = removeEntityIdsFromList(state.allIds, childColorTokenIds);

    return {
      ...state,
      byId,
      allIds,
    };
  },
};

const colorTokensReducer = createReducer(initialState, {
  ...themeActionHandlers,
  ...colorTokenActionHandlers,
  ...swatchColorActionHandlers,
  ...colorTokenGroupActionHandlers,
});

export default colorTokensReducer;
