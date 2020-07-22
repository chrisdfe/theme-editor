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
      [theme.id]: theme,
    };

    const allIds = [theme.id];

    const originalState = {
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

  [types.UPDATE_EDITED_THEME]: (state, { id, attributes }) => {
    const byId = updateEntityById(state.byId, id, attributes);
    return {
      ...state,
      byId,
    };
  },
});

export default themesReducer;
