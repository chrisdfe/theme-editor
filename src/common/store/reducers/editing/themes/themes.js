import {
  createReducer,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

import * as types from "common/store/domains/themes/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const themesReducer = createReducer(initialState, {
  [types.EDIT_STARTED]: (state, { theme }) => {
    const byId = {
      ...state.byId,
      [theme.id]: theme,
    };

    const allIds = [...state.allIds, theme.id];

    const originalState = {
      ...state.originalState,
      [theme.id]: theme,
    };

    return {
      byId,
      allIds,
      originalState,
    };
  },

  // Makes the assumption that there is 1 theme being edited at a time
  [types.EDIT_CLEARED]: () => {
    return { ...initialState };
  },
});

export default themesReducer;