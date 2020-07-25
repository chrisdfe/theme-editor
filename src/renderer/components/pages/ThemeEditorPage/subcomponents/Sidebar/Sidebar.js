import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";

import CommandsContext from "common/commands/CommandsContext";
import createThemeBundleAndBeginEditing from "common/commands/createThemeBundleAndBeginEditing";

import Button from "@/components/lib/forms/Button";

import SwatchesList from "../SwatchesList";
import ThemeList from "../ThemeList";
import ThemeEditor from "../ThemeEditor";

import SidebarSection from "./SidebarSection";

import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const doCommand = useContext(CommandsContext);

  const swatchesList = useSelector(swatchSelectors.getThemelessSwatchesList);
  const themeBeingEdited = useSelector(themeSelectors.getEditingTheme);

  const themesList = useSelector(themeBundleSelectors.getThemeBundlesList);

  return (
    <div className="Sidebar">
      <div className="Sidebar__body">
        <SidebarSection title={`swatches (${swatchesList.length})`}>
          <SwatchesList />
        </SidebarSection>

        <SidebarSection title={`themes (${themesList.length})`}>
          <ThemeList />
        </SidebarSection>

        {!themeBeingEdited && (
          <SidebarSection>
            <Button
              onClick={() => {
                doCommand(createThemeBundleAndBeginEditing());
              }}
            >
              + new theme
            </Button>
          </SidebarSection>
        )}

        {themeBeingEdited && (
          <SidebarSection title="edit theme">
            <ThemeEditor theme={themeBeingEdited} />
          </SidebarSection>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
