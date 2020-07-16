import * as goalRecordsResource from "common/store/appData/goalRecords";

/*
 * action types
 */

export const ADD_GOAL_RECORD = "ADD_GOAL_RECORD";
export const REMOVE_GOAL_RECORD = "REMOVE_GOAL_RECORD";
export const TOGGLE_GOAL_RECORD = "TOGGLE_GOAL_RECORD";
export const SET_GOAL_RECORDS = "SET_GOAL_RECORDS";

/*
 * action creators
 */

export const setGoalRecords = (goalRecords) => {
  return { type: SET_GOAL_RECORDS, goalRecords };
};

export const fetchGoalRecords = () => async (dispatch) => {
  const goalRecords = await goalRecordsResource.fetchGoalRecords();
  return dispatch(setGoalRecords(goalRecords));
};

export const createGoalRecord = (goalRecordAttrs) => async (dispatch) => {
  const goalRecords = await goalRecordsResource.createGoalRecord(
    goalRecordAttrs
  );
  return dispatch(setGoalRecords(goalRecords));
};

export const updateGoalRecord = (goalRecordAttrs) => async (dispatch) => {
  const goalRecords = await goalRecordsResource.updateGoalRecord(
    goalRecordAttrs
  );
  return dispatch(setGoalRecords(goalRecords));
};

export const deleteGoalRecord = (goalRecordToDelete) => async (dispatch) => {
  const goalRecords = await goalRecordsResource.deleteGoalRecord(
    goalRecordToDelete
  );
  return dispatch(setGoalRecords(goalRecords));
};
