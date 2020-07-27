import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as types from "./types";
import * as ColorTokenModificationModule from "./module";

export const addEditingColorTokenModification = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokenModification"] });
  const { colorTokenModification } = payload;

  return {
    type: types.ADD_EDITING_COLOR_TOKEN_MODIFICATION,
    colorTokenModification,
  };
};

export const createEditingColorTokenModification = (payload = {}) => async (
  dispatch
) => {
  validateActionPayload(payload, { required: ["colorTokenModification"] });
  const { colorTokenModification: attributes } = payload;

  // TODO - use a selector to check whether colortoken already has a modification
  //        of this type. if so, just return and don't dispatch anything.
  const colorTokenModification = ColorTokenModificationModule.create(
    attributes
  );

  // TODO - validate

  return dispatch(addEditingColorTokenModification({ colorTokenModification }));
};

export const updateEditingColorTokenModification = (payload = {}) => async (
  dispatch
) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;

  return dispatch({
    type: types.UPDATE_EDITING_COLOR_TOKEN_MODIFICATION,
    id,
    attributes,
  });
};

export const removeEditingColorTokenModificationById = (payload = {}) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;

  return { type: types.REMOVE_EDITING_COLOR_TOKEN_MODIFICATION, id };
};

export const deleteEditingColorTokenModificationById = (payload = {}) => async (
  dispatch
) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;

  return dispatch(removeEditingColorTokenModificationById({ id }));
};
