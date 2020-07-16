import * as goalsResource from "common/store/appData/goals";

/*
 * action types
 */

export const SET_GOALS = "SET_GOALS";
export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

/*
 * action creators
 */

export const setGoals = ({ goals }) => {
  return { type: SET_GOALS, goals };
};

export const fetchGoals = () => async (dispatch) => {
  const goals = await goalsResource.fetchGoals();
  dispatch(setGoals({ goals }));
};

export const createGoal = (goalAttrs) => async (dispatch) => {
  const goals = await goalsResource.createGoal(goalAttrs);
  return dispatch(setGoals({ goals }));
};

export const updateGoal = (goalAttrs) => async (dispatch) => {
  const goals = await goalsResource.updateGoal(goalAttrs);
  return dispatch(setGoals({ goals }));
};

// TODO - also delete all goal records to avoid orphans
export const deleteGoal = (goalToDelete) => async (dispatch) => {
  const goals = await goalsResource.deleteGoal(goalToDelete);
  return dispatch(setGoals({ goals }));
};
