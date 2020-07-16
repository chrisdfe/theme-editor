import { combineReducers } from "redux";

import byId from "./byId";
import allIds from "./allIds";

const colorTokens = combineReducers({
  byId,
  allIds,
});

export default colorTokens;
