import { format } from "date-fns";

import {
  SET_GOAL_RECORDS,
  ADD_GOAL_RECORD,
  REMOVE_GOAL_RECORD,
} from "common/store/domains/goalRecords/actions";

import { createReducer } from "./utils";

const initialState = [];

const handlers = {
  [SET_GOAL_RECORDS]: (state, { goalRecords }) => {
    return [...goalRecords];
  },

  [ADD_GOAL_RECORD]: (state, params) => {
    const { goalId, date } = params;

    return [
      ...state,
      {
        ...params,
      },
    ];
  },

  [REMOVE_GOAL_RECORD]: (state, params) => {
    const { id } = params;
    return state.filter((goalRecord) => goalRecord.id !== params.id);
  },
};

const goalRecords = createReducer(initialState, handlers);

export default goalRecords;
