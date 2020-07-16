import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import * as colorTokenActions from "common/store/domains/colorTokens/actions";

import Button from "@/components/lib/forms/Button";

import "./ColorTokenGroupsEditor.css";

const ColorToken = ({ colorToken, swatch }) => {
  const dispatch = useDispatch();

  const swatchColors = useSelector((state) =>
    swatchSelectors.getEditingSwatchSwatchColors(state, swatch)
  );

  return (
    <div className="ColorTokenGroupsEditor__color-token">
      <h5 className="ColorTokenGroupsEditor__color-token__name">
        {colorToken.name}
      </h5>
      <div className="ColorTokenGroupsEditor__color-token__swatch-colors-list">
        {swatchColors.map((swatchColor) => {
          const className = classnames(
            "ColorTokenGroupsEditor__color-token__swatch-color",
            {
              "ColorTokenGroupsEditor__color-token__swatch-color--is-selected":
                swatchColor.id === colorToken.swatchColorId,
            }
          );

          return (
            <div
              key={swatchColor.id}
              className={className}
              style={{ backgroundColor: swatchColor.hex }}
              onClick={() => {
                dispatch(
                  colorTokenActions.updateEditingColorToken({
                    id: colorToken.id,
                    attributes: { swatchColorId: swatchColor.id },
                  })
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const ColorTokenGroup = ({ colorTokenGroup, swatch }) => {
  const colorTokens = useSelector((state) =>
    colorTokenGroupSelectors.getEditingColorTokenGroupColorTokensList(
      state,
      colorTokenGroup
    )
  );

  return (
    <div className="ColorTokenGroupsEditor__color-token-group">
      <h4>{colorTokenGroup.name}</h4>

      <div className="ColorTokenGroupsEditor__color-token-group__color-tokens-list">
        {colorTokens.map((colorToken) => {
          return (
            <ColorToken
              key={colorToken.id}
              colorToken={colorToken}
              swatch={swatch}
            />
          );
        })}
      </div>
    </div>
  );
};

const ColorTokenGroupsEditor = ({ colorTokenGroups, swatch }) => {
  return (
    <div className="ColorTokenGroupsEditor">
      <div className="ColorTokenGroupsEditor__color-token-groups-list">
        {colorTokenGroups.map((colorTokenGroup) => {
          return (
            <ColorTokenGroup
              key={colorTokenGroup.id}
              swatch={swatch}
              colorTokenGroup={colorTokenGroup}
            />
          );
        })}
      </div>
      {/*<div className="ColorTokenGroupsEditor__button-wrapper">
        <Button
          onClick={() => {
            console.log("clickity click");
          }}
        >
          add color token group
        </Button>
      </div>*/}
    </div>
  );
};

export default ColorTokenGroupsEditor;
