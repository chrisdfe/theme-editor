import {
  createReducer,
  addEntityById,
  updateEntityById,
  updateEntitiesById,
  removeEntityById,
  removeEntityIdFromList,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/swatchColors/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const themeActionHandlers = {
  [themeTypes.EDIT_STARTED]: (state, { swatchColors }) => {
    const byId = swatchColors.reduce((acc, swatchColor) => {
      return {
        ...acc,
        [swatchColor.id]: swatchColor,
      };
    }, {});

    const allIds = swatchColors.map(({ id }) => id);

    const originalState = swatchColors.reduce((acc, swatchColor) => {
      return {
        ...acc,
        [swatchColor.id]: swatchColor,
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

const swatchColorsActionHandlers = {
  [types.ADD_EDITING_SWATCH_COLOR]: (state, { swatchColor }) => {
    const byId = addEntityById(state.byId, swatchColor);
    const allIds = [...state.allIds, swatchColor.id];
    return { ...state, byId, allIds };
  },

  [types.UPDATE_EDITING_SWATCH_COLOR]: (state, { id, attributes }) => {
    const byId = updateEntityById(state.byId, id, attributes);

    return {
      ...state,
      byId,
    };
  },

  [types.REMOVE_EDITING_SWATCH_COLOR]: (state, { id }) => {
    const byId = removeEntityById(state.byId, id);
    const allIds = removeEntityIdFromList(state.allIds, id);

    return {
      ...state,
      byId,
      allIds,
    };
  },
};

const swatchColorsReducer = createReducer(initialState, {
  ...themeActionHandlers,
  ...swatchColorsActionHandlers,
});

export default swatchColorsReducer;
