import { combineReducers } from "redux";

import byId from "./byId";
import allIds from "./allIds";

const swatches = combineReducers({
  byId,
  allIds,
});

export default swatches;
