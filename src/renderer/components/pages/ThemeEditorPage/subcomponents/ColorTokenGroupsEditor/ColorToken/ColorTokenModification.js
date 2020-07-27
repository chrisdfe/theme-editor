import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useSelector, useDispatch } from "react-redux";

import * as colorTokenModificationActions from "common/store/domains/colorTokenModifications/actions";
import * as ColorTokenModificationModule from "common/store/domains/colorTokenModifications/module";

import Button from "@/components/lib/forms/Button";

import SwatchColorsList from "./SwatchColorsList";

const AlphaControls = ({ colorTokenModification }) => {
  const dispatch = useDispatch();

  const { value } = colorTokenModification.params;

  const [internalValue, setInternalValue] = useState(value);

  const inputId = `alpha-${colorTokenModification.id}`;

  return (
    <div className="ColorTokenGroupsEditor__color-token-modification__controls ColorTokenGroupsEditor__color-token-modification__controls--alpha">
      <label htmlFor={inputId}>
        alpha
        <br />
        <input
          id={inputId}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={value}
          onChange={(e) => {
            const { value } = e.target;
            const parsedValue = parseFloat(value, 10);

            // TODO - debounce
            dispatch(
              colorTokenModificationActions.updateEditingColorTokenModification(
                {
                  id: colorTokenModification.id,
                  attributes: {
                    params: {
                      ...colorTokenModification.params,
                      value: parsedValue,
                    },
                  },
                }
              )
            );
          }}
        />
      </label>
    </div>
  );
};

const MixControls = ({ colorTokenModification }) => {
  const dispatch = useDispatch();

  const { mixColorId, value } = colorTokenModification.params;

  const inputId = `mix-${colorTokenModification.id}`;

  return (
    <div className="ColorTokenGroupsEditor__color-token-modification__controls ColorTokenGroupsEditor__color-token-modification__controls--mix">
      mix
      <br />
      <SwatchColorsList
        selectedId={mixColorId}
        onSelect={(swatchColor) => {
          dispatch(
            colorTokenModificationActions.updateEditingColorTokenModification({
              id: colorTokenModification.id,
              attributes: {
                params: {
                  ...colorTokenModification.params,
                  mixColorId: swatchColor.id,
                },
              },
            })
          );
        }}
      />
      {mixColorId && (
        <label htmlFor={inputId}>
          amount
          <br />
          <input
            id={inputId}
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={value}
            onChange={(e) => {
              const { value } = e.target;
              const parsedValue = parseFloat(value, 10);

              // TODO - debounce
              dispatch(
                colorTokenModificationActions.updateEditingColorTokenModification(
                  {
                    id: colorTokenModification.id,
                    attributes: {
                      params: {
                        ...colorTokenModification.params,
                        value: parsedValue,
                      },
                    },
                  }
                )
              );
            }}
          />
        </label>
      )}
    </div>
  );
};

const modificationComponentTypeMap = {
  [ColorTokenModificationModule.TYPES.alpha]: AlphaControls,
  [ColorTokenModificationModule.TYPES.mix]: MixControls,
};

const ColorTokenModification = ({ colorTokenModification }) => {
  const dispatch = useDispatch();

  const ControlsComponent =
    modificationComponentTypeMap[colorTokenModification.type];

  return (
    <div className="ColorTokenGroupsEditor__color-token-modification">
      <div className="ColorTokenGroupsEditor__color-token-modification__controls-wrapper">
        <ControlsComponent colorTokenModification={colorTokenModification} />
      </div>

      <Button
        size="small"
        onClick={() => {
          dispatch(
            colorTokenModificationActions.deleteEditingColorTokenModificationById(
              { id: colorTokenModification.id }
            )
          );
        }}
      >
        remove
      </Button>
    </div>
  );
};

export default ColorTokenModification;
