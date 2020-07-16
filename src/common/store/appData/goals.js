import { v4 as uuid } from "uuid";
import appData from "./store";

export const fetchGoals = () => {
  return appData.get("goals", []);
};

export const setGoals = (goals) => {
  appData.set("goals", goals);
  return goals;
};

export const createGoal = (goalAttrs) => {
  const prevGoals = fetchGoals();

  const goal = {
    id: uuid(),
    ...goalAttrs,
  };

  const goals = [...prevGoals, goal];
  setGoals(goals);
  return goals;
};

export const updateGoal = (goalAttrs) => {
  const prevGoals = fetchGoals();

  const goals = prevGoals.map((prevGoal) => {
    if (prevGoal.id === goalAttrs.id) {
      return { ...prevGoal, ...goalAttrs };
    }
    return prevGoal;
  });

  setGoals(goals);
  return goals;
};

export const deleteGoal = (goalToDelete) => {
  const prevGoals = fetchGoals();
  const goals = prevGoals.filter((goal) => goal.id !== goalToDelete.id);
  setGoals(goals);
  return goals;
};
