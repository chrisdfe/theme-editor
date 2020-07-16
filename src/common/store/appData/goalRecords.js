import { v4 as uuid } from "uuid";
import appData from "./store";

export const fetchGoalRecords = () => {
  return appData.get("goalRecords", []);
};

export const setGoalRecords = (goalRecords) => {
  appData.set("goalRecords", goalRecords);
  return goalRecords;
};

export const createGoalRecord = (goalRecordAttrs) => {
  const prevGoalRecords = fetchGoalRecords();

  const goal = {
    id: uuid(),
    ...goalRecordAttrs,
  };

  const goalRecords = [...prevGoalRecords, goal];
  setGoalRecords(goalRecords);

  return goalRecords;
};

export const updateGoalRecord = (goalRecordAttrs) => {
  const prevGoalRecords = fetchGoalRecords();

  const goalRecords = prevGoalRecords.map((goalRecord) => {
    if (goalRecord.id === goalRecordAttrs.id) {
      return { ...goalRecord, ...goalRecordAttrs };
    }

    return goalRecord;
  });

  setGoalRecords(goalRecords);
  return goalRecords;
};

export const deleteGoalRecord = (goalRecordToDelete) => {
  const prevGoalRecords = fetchGoalRecords();
  const goalRecords = prevGoalRecords.filter(
    (goal) => goal.id !== goalRecordToDelete.id
  );
  setGoalRecords(goalRecords);
  return goalRecords;
};
