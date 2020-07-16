import React from "react";
import { Link, useLocation } from "react-router-dom";

import { format } from "date-fns";

import * as GoalModule from "common/store/domains/goals/module";

import Button from "@/components/lib/forms/Button";

import "./GoalInfo.css";

// TODO
// 1) edit button
const GoalInfo = ({ goal, onRemoveClicked }) => {
  const { pathname } = useLocation();

  return (
    <div className="GoalInfo">
      <div className="GoalInfo__body">
        <h4 className="GoalInfo__description">{goal.description}</h4>

        <div className="GoalInfo__attributes">
          <p className="GoalInfo__amount-frequency">
            {GoalModule.getAmountFrequencyText(goal)}
          </p>
          <p className="GoalInfo__start-date">
            starting on {format(new Date(goal.startDate), "M/d/yyyy")}
          </p>
          <p className="GoalInfo__end-date">
            {goal.endDate
              ? `ending on ${format(new Date(goal.startDate), "M/d/yyyy")}`
              : "no end date"}
          </p>
        </div>
      </div>
      <div className="GoalInfo__controls">
        <Link
          className="LinkButton"
          to={`/goals/edit/${goal.id}?fromUrl=${pathname}`}
        >
          edit
        </Link>
        <Button
          onClick={() => {
            onRemoveClicked(goal);
          }}
        >
          remove
        </Button>
      </div>
    </div>
  );
};

export default GoalInfo;
