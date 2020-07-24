import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";

import * as swatchActions from "common/store/domains/swatches/actions";
import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as colorTokenActions from "common/store/domains/colorTokens/actions";
import * as colorTokenSelectors from "common/store/domains/colorTokens/selectors";

import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import * as swatchColorActions from "common/store/domains/swatchColors/actions";

import Button from "@/components/lib/forms/Button";
import * as Page from "@/components/lib/layout/pages";
import * as Grid from "@/components/lib/layout/grid";

import Sidebar from "./subcomponents/Sidebar";
import Main from "./subcomponents/Main";

import "./ThemeEditorPage.css";

const ThemeEditorPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(swatchActions.fetchSwatches());
  }, []);

  return (
    <div className="ThemeEditorPage">
      <div className="ThemeEditorPage__layout">
        <div className="ThemeEditorPage__sidebar">
          <Sidebar />
        </div>

        <div className="ThemeEditorPage__main">
          <div className="ThemeEditorPage__main-inner">
            <Main />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditorPage;
