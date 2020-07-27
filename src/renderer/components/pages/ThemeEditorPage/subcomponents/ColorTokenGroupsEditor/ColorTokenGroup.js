import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useSelector, useDispatch } from "react-redux";

import * as colorTokenGroupActions from "common/store/domains/colorTokenGroups/actions";
import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import * as colorTokenActions from "common/store/domains/colorTokens/actions";

import TextInput from "@/components/lib/forms/TextInput";
import Button from "@/components/lib/forms/Button";

import ColorToken from "./ColorToken";

const ColorTokenGroup = ({ theme, colorTokenGroup }) => {
  const dispatch = useDispatch();

  const colorTokens = useSelector((state) =>
    colorTokenGroupSelectors.getEditingColorTokenGroupColorTokensList(
      state,
      colorTokenGroup
    )
  );

  const [colorTokenGroupNameValue, setColorTokenGroupNameValue] = useState(
    colorTokenGroup.name
  );

  const [, cancelDispatch] = useDebounce(
    () => {
      dispatch(
        colorTokenGroupActions.updateEditingColorTokenGroup({
          id: colorTokenGroup.id,
          attributes: { name: colorTokenGroupNameValue },
        })
      );
    },
    500,
    [colorTokenGroupNameValue]
  );

  // The first time this component renders we don't need
  // to dispatch updateEditingColorTokenGroup
  useEffect(() => {
    cancelDispatch();
  }, []);

  return (
    <div className="ColorTokenGroupsEditor__color-token-group">
      <div className="ColorTokenGroupsEditor__color-token-group__name-input-wrapper">
        <TextInput
          value={colorTokenGroupNameValue}
          label="name"
          onChange={(e) => {
            setColorTokenGroupNameValue(e.target.value);
          }}
        />
      </div>

      <div className="ColorTokenGroupsEditor__color-token-group__color-tokens-list-wrapper">
        <div className="ColorTokenGroupsEditor__color-token-group__color-tokens-list">
          {colorTokens.map((colorToken) => {
            return <ColorToken key={colorToken.id} colorToken={colorToken} />;
          })}
        </div>

        <div className="ColorTokenGroupsEditor__color-token-group__button-wrapper">
          <Button
            onClick={() => {
              dispatch(
                colorTokenActions.createEditingColorToken({
                  colorToken: {
                    themeId: theme.id,
                    colorTokenGroupId: colorTokenGroup.id,
                  },
                })
              );
            }}
          >
            + add color token
          </Button>
        </div>
      </div>

      {/* TODO - child color token groups go here */}
      {/*
      <div className="ColorTokenGroupsEditor__color-token-group__child-list-wrapper">
        <div className="ColorTokenGroupsEditor__color-token-group__button-wrapper">
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
      */}

      <div className="ColorTokenGroupsEditor__color-token-group__button-wrapper">
        <Button
          onClick={() => {
            dispatch(
              colorTokenGroupActions.deleteEditingColorTokenGroupById({
                id: colorTokenGroup.id,
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

export default ColorTokenGroup;
