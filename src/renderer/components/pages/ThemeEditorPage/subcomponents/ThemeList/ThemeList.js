import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as themeBundleActions from "common/store/domains/themeBundles/actions";
import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";

import Button from "@/components/lib/forms/Button";

import CommandsContext from "common/commands/CommandsContext";
import loadThemeFileFromDialog from "common/commands/loadThemeFileFromDialog";

import "./ThemeList.css";

const ThemeBundle = ({ themeBundle }) => {
  const dispatch = useDispatch();

  const { theme, swatchColors } = themeBundle;

  return (
    <div className="ThemeList__theme-list-item" key={theme.id}>
      <div>{theme.name}</div>

      <div className="ThemeList__theme-list-item__swatch-color-list">
        {swatchColors.map((swatchColor) => (
          <div
            className="ThemeList__theme-list-item__swatch-color"
            style={{ backgroundColor: swatchColor.hex }}
          />
        ))}
      </div>

      <Button
        onClick={() => {
          const { id } = theme;
          dispatch(themeBundleActions.beginEditingExistingThemeBundle({ id }));
        }}
      >
        edit
      </Button>
    </div>
  );
};

const ThemeList = () => {
  const dispatch = useDispatch();

  const doCommand = useContext(CommandsContext);

  const themesList = useSelector(themeBundleSelectors.getThemeBundlesList);

  return (
    <div className="ThemeList">
      <div style={{ marginBottom: "10px" }}>
        {!themesList.length && <div>no themes.</div>}
        {themesList.length > 0 &&
          themesList.map((themeBundle) => (
            <ThemeBundle key={themeBundle.theme.id} themeBundle={themeBundle} />
          ))}
      </div>

      <Button
        onClick={async () => {
          doCommand(loadThemeFileFromDialog());
        }}
      >
        load
      </Button>

      {/*
      <Button
        onClick={async () => {
          console.log("click");
          const result = await dialog.showOpenDialog({
            properties: ["openDirectory"],
          });
          console.log("result", result);
        }}
      >
        add directory
      </Button>
      */}
    </div>
  );
};

export default ThemeList;
