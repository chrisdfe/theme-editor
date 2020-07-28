import React from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import "./SwatchColorsList.css";

const SwatchColor = ({ swatchColor, selectedId, onSelect }) => {
  // const isSelected = swatchColor.id === colorToken.swatchColorId;
  const isSelected = swatchColor.id === selectedId;

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
        // TODO - deselect
        onSelect(swatchColor);
      }}
    />
  );
};

const SwatchColorsList = ({ selectedId, onSelect }) => {
  const swatch = useSelector(swatchSelectors.getEditingSwatch);

  const swatchColors = useSelector((state) =>
    swatchSelectors.getEditingSwatchSwatchColors(state, swatch)
  );

  console.log("SwatchColorsList", swatchColors);

  return (
    <div className="ColorTokenGroupsEditor__color-token__swatch-colors-list">
      {swatchColors.map((swatchColor) => (
        <SwatchColor
          key={swatchColor.id}
          selectedId={selectedId}
          swatchColor={swatchColor}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default SwatchColorsList;
