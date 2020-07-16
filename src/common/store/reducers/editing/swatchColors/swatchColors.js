import {
  createReducer,
  addEntityById,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/swatchColors/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const swatchColorsReducer = createReducer(initialState, {
  [themeTypes.EDIT_STARTED]: (state, { swatchColors }) => {
    const byId = {
      ...state.byId,
      ...swatchColors.reduce((acc, swatchColor) => {
        return {
          ...acc,
          [swatchColor.id]: swatchColor,
        };
      }, {}),
    };

    const allIds = [...state.allIds, ...swatchColors.map(({ id }) => id)];

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

  [types.ADD_EDITING_SWATCH_COLOR]: (state, { swatchColor }) => {
    console.log("addEntityById(state, swatchColor)", state, swatchColor);
    console.log(addEntityById(state, swatchColor));
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

  // Makes the assumption that there is 1 theme being edited at a time
  [themeTypes.EDIT_CLEARED]: () => {
    return { ...initialState };
  },
});

export default swatchColorsReducer;
