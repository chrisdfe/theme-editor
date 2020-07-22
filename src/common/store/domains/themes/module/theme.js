import { v4 as uuid } from "uuid";
import { set, update, omit } from "lodash";

import { copyEntityWithNewId } from "common/store/moduleUtils";

const REQUIRED_FIELDS = ["id", "name"];

export const create = (attributes) => {
  return {
    id: uuid(),
    name: "untitled theme",
    directoryId: null,
    filename: null,
    ...attributes,
  };
};

export const validate = (attributes, allThemes) => {
  const result = {};

  REQUIRED_FIELDS.forEach((fieldName) => {
    if (!attributes[fieldName]) {
      update(result, "errors.required", (required) => [
        ...(required || []),
        fieldName,
      ]);
    }
  });

  if (attributes.name) {
    const allNames = allThemes.map(({ name }) => name);
    allNames.forEach((name) => {
      if (name === attributes.name) {
        set(result, "errors.duplicateName", name);
      }
    });
  }

  return result;
};

export const copy = (theme) => ({ ...theme });

export const copyWithNewId = (theme) => copyEntityWithNewId(theme, copy);
