import { v4 as uuid } from "uuid";
import chroma from "chroma-js";

import { copyEntityWithNewId } from "common/store/moduleUtils";

const DEFAULT_COLOR_TOKEN_NAMES = ["background", "foreground", "interactive"];

export const getDefaultColorTokenNames = () => [...DEFAULT_COLOR_TOKEN_NAMES];

export const create = (attributes) => {
  return {
    id: uuid(),
    swatchColorId: null,
    baseColor: "",
    modificationIds: [],
    color: "",
    name: "",
    ...attributes,
  };
};

export const validate = (colorToken, allColorTokens) => {};

export const copy = (colorToken) => ({ ...colorToken });

export const copyWithNewId = (colorToken) => copyEntityWithNewId(colorToken);

export const applyModifications = (baseColor, modifications) => {
  return modifications.reduce((currentColor, modification) => {
    if (modification.type === "alpha") {
      const { value } = modification.params;
      return chroma(currentColor)
        .alpha(value)
        .hex();
    }

    if (modification.type === "mix") {
      const { value, mixColor } = modification.params;
      if (mixColor) {
        return chroma.mix(currentColor, mixColor, value).hex();
      }
    }

    return currentColor;
  }, baseColor);
};
