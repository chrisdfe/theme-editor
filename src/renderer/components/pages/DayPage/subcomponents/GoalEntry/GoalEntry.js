import React, { useState } from "react";

import * as GoalModule from "common/store/domains/goals/module";

import Button from "@/components/lib/forms/Button";

import ProgressLogger from "../ProgressLogger";

import "./GoalEntry.css";

// TODO - put in utils
const getPercentage = (amount, total) => Math.floor((amount / total) * 100);

const GoalEntry = ({ goal, goalRecord, onProgressLogged }) => {
  const id = `goal-${goal.id}`;

  const [progressLoggerIsOpen, setProgressLoggerIsOpen] = useState(false);

  const loggedAmount = goalRecord ? goalRecord.amount : 0;

  return (
    <div className="GoalEntry">
      <h4 className="GoalEntry__description">
        {goal.description}

        <span className="GoalEntry__amount-frequency-text">
          {/* TODO - remove toLowerCase */}
          {GoalModule.getAmountFrequencyText(goal).toLowerCase()}
        </span>
      </h4>

      <div className="GoalEntry__completion-info">
        Completed {loggedAmount}/{goal.amount} (
        {getPercentage(loggedAmount, goal.amount)}%)
      </div>

      <div className="GoalEntry__progress-button-wrapper">
        <Button
          onClick={() => {
            setProgressLoggerIsOpen(!progressLoggerIsOpen);
          }}
        >
          Log progress
        </Button>
      </div>

      {progressLoggerIsOpen && (
        <div className="GoalEntry__progress-logger-wrapper">
          <ProgressLogger
            goal={goal}
            goalRecord={goalRecord}
            onProgressLogged={(amount) => {
              setProgressLoggerIsOpen(false);
              onProgressLogged(amount);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GoalEntry;
