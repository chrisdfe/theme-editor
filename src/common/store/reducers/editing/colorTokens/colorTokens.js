import {
  createReducer,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/colorTokens/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const colorTokensReducer = createReducer(initialState, {
  [themeTypes.EDIT_STARTED]: (state, { colorTokens }) => {
    const byId = {
      ...state.byId,
      ...colorTokens.reduce((acc, colorToken) => {
        return {
          ...acc,
          [colorToken.id]: colorToken,
        };
      }, {}),
    };

    const allIds = [...state.allIds, ...colorTokens.map(({ id }) => id)];

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

  [types.UPDATE_EDITING_COLOR_TOKEN]: (state, { id, attributes }) => {
    const byId = updateEntityById(state.byId, id, attributes);

    return {
      ...state,
      byId,
    };
  },
});

export default colorTokensReducer;
