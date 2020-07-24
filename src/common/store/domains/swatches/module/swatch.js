import { v4 as uuid } from "uuid";
import { set, update } from "lodash";

import { copyEntityWithNewId } from "common/store/moduleUtils";

import * as SwatchColorModule from "common/store/domains/swatchColors/module";

const REQUIRED_FIELDS = ["id", "name"];

export const create = (attributes) => {
  return {
    id: uuid(),
    name: "Untitled Swatch",
    swatchColorIds: [],
    ...attributes,
  };
};

export const createForTheme = ({ theme, attributes = {} }) => {
  const name = `${theme.name} swatch`;
  return create({ themeId: theme.id, name, ...attributes });
};

export const getDefaultSwatchColorAttributesForSwatch = ({ swatch }) =>
  SwatchColorModule.getDefaultColors().map((hex) => ({
    hex,
    swatchId: swatch.id,
  }));

export const createDefaultSwatchColorsForSwatch = ({ swatch }) =>
  getDefaultSwatchColorAttributesForSwatch({ swatch }).map((attributes) =>
    SwatchColorModule.create(attributes)
  );

export const validate = (attributes, allSwatches) => {
  const result = {};

  // TODO - first key should be attribute name - e.g
  // { errors: { name: ['required'] } }
  REQUIRED_FIELDS.forEach((fieldName) => {
    if (!attributes[fieldName]) {
      update(result, "errors.required", (required) => [
        ...(required || []),
        fieldName,
      ]);
    }
  });

  if (attributes.name) {
    const allNames = allSwatches.map(({ name }) => name);
    allNames.forEach((name) => {
      if (name === attributes.name) {
        set(result, "errors.duplicateName", name);
      }
    });
  }

  return result;
};

export const copy = (swatch) => ({ ...swatch });

export const copyWithNewId = (swatch) => copyEntityWithNewId(swatch, copy);
