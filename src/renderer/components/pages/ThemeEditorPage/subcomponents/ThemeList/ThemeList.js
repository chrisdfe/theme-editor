import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as themeBundleActions from "common/store/domains/themeBundles/actions";
import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";

import * as directorySelectors from "common/store/domains/directories/selectors";
import * as DirectoryModule from "common/store/domains/directories/module";

import Button from "@/components/lib/forms/Button";

import CommandsContext from "common/commands/CommandsContext";
import loadThemeFileFromDialog from "common/commands/loadThemeFileFromDialog";
import addDirectoriesFromDialog from "common/commands/addDirectoriesFromDialog";
import createThemeBundleAndBeginEditing from "common/commands/createThemeBundleAndBeginEditing";
import beginEditingExistingThemeBundle from "common/commands/beginEditingExistingThemeBundle";

import "./ThemeList.css";

const ThemeBundle = ({ themeBundle }) => {
  const dispatch = useDispatch();

  const { theme, swatchColors, colorTokens } = themeBundle;

  const doCommand = useContext(CommandsContext);

  // TODO - memoized selector
  const colorTokenColors = colorTokens
    .map((colorToken) =>
      swatchColors.find(
        (swatchColor) => swatchColor.id === colorToken.swatchColorId
      )
    )
    .map(({ hex }) => hex);

  return (
    <div className="ThemeList__theme-list-item" key={theme.id}>
      <div className="ThemeList__theme-list-item__body">
        <div className="ThemeList__theme-list-item__name">{theme.name}</div>
        <div className="ThemeList__theme-list-item__filename">
          {theme.fileName}
        </div>

        <div className="ThemeList__theme-list-item__swatch-color-list">
          {colorTokenColors.map((hex, index) => (
            <div
              key={`${index}-${hex}`}
              className="ThemeList__theme-list-item__swatch-color"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>

      <div className="ThemeList__theme-list-item__actions">
        <Button
          onClick={() => {
            const { id } = theme;
            doCommand(beginEditingExistingThemeBundle({ id }));
          }}
        >
          edit
        </Button>
        <Button
          onClick={() => {
            // const { id } = theme;
            // doCommand(beginEditingExistingThemeBundle({ id }));
          }}
        >
          preview
        </Button>
      </div>
    </div>
  );
};

const ThemeList = () => {
  const dispatch = useDispatch();

  const doCommand = useContext(CommandsContext);

  const themeBundlesGroupedByDirectoryId = useSelector(
    themeBundleSelectors.getThemeBundlesGroupedByDirectoryId
  );

  const themeDirectoriesList = useSelector(
    directorySelectors.getThemeDirectoriesList
  );

  return (
    <div className="ThemeList">
      <div>
        {themeDirectoriesList.map((directory) => {
          const themeBundles = themeBundlesGroupedByDirectoryId[directory.id];

          if (!themeBundles) {
            return null;
          }

          return (
            <div className="ThemeList__directory-group" key={directory.id}>
              <div
                key={directory.id}
                className="ThemeList__directory-group__title"
              >
                {DirectoryModule.trimFilePath(directory.filePath)}
              </div>

              <div className="ThemeList__theme-list">
                {themeBundles.map((themeBundle) => (
                  <ThemeBundle
                    key={themeBundle.theme.id}
                    themeBundle={themeBundle}
                  />
                ))}
              </div>

              {/*
              <Button
                onClick={async () => {
                  doCommand(
                    addDirectoriesFromDialog({ type: DirectoryModule.TYPES.theme })
                  );
                }}
              >
                ...
              </Button>
              */}
            </div>
          );
        })}
      </div>

      <Button
        onClick={async () => {
          doCommand(
            addDirectoriesFromDialog({ type: DirectoryModule.TYPES.theme })
          );
        }}
      >
        ...
      </Button>
    </div>
  );
};

export default ThemeList;
