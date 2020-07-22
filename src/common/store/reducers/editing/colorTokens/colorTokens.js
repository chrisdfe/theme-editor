import { mapValues } from "lodash";

import {
  createReducer,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
import * as types from "common/store/domains/colorTokens/types";

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

const colorTokensReducer = createReducer(initialState, {
  ...themeActionHandlers,
  ...colorTokenActionHandlers,
  ...swatchColorActionHandlers,
});

export default colorTokensReducer;
