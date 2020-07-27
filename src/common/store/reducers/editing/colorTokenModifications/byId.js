import {
  createReducer,
  addEntityById,
  updateEntityById,
  removeEntityById,
} from "common/store/reducerUtils";

import * as types from "common/store/domains/colorTokenModifications/types";

const initialState = {};

const colorTokenModificationHandlers = {
  [types.ADD_EDITING_COLOR_TOKEN_MODIFICATION]: (
    state,
    { colorTokenModification }
  ) => {
    return addEntityById(state, colorTokenModification);
  },

  [types.UPDATE_EDITING_COLOR_TOKEN_MODIFICATION]: (
    state,
    { id, attributes }
  ) => {
    return updateEntityById(state, id, attributes);
  },

  [types.REMOVE_EDITING_COLOR_TOKEN_MODIFICATION]: (state, { id }) => {
    return removeEntityById(state, id);
  },
};

const byId = createReducer(initialState, {
  ...colorTokenModificationHandlers,
});

export default byId;
