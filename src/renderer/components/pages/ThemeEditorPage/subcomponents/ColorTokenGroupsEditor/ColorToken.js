import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as colorTokenActions from "common/store/domains/colorTokens/actions";

import Button from "@/components/lib/forms/Button";
import TextInput from "@/components/lib/forms/TextInput";

const SwatchColor = ({ swatchColor, colorToken }) => {
  const dispatch = useDispatch();

  const isSelected = swatchColor.id === colorToken.swatchColorId;

  const className = classnames(
    "ColorTokenGroupsEditor__color-token__swatch-color",
    {
      "ColorTokenGroupsEditor__color-token__swatch-color--is-selected": isSelected,
    }
  );

  return (
    <div
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
};

const ColorToken = ({ colorToken, swatch }) => {
  const dispatch = useDispatch();

  const swatchColors = useSelector((state) =>
    swatchSelectors.getEditingSwatchSwatchColors(state, swatch)
  );

  const [colorTokenNameValue, setColorTokenGroupNameValue] = useState(
    colorToken.name
  );

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
        {swatchColors.map((swatchColor) => (
          <SwatchColor
            key={swatchColor.id}
            swatchColor={swatchColor}
            colorToken={colorToken}
          />
        ))}
      </div>

      <Button
        onClick={() => {
          // TODO - confirmation modal
          dispatch(
            colorTokenActions.deleteEditingColorTokenById({ id: colorToken.id })
          );
        }}
      >
        remove
      </Button>
    </div>
  );
};

export default ColorToken;
