import React, { useContext } from "react";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";

import * as themeActions from "common/store/domains/themes/actions";
import * as themeSelectors from "common/store/domains/themes/selectors";
import * as themeFs from "common/store/domains/themes/fs";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import CommandsContext from "common/commands/CommandsContext";
import saveCurrentEditedTheme from "common/commands/saveCurrentEditedTheme";

import Button from "@/components/lib/forms/Button";

import SwatchEditor from "../SwatchEditor";
import ColorTokenGroupsEditor from "../ColorTokenGroupsEditor";

import "./ThemeEditor.css";

const ThemeEditor = () => {
  const dispatch = useDispatch();

  const doCommand = useContext(CommandsContext);

  const {
    theme,
    swatch,
    swatchColors,
    colorTokenGroups,
    colorTokens,
  } = useSelector(themeBundleSelectors.getEditingThemeBundle);

  return (
    <div className="ThemeEditor">
      <h3>{theme.name}</h3>

      <div className="ThemeEditor__section">
        <h4 className="ThemeEditor__section-title">swatch</h4>

        {swatch && <SwatchEditor swatch={swatch} />}
      </div>

      {colorTokenGroups && (
        <div className="ThemeEditor__section">
          <h4 className="ThemeEditor__section-title">color token groups</h4>

          <ColorTokenGroupsEditor
            swatch={swatch}
            colorTokenGroups={colorTokenGroups}
          />
        </div>
      )}

      {theme && (
        <div className="ThemeEditor__section">
          <div className="ThemeEditor__action-buttons">
            <Button
              onClick={() => {
                dispatch(themeActions.cancelEditingTheme({ id: theme.id }));
              }}
            >
              cancel
            </Button>

            <Button
              onClick={async () => {
                doCommand(saveCurrentEditedTheme());
              }}
            >
              save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeEditor;
