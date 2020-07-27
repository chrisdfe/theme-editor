import { combineReducers } from "redux";

import { createReducer } from "common/store/reducerUtils";

import byId from "./byId";
import allIds from "./allIds";
import originalState from "./originalState";

const colorTokenModifications = combineReducers({
  byId,
  allIds,
  originalState,
});

export default colorTokenModifications;
