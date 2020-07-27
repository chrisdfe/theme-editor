import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as colorTokenGroupActions from "common/store/domains/colorTokenGroups/actions";
import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import * as colorTokenActions from "common/store/domains/colorTokens/actions";

import CommandsContext from "common/commands/CommandsContext";
import createThemeBundleAndBeginEditing from "common/commands/createThemeBundleAndBeginEditing";

import Button from "@/components/lib/forms/Button";

import "./ColorTokenGroupsEditor.css";

import ColorTokenGroup from "./ColorTokenGroup";

const ColorTokenGroupsEditor = ({ theme, colorTokenGroups }) => {
  const dispatch = useDispatch();

  return (
    <div className="ColorTokenGroupsEditor">
      <div className="ColorTokenGroupsEditor__color-token-groups-list">
        {colorTokenGroups.map((colorTokenGroup) => {
          return (
            <ColorTokenGroup
              key={colorTokenGroup.id}
              theme={theme}
              colorTokenGroup={colorTokenGroup}
            />
          );
        })}
      </div>

      <div className="ColorTokenGroupsEditor__button-wrapper">
        <Button
          onClick={() => {
            dispatch(
              colorTokenGroupActions.createEditingColorTokenGroup({
                colorTokenGroup: { themeId: theme.id },
              })
            );
          }}
        >
          + add color token group
        </Button>
      </div>
    </div>
  );
};

export default ColorTokenGroupsEditor;
