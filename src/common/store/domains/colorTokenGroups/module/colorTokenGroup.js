import { v4 as uuid } from "uuid";
import { set, update } from "lodash";

import { copyEntityWithNewId } from "common/store/moduleUtils";

import * as ColorTokenModule from "common/store/domains/colorTokens/module";

const REQUIRED_FIELDS = ["id", "name"];

const DEFAULT_GROUP_NAME_SEQUENCE = ["primary", "secondary", "tertiary"];

// TODO - handle 4+ groups
export const getNextName = (themeColorTokenGroups = []) => {
  const allNames = themeColorTokenGroups.map(({ name }) => name);

  const nextName = DEFAULT_GROUP_NAME_SEQUENCE.find(
    (name) => !allNames.includes(name)
  );

  return nextName;
};

export const create = (attributes) => {
  return {
    id: uuid(),
    colorTokenIds: [],
    name: "Untitled Color Token Group",
    ...attributes,
  };
};

export const createForTheme = ({
  theme,
  themeColorTokenGroups = [],
  attributes = {},
}) => {
  const name = getNextName(themeColorTokenGroups);
  return create({ themeId: theme.id, name, ...attributes });
};

export const getDefaultColorTokensAttributesForGroup = ({ colorTokenGroup }) =>
  ColorTokenModule.getDefaultColorTokenNames().map((name) => ({
    name,
    colorTokenGroupId: colorTokenGroup.id,
  }));

export const createDefaultColorTokensForGroup = ({ colorTokenGroup }) =>
  getDefaultColorTokensAttributesForGroup({ colorTokenGroup }).map(
    (attributes) => ColorTokenModule.create(attributes)
  );

export const createDefault = ({ theme }) => {
  const colorTokenGroup = createForTheme({ theme });
  const colorTokens = createDefaultColorTokensForGroup({ colorTokenGroup });
  // TODO - this should go in reducer instead
  colorTokenGroup.colorTokenIds = colorTokens.map(({ id }) => id);
  const colorTokenGroups = [colorTokenGroup];
  return { colorTokenGroups, colorTokens };
};

export const validate = (attributes, allColorTokens) => {
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
    const allNames = allColorTokens.map(({ name }) => name);
    allNames.forEach((name) => {
      if (name === attributes.name) {
        set(result, "errors.duplicateName", name);
      }
    });
  }

  return result;
};

export const copy = (colorTokenGroup) => ({ ...colorTokenGroup });

export const copyWithNewId = (colorTokenGroup) =>
  copyEntityWithNewId(colorTokenGroup);
