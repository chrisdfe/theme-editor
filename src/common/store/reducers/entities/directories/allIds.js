import * as types from "common/store/domains/directories/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  addEntityIdToList,
  addEntityIdsToList,
} from "common/store/reducerUtils";

export const initialState = [];

const allIds = createReducer(initialState, {
  [types.ADD_DIRECTORY]: (state, { directory }) => {
    return addEntityIdToList(state, directory);
  },

  [types.ADD_DIRECTORIES]: (state, { directories }) => {
    return addEntityIdsToList(state, directories);
  },
});

export default allIds;
