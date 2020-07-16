import { combineReducers, reduceReducers } from "redux";

import goals from "./goals";
import goalRecords from "./goalRecords";

import entities from "./entities";
import editing from "./editing";

const combinedReducers = combineReducers({
  goals,
  goalRecords,
  entities,
  editing,
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

export default rootReducer;
