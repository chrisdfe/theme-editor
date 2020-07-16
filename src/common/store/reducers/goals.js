import {
  SET_GOALS,
  ADD_GOAL,
  REMOVE_GOAL,
} from "common/store/domains/goals/actions";

import { createReducer } from "./utils";

const initialState = [];

const handlers = {
  [SET_GOALS]: (state, { goals }) => {
    return [...goals];
  },

  [ADD_GOAL]: (state, { goal }) => {
    return [
      ...state,
      {
        ...goal,
      },
    ];
  },

  [REMOVE_GOAL]: (state, params) => {
    const { id } = params.goal;
    return state.filter((goal) => goal.id !== id);
  },
};

const goals = createReducer(initialState, handlers);

export default goals;
