import React, { useEffect } from "react";

import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, isSameDay, isAfter, isValid } from "date-fns";

import { fetchGoals } from "common/store/domains/goals/actions";
import {
  fetchGoalRecords,
  createGoalRecord,
  updateGoalRecord,
} from "common/store/domains/goalRecords/actions";

import formatDayTimestamp from "common/utils/formatDayTimestamp";

import Navbar from "@/components/lib/Navbar";
import * as Page from "@/components/lib/layout/pages";
import CalendarGrid from "@/components/lib/CalendarGrid";

import GoalEntry from "./subcomponents/GoalEntry";

import "./DayPage.css";

const DayPage = () => {
  const todaysDate = new Date();

  const { timestamp } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchGoalRecords());
  }, []);

  const selectedDate = new Date(timestamp);
  const formattedDate = format(selectedDate, "MMMM d, yyyy");

  // TODO:
  // 1) memoized selector
  const dailyGoals = useSelector((state) =>
    state.goals.filter((goal) => {
      return (
        goal.frequency === "daily" &&
        !isAfter(new Date(goal.startDate), selectedDate)
      );
    })
  );

  const goalRecords = useSelector((state) => state.goalRecords);

  const currentDayRecords = useSelector((state) =>
    state.goalRecords.filter((goalRecord) => {
      return isSameDay(selectedDate, new Date(goalRecord.date));
    })
  );

  return (
    <div className="DayPage">
      <Navbar>
        <Link className="LinkButton" to="/">
          back
        </Link>
      </Navbar>

      <Page.TitleSection>{formattedDate}</Page.TitleSection>

      <Page.Section>
        <CalendarGrid
          todaysDate={todaysDate}
          selectedDate={selectedDate}
          onDateClicked={(date) => {
            const url = `/day/${formatDayTimestamp(date)}`;
            history.push(url);
          }}
        />
      </Page.Section>

      <Page.Section>
        <h3>Daily goals</h3>
        {dailyGoals.map((goal) => {
          const matchingRecord = currentDayRecords.find(
            (record) => record.goalId === goal.id
          );

          return (
            <GoalEntry
              key={goal.id}
              goal={goal}
              goalRecord={matchingRecord}
              onProgressLogged={(amount) => {
                if (matchingRecord) {
                  dispatch(updateGoalRecord({ id: matchingRecord.id, amount }));
                } else {
                  dispatch(
                    createGoalRecord({
                      goalId: goal.id,
                      date: formatDayTimestamp(selectedDate),
                      amount,
                    })
                  );
                }
              }}
            />
          );
        })}
      </Page.Section>
    </div>
  );
};

export default DayPage;
