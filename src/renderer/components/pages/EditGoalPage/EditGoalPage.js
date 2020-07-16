import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { format } from "date-fns";

import formatDayTimestamp from "common/utils/formatDayTimestamp";
import parseQueryString from "common/utils/parseQueryString";

import {
  fetchGoals,
  createGoal,
  updateGoal,
} from "common/store/domains/goals/actions";

import Navbar from "@/components/lib/Navbar";
import * as Page from "@/components/lib/layout/pages";

import GoalForm from "@/components/goal-scheduler/GoalForm";

import "./EditGoalPage.css";

const defaultGoal = {
  type: "once",
  frequency: "daily",
  description: "",
  amount: 1,
  amountUnit: "times",
  startDate: formatDayTimestamp(new Date()),
  endDate: "",
};

const createDefaultGoal = () => ({ ...defaultGoal });

const EditGoalPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const goalIsNew = !id;

  const location = useLocation();
  const history = useHistory();
  const { fromUrl } = parseQueryString(location.search);
  const backUrl = fromUrl || /goals/;

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(fetchGoals());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let goal = useSelector((state) =>
    state.goals.find((candidateGoal) => candidateGoal.id === id)
  );

  if (!goal) {
    goal = createDefaultGoal();
  }

  const pageTitle = goalIsNew ? "New Goal" : "Edit Goal";

  return (
    <div className="EditGoalPage">
      <Navbar>
        <Link className="LinkButton" to={`${backUrl}`}>
          back
        </Link>
      </Navbar>

      <Page.TitleSection>{pageTitle}</Page.TitleSection>

      <Page.Section>
        {isLoading && <div>Loading.</div>}
        {!isLoading && (
          <GoalForm
            goal={goal}
            goalIsNew={goalIsNew}
            submitClicked={(goal) => {
              if (goalIsNew) {
                dispatch(createGoal(goal));
              } else {
                dispatch(updateGoal(goal));
              }

              history.push(backUrl);
            }}
          />
        )}
      </Page.Section>
    </div>
  );
};

export default EditGoalPage;
