import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";

import CommandsContext from "common/commands/CommandsContext";
import newTheme from "common/commands/newTheme";

import Navbar from "@/components/lib/Navbar";
import Button from "@/components/lib/forms/Button";

import SwatchesList from "../SwatchesList";
import ThemeList from "../ThemeList";
import ThemeEditor from "../ThemeEditor";

import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const doCommand = useContext(CommandsContext);

  const themeBeingEdited = useSelector(themeSelectors.getEditingTheme);

  return (
    <div className="Sidebar">
      <div className="Sidebar__navbar-wrapper">
        <Navbar>
          <Link className="LinkButton" to="/">
            back
          </Link>
        </Navbar>
      </div>

      <div className="Sidebar__body">
        <div className="Sidebar__section">
          <h3 className="Sidebar__section-title">Swatches</h3>
          <SwatchesList />
        </div>

        <div className="Sidebar__section">
          <h3 className="Sidebar__section-title">Themes</h3>
          <ThemeList />
        </div>

        <div className="Sidebar__section">
          {themeBeingEdited && <ThemeEditor theme={themeBeingEdited} />}

          <Button
            onClick={() => {
              doCommand(newTheme());
            }}
          >
            add theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
