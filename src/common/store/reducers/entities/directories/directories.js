import { combineReducers } from "redux";

import byId from "./byId";
import allIds from "./allIds";

const directories = combineReducers({
  byId,
  allIds,
});

export default directories;
