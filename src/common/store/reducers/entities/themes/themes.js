import { combineReducers } from "redux";

import byId from "./byId";
import allIds from "./allIds";

const themes = combineReducers({
  byId,
  allIds,
});

export default themes;
