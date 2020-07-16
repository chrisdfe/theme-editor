import { combineReducers, reduceReducers } from "redux";

import entities from "./entities";
import editing from "./editing";

const combinedReducers = combineReducers({
  entities,
  editing,
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

export default rootReducer;
