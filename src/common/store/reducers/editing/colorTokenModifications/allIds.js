import {
  createReducer,
  addEntityIdToList,
  removeEntityIdFromList,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/colorTokenModifications/types";

const initialState = [];

const colorTokenModificationHandlers = {
  [types.ADD_EDITING_COLOR_TOKEN_MODIFICATION]: (
    state,
    { colorTokenModification }
  ) => {
    return addEntityIdToList(state, colorTokenModification);
  },

  [types.REMOVE_EDITING_COLOR_TOKEN_MODIFICATION]: (state, { id }) => {
    return removeEntityIdFromList(state, id);
  },
};

/*
const themeTypeHandlers = {
  [themeTypes.EDIT_STARTED]: (state) => {
    return { ...initialState };
  },

  // Makes the assumption that there is 1 theme being edited at a time
  [themeTypes.EDIT_CLEARED]: () => {
    return { ...initialState };
  },
};
*/

const allIds = createReducer(initialState, {
  ...colorTokenModificationHandlers,
});

export default allIds;
