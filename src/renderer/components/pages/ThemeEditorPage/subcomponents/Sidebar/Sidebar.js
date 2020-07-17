import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";

import Navbar from "@/components/lib/Navbar";
import Button from "@/components/lib/forms/Button";

import SwatchesList from "../SwatchesList";
import ThemeList from "../ThemeList";
import ThemeEditor from "../ThemeEditor";

import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const swatchesList = useSelector(swatchSelectors.getThemelessSwatchesList);
  const themeBeingEdited = useSelector(themeSelectors.getEditingTheme);

  const themesList = useSelector(themeBundleSelectors.getThemeBundlesList);

  return (
    <div className="Sidebar">
      <div className="Sidebar__body">
        <div className="Sidebar__section">
          <h3 className="Sidebar__section-title">
            swatches ({swatchesList.length})
          </h3>
          <div className="Sidebar__section-body">
            <SwatchesList />
          </div>
        </div>

        <div className="Sidebar__section">
          <h3 className="Sidebar__section-title">
            themes ({themesList.length})
          </h3>
          <div className="Sidebar__section-body">
            <ThemeList />
          </div>
        </div>

        {themeBeingEdited && (
          <div className="Sidebar__section">
            <h3 className="Sidebar__section-title">edit theme</h3>
            <div className="Sidebar__section-body">
              <ThemeEditor theme={themeBeingEdited} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
