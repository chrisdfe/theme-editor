import * as types from "common/store/domains/directories/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import { createReducer, addEntitiesById } from "common/store/reducerUtils";

export const initialState = {};

const byId = createReducer(initialState, {
  [types.ADD_DIRECTORY]: (state, { directory }) => {
    return addEntityById(state, directory);
  },

  [types.ADD_DIRECTORIES]: (state, { directories }) => {
    return addEntitiesById(state, directories);
  },
});

export default byId;
