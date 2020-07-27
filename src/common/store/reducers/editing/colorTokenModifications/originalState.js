import { createReducer } from "common/store/reducerUtils";

import * as types from "common/store/domains/colorTokenModifications/types";

const initialState = {};

const colorTokenModificationHandlers = {
  [types.ADD_EDITING_COLOR_TOKEN_MODIFICATION]: (state) => state,
  [types.UPDATE_EDITING_COLOR_TOKEN_MODIFICATION]: (state) => state,
  [types.REMOVE_EDITING_COLOR_TOKEN_MODIFICATION]: (state) => state,
};

const originalState = createReducer(initialState, {
  ...colorTokenModificationHandlers,
});

export default originalState;
