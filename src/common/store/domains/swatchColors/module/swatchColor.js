import { v4 as uuid } from "uuid";

import { copyEntityWithNewId } from "common/store/moduleUtils";

const DEFAULT_SWATCH_COLORS = ["#fff", "#333", "#ff0000"];

export const getDefaultColors = () => [...DEFAULT_SWATCH_COLORS];

export const create = (attributes = {}) => {
  return {
    id: uuid(),
    hex: "#ffffff",
    swatchId: null,
    ...attributes,
  };
};

export const validate = () => {};

export const copy = (swatchColor) => ({ ...swatchColor });

export const copyWithNewId = (swatchColor) => copyEntityWithNewId(swatchColor);
