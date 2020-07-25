import { v4 as uuid } from "uuid";

import { copyEntityWithNewId } from "common/store/moduleUtils";

const DEFAULT_COLOR_TOKEN_NAMES = ["background", "foreground", "interactive"];

export const getDefaultColorTokenNames = () => [...DEFAULT_COLOR_TOKEN_NAMES];

export const create = (attributes) => {
  return {
    id: uuid(),
    swatchColorId: null,
    name: "",
    ...attributes,
  };
};

export const validate = (colorToken, allColorTokens) => {};

export const copy = (colorToken) => ({ ...colorToken });

export const copyWithNewId = (colorToken) => copyEntityWithNewId(colorToken);
