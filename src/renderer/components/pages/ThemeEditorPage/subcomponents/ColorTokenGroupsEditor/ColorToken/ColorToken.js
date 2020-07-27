import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as swatchColorSelectors from "common/store/domains/swatchColors/selectors";

import * as ColorTokenModule from "common/store/domains/colorTokens/module";
import * as colorTokenActions from "common/store/domains/colorTokens/actions";
import * as colorTokenSelectors from "common/store/domains/colorTokens/selectors";

import * as colorTokenModificationActions from "common/store/domains/colorTokenModifications/actions";

import Button from "@/components/lib/forms/Button";
import TextInput from "@/components/lib/forms/TextInput";

import ColorTokenModification from "./ColorTokenModification";
import SwatchColorsList from "./SwatchColorsList";

const ColorToken = ({ colorToken }) => {
  const dispatch = useDispatch();

  const swatch = useSelector(swatchSelectors.getEditingSwatch);

  const swatchColors = useSelector((state) =>
    swatchSelectors.getEditingSwatchSwatchColors(state, swatch)
  );

  const colorTokenSwatchColor = useSelector((state) =>
    swatchColorSelectors.getEditingSwatchColorById(
      state,
      colorToken.swatchColorId
    )
  );

  const modifications = useSelector((state) =>
    colorTokenSelectors.getEditingColorTokenModifications(state, colorToken)
  );

  const finalColor = useSelector((state) =>
    colorTokenSelectors.getEditingColorTokenModifiedColor(state, colorToken.id)
  );

  const [colorTokenNameValue, setColorTokenGroupNameValue] = useState(
    colorToken.name
  );

  // TODO - use debounced TextInput instead
  const [, cancelDispatch] = useDebounce(
    () => {
      dispatch(
        colorTokenActions.updateEditingColorToken({
          id: colorToken.id,
          attributes: { name: colorTokenNameValue },
        })
      );
    },
    500,
    [colorTokenNameValue]
  );

  useEffect(() => {
    cancelDispatch();
  }, []);

  return (
    <div className="ColorTokenGroupsEditor__color-token">
      <div
        className="ColorTokenGroupsEditor__color-token__final-color"
        style={{ backgroundColor: finalColor }}
      />
      <div className="ColorTokenGroupsEditor__color-token__name-input-wrapper">
        <TextInput
          label="name"
          value={colorTokenNameValue}
          onChange={(e) => {
            const { value } = e.target;
            setColorTokenGroupNameValue(value);
          }}
        />
      </div>

      <div className="ColorTokenGroupsEditor__color-token__swatch-colors-list">
        <SwatchColorsList
          onSelect={(swatchColor) => {
            dispatch(
              colorTokenActions.updateEditingColorToken({
                id: colorToken.id,
                attributes: { swatchColorId: swatchColor.id },
              })
            );
          }}
          selectedId={colorToken.swatchColorId}
        />
      </div>

      <div className="ColorTokenGroupsEditor__color-token-modifications">
        <h4 className="ColorTokenGroupsEditor__color-token-modifications-title">
          modifications
        </h4>

        <div className="ColorTokenGroupsEditor__color-token-modifications-button-group">
          <Button
            size="small"
            onClick={() => {
              dispatch(
                colorTokenModificationActions.createEditingColorTokenModification(
                  {
                    colorTokenModification: {
                      type: "alpha",
                      colorTokenId: colorToken.id,
                    },
                  }
                )
              );
            }}
          >
            + alpha
          </Button>

          <Button
            size="small"
            onClick={() => {
              dispatch(
                colorTokenModificationActions.createEditingColorTokenModification(
                  {
                    colorTokenModification: {
                      type: "mix",
                      colorTokenId: colorToken.id,
                    },
                  }
                )
              );
            }}
          >
            + mix
          </Button>
        </div>

        <div className="ColorTokenGroupsEditor__color-token-modifications-list">
          {modifications.map((modification) => (
            <ColorTokenModification
              key={modification.id}
              colorTokenModification={modification}
            />
          ))}
        </div>
      </div>

      <div>
        <Button
          onClick={() => {
            // TODO - confirmation modal
            dispatch(
              colorTokenActions.deleteEditingColorTokenById({
                id: colorToken.id,
              })
            );
          }}
        >
          - delete
        </Button>
      </div>
    </div>
  );
};

export default ColorToken;
