import React, { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { format, isSameDay, isValid } from "date-fns";

import { createGoal } from "common/store/domains/goals/actions";

import FormGroup from "@/components/lib/forms/FormGroup";
import TextInput from "@/components/lib/forms/TextInput";
import RadioGroup from "@/components/lib/forms/RadioGroup";
import Button from "@/components/lib/forms/Button";
import Select from "@/components/lib/forms/Select";

import "./GoalForm.css";

// TODO -
// 1) add 'goal' param to enable edit functionality
const GoalForm = ({ goal, goalIsNew, submitClicked }) => {
  const formRef = useRef();

  const [internalGoal, setInternalGoal] = useState({ ...goal });

  return (
    <div className="GoalForm">
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <TextInput
          label="description"
          id="goal-description"
          value={internalGoal.description}
          onChange={(e) => {
            // TODO - if internalGoal.type is 'once' then remove frequency
            setInternalGoal({
              ...internalGoal,
              description: e.target.value,
            });
          }}
        />

        <RadioGroup
          id="goal-type"
          label="type"
          currentValue={internalGoal.type}
          onChange={(value) => {
            setInternalGoal({ ...internalGoal, type: value });
          }}
          options={[
            { id: "one-time", value: "one-time", label: "One-time" },
            { id: "recurring", value: "recurring", label: "Recurring" },
          ]}
        />

        {internalGoal.type === "recurring" && (
          <RadioGroup
            id="goal-frequency"
            label="frequency"
            currentValue={internalGoal.frequency}
            onChange={(value) => {
              setInternalGoal({ ...internalGoal, frequency: value });
            }}
            options={[
              { id: "daily", value: "daily", label: "Daily" },
              { id: "weekly", value: "weekly", label: "Weekly" },
              { id: "monthly", value: "monthly", label: "Monthly" },
            ]}
          />
        )}

        {/* TODO - separate 'NumberInput' component */}
        <TextInput
          id="goal-amount"
          label="amount"
          value={internalGoal.amount}
          type="number"
          onChange={(e) => {
            setInternalGoal({ ...internalGoal, amount: e.target.value });
          }}
        />

        <Select
          id="goal-amount-unit"
          label="amount unit"
          options={[
            { value: "times", label: "Times" },
            { value: "minutes", label: "Minutes" },
            { value: "hours", label: "Hours" },
          ]}
          value={internalGoal.amountUnit}
          onChange={(amountUnit) => {
            setInternalGoal({ ...internalGoal, amountUnit });
          }}
        />

        <TextInput
          id="goal-start-date"
          label="start date"
          value={internalGoal.startDate}
          onChange={(value) => {
            setInternalGoal({ ...internalGoal, startDate: value });
          }}
        />

        {internalGoal.type === "recurring" && (
          <TextInput
            id="goal-end-date"
            label="end date"
            value={internalGoal.endDate}
            onChange={(e) => {
              setInternalGoal({ ...internalGoal, endDate: e.target.value });
            }}
          />
        )}

        <Button
          id="goal-submit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            // TODO
            // 1) validation
            // 2) confirmation modal
            if (submitClicked) {
              submitClicked(internalGoal);
            }
          }}
        >
          {goalIsNew ? "Create goal" : "Update goal"}
        </Button>
      </form>
    </div>
  );
};

GoalForm.defaultProps = {
  goalIsNew: true,
};

export default GoalForm;
