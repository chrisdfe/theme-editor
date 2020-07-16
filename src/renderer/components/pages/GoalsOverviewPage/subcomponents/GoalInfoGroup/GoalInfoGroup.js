import React from "react";

import GoalInfo from "../GoalInfo";

import "./GoalInfoGroup.css";

const EmptyBody = () => (
  <div className="GoalInfoGroup__frequency-group-body GoalInfoGroup__frequency-group-body__empty">
    <p>no {frequency} goals</p>
  </div>
);

const GoalInfoGroup = ({ slug, title, goals, onRemoveClicked }) => {
  return (
    <div className="GoalInfoGroup">
      <h3 className="GoalInfoGroup__title">{goalFrequencies[frequency]}</h3>

      {goalsGroupedByFrequency[frequency].length ? (
        <div className="GoalInfoGroup__body">
          {goals.map((goal) => (
            <GoalInfo
              goal={goal}
              key={goal.description}
              onRemoveClicked={onRemoveClicked}
            />
          ))}
        </div>
      ) : (
        <EmptyBody />
      )}
    </div>
  );
};

export default GoalInfoGroup;
