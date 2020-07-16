import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import formatDayTimestamp from "common/utils/formatDayTimestamp";

import { addGoal, fetchGoals } from "common/store/domains/goals/actions";
import { fetchGoalRecords } from "common/store/domains/goalRecords/actions";

import Navbar from "@/components/lib/Navbar";
import * as Page from "@/components/lib/layout/pages";
import * as Grid from "@/components/lib/layout/grid";
import CalendarGrid from "@/components/lib/CalendarGrid";

import "./OverviewPage.css";

const OverviewPage = () => {
  const todaysDate = new Date();

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchGoalRecords());
  }, []);

  return (
    <div className="OverviewPage">
      <div className="OverviewPage__body">
        <Navbar />

        <Page.TitleSection>{format(todaysDate, "yyyy")}</Page.TitleSection>

        <Page.Section>
          <Grid.Container>
            <div className="OverviewPage__calendar-grid-wrapper">
              <CalendarGrid
                todaysDate={todaysDate}
                onDateClicked={(date) => {
                  const url = `/day/${formatDayTimestamp(date)}`;
                  history.push(url);
                }}
              />
            </div>
          </Grid.Container>
        </Page.Section>

        <Page.Section>
          <Grid.Container>
            <div>
              <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="100"
                  cy="100"
                  r="100"
                  shapeRendering="geometricPrecision"
                />
                <circle cx="320" cy="100" r="100" shapeRendering="crispEdges" />
              </svg>
            </div>
          </Grid.Container>
        </Page.Section>

        <Page.Section>
          <Grid.Container>
            <div className="OverviewPage__goals-link-wrapper">
              <Link className="LinkButton" to="/goals">
                edit goals
              </Link>
              <Link className="LinkButton" to="/settings">
                settings
              </Link>
            </div>

            <div className="OverviewPage__goals-link-wrapper">
              <Link className="LinkButton" to="/theme-editor">
                edit themes
              </Link>
              <Link className="LinkButton" to="/vector-editor">
                edit vector
              </Link>
              <Link className="LinkButton" to="/theme-file-validator">
                validate theme file
              </Link>
            </div>
          </Grid.Container>
        </Page.Section>
      </div>
    </div>
  );
};

export default OverviewPage;
