import { v4 as uuid } from "uuid";

export const TYPES = {
  alpha: "alpha",
  mix: "mix",
};

export const getDefaultParamsForType = (type) => {
  if (type === "alpha") {
    return { value: 1 };
  }

  if (type === "mix") {
    return { mixColorId: null, value: 0.5 };
  }

  // TODO: Throw warning or something
  return {};
};

export const create = (attributes = {}) => {
  const params = getDefaultParamsForType(attributes.type);

  return {
    id: uuid(),
    type: "",
    colorTokenId: null,
    params,
    ...attributes,
  };
};

export const validate = (colorTokenModification) => {};
