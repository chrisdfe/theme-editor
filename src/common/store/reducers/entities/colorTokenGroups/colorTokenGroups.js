import { combineReducers } from "redux";

import byId from "./byId";
import allIds from "./allIds";

const colorTokenGroups = combineReducers({
  byId,
  allIds,
});

export default colorTokenGroups;
