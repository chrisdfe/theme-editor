import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import OverviewPage from "@/components/pages/OverviewPage";
import SettingsPage from "@/components/pages/SettingsPage";
import ThemeEditorPage from "@/components/pages/ThemeEditorPage";
import ThemeFileValidatorPage from "@/components/pages/ThemeFileValidatorPage";
import GoalsOverviewPage from "@/components/pages/GoalsOverviewPage";
import EditGoalPage from "@/components/pages/EditGoalPage";
import DayPage from "@/components/pages/DayPage";
import DesignSystemPage from "@/components/pages/DesignSystemPage";
import VectorEditorPage from "@/components/pages/VectorEditorPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter = ({ children }) => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <OverviewPage />
        </Route>
        <Route exact path="/settings">
          <SettingsPage />
        </Route>
        <Route exact path="/theme-file-validator">
          <ThemeFileValidatorPage />
        </Route>
        <Route exact path="/theme-editor">
          <ThemeEditorPage />
        </Route>
        <Route exact path="/vector-editor">
          <VectorEditorPage />
        </Route>
        <Route exact path="/design-system">
          <DesignSystemPage />
        </Route>
        <Route path="/goals/new">
          <EditGoalPage />
        </Route>
        <Route path="/goals/edit/:id">
          <EditGoalPage />
        </Route>
        <Route path="/goals">
          <GoalsOverviewPage />
        </Route>
        <Route path="/day/:timestamp">
          <DayPage />
        </Route>
      </Switch>
      {children}
    </Router>
  );
};

export default AppRouter;
