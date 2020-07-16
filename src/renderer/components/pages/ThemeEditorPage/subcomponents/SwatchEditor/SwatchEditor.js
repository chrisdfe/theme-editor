import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import isHex from "common/utils/isHex";

import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";

import * as themeSelectors from "common/store/domains/themes/selectors";

import * as swatchSelectors from "common/store/domains/swatches/selectors";

import * as swatchColorActions from "common/store/domains/swatchColors/actions";

import TextInput from "@/components/lib/forms/TextInput";
import Button from "@/components/lib/forms/Button";

import "./SwatchEditor.css";

const SwatchColorCard = ({ swatchColor, onSelect, isSelected }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(swatchColor.hex);
  }, []);

  const className = classnames("SwatchEditor__swatch-color-card", {
    "SwatchEditor__swatch-color-card--is-selected": isSelected,
  });

  return (
    <div
      className={className}
      onClick={() => {
        onSelect(swatchColor);
      }}
    >
      <div
        className="SwatchEditor__swatch-color-card__square"
        style={{ backgroundColor: swatchColor.hex }}
      />
    </div>
  );
};

SwatchColorCard.defaultProps = {
  isSelected: false,
  onSelect: () => {},
};

const SwatchEditor = () => {
  const dispatch = useDispatch();

  const { swatch, swatchColors } = useSelector(
    themeBundleSelectors.getEditingThemeBundle
  );

  const [inputValue, setInputValue] = useState("");
  const [selectedSwatchColorCardId, setSelectedSwatchColorCardId] = useState(
    null
  );

  const selectedSwatchColor =
    selectedSwatchColorCardId &&
    swatchColors.find(({ id }) => id === selectedSwatchColorCardId);

  const onSwatchColorSelect = (swatchColor) => {
    if (
      selectedSwatchColorCardId &&
      selectedSwatchColorCardId === swatchColor.id
    ) {
      setSelectedSwatchColorCardId(null);
    } else {
      setSelectedSwatchColorCardId(swatchColor.id);
      setInputValue(swatchColor.hex);
    }
  };

  return (
    <div className="SwatchEditor">
      <div className="SwatchEditor__swatch-colors-list">
        {swatchColors.map((swatchColor) => {
          return (
            <SwatchColorCard
              key={swatchColor.id}
              swatchColor={swatchColor}
              isSelected={swatchColor.id === selectedSwatchColorCardId}
              onSelect={onSwatchColorSelect}
            />
          );
        })}
      </div>

      {selectedSwatchColor && (
        <div className="SwatchEditor__input-wrapper">
          <TextInput
            value={inputValue}
            onChange={(e) => {
              const { value } = e.target;
              setInputValue(value);
              if (isHex(value)) {
                // TODO - debounce
                dispatch(
                  swatchColorActions.updateEditingSwatchColor({
                    id: selectedSwatchColor.id,
                    attributes: { hex: value },
                  })
                );
              }
            }}
          />
        </div>
      )}

      <div className="SwatchEditor__button-wrapper">
        <Button
          onClick={() => {
            dispatch(
              swatchColorActions.createEditingSwatchColor({
                swatchColor: { swatchId: swatch.id },
              })
            );
          }}
        >
          add color
        </Button>
      </div>
    </div>
  );
};

export default SwatchEditor;
