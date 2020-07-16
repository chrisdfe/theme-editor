import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  createGoal,
  fetchGoals,
  deleteGoal,
} from "common/store/domains/goals/actions";
import { fetchGoalRecords } from "common/store/domains/goalRecords/actions";

import Navbar from "@/components/lib/Navbar";
import * as Page from "@/components/lib/layout/pages";

import GoalInfo from "./subcomponents/GoalInfo";

import "./GoalsOverviewPage.css";

// TODO - put in GoalModule
const goalFrequencies = ["daily", "weekly", "monthly"];

const GoalsOverview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchGoalRecords());
  }, []);

  const [goalsFormIsOpen, setGoalsFormIsOpen] = useState(false);

  // TODO - memoized selector
  const goalGroups = useSelector((state) => {
    const { goals } = state;

    const goalsGroupedByFrequency = goalFrequencies.map((frequency) => {
      return {
        title: frequency,
        goals: goals.filter(
          (goal) => goal.type === "recurring" && goal.frequency === frequency
        ),
      };
    });

    const oneTimeGoalsGroup = {
      title: "one-time",
      goals: goals.filter((goal) => goal.type === "one-time"),
    };

    return [...goalsGroupedByFrequency, oneTimeGoalsGroup];
  });

  // (goal) => {
  //   // TODO - modal confirmation
  //   dispatch(deleteGoal(goal));
  // }

  return (
    <div className="GoalsOverviewPage">
      <Navbar>
        <Link className="LinkButton" to="/">
          back
        </Link>
      </Navbar>

      <Page.TitleSection>Your Goals</Page.TitleSection>

      <Page.Section>
        <section className="GoalsOverviewPage__goal-groups-section">
          {goalGroups.map(({ title, goals }) => (
            <div className="GoalsOverviewPage__goal-group" key={title}>
              <h3 className="GoalsOverviewPage__goal-group__title">{title}</h3>

              {goals.length ? (
                <div className="GoalsOverviewPage__goal-group__body">
                  {goals.map((goal) => (
                    <GoalInfo
                      goal={goal}
                      key={goal.description}
                      onRemoveClicked={(goal) => {
                        // TODO - modal confirmation
                        dispatch(deleteGoal(goal));
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="GoalsOverviewPage__goal-group__body GoalsOverviewPage__goal-group__body--empty">
                  <p>no {title} goals</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </Page.Section>

      <Page.Section>
        <section className="GoalsOverviewPage__add-goal-section">
          <Link className="LinkButton" to="/goals/new/">
            add new goal
          </Link>
        </section>
      </Page.Section>
    </div>
  );
};

export default GoalsOverview;
