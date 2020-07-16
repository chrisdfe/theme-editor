import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import ThemeEditorPage from "@/components/pages/ThemeEditorPage";
import ThemeFileValidatorPage from "@/components/pages/ThemeFileValidatorPage";
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
          <ThemeEditorPage />
        </Route>
        <Route exact path="/theme-file-validator">
          <ThemeFileValidatorPage />
        </Route>
        <Route exact path="/vector-editor">
          <VectorEditorPage />
        </Route>
        <Route exact path="/design-system">
          <DesignSystemPage />
        </Route>
      </Switch>
      {children}
    </Router>
  );
};

export default AppRouter;
