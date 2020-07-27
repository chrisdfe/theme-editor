import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as types from "./types";
import * as ColorTokenModule from "./module";

export const setColorTokens = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokens"] });
  const { colorTokens } = payload;
  return { type: types.SET_COLOR_TOKENS, colorTokens };
};

export const addColorToken = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorToken"] });
  const { colorToken } = payload;
  return { type: types.ADD_COLOR_TOKEN, colorToken };
};

export const addColorTokens = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokens"] });
  const { colorTokens } = payload;
  return { type: types.ADD_COLOR_TOKENS, colorTokens };
};

export const createColorToken = (payload = {}) => async (dispatch) => {
  const { colorToken: attributes } = payload;

  // TODO - ColorTokenModule.create();
  const colorToken = ColorTokenModule.create(attributes);
  // TODO - ColorTokenModule.validate();
  // TODO - persistence

  return dispatch(addColorToken({ colorToken }));
};

export const createColorTokens = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["colorTokens"] });
  const { colorTokens: colorTokenAttributeList } = payload;

  const colorTokens = colorTokenAttributeList.map((attributes) =>
    ColorTokenModule.create(attributes)
  );

  // TODO - ColorTokenModule.validateMany();
  // TODO - persistence

  return dispatch(addColorTokens({ colorTokens }));
};

export const updateColorToken = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;

  return dispatch({ type: types.UPDATE_COLOR_TOKEN, id, attributes });
};

export const updateColorTokens = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["colorTokens"] });
  const { colorTokens } = payload;
  return dispatch({ type: types.UPDATE_COLOR_TOKENS, colorTokens });
};

export const removeColorTokenById = (payload = {}) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  return { type: types.REMOVE_COLOR_TOKEN, id };
};

export const removeColorTokensById = (payload = {}) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return { type: types.REMOVE_COLOR_TOKENS, ids };
};

export const deleteColorTokenById = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  return dispatch(removeColorTokenById({ id }));
};

export const deleteColorTokensById = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return dispatch({ type: types.REMOVE_COLOR_TOKENS, ids });
};

export const addEditingColorToken = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorToken"] });
  const { colorToken } = payload;
  return { type: types.ADD_EDITING_COLOR_TOKEN, colorToken };
};

export const createEditingColorToken = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["colorToken"] });
  const { colorToken: attributes } = payload;

  const colorToken = ColorTokenModule.create(attributes);
  // TODO - validate

  return dispatch(addEditingColorToken({ colorToken }));
};

export const updateEditingColorToken = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;
  return dispatch({ type: types.UPDATE_EDITING_COLOR_TOKEN, id, attributes });
};

export const removeEditingColorTokenById = (payload = {}) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;

  return { type: types.REMOVE_EDITING_COLOR_TOKEN, id };
};

export const deleteEditingColorTokenById = (payload = {}) => async (
  dispatch
) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;

  return dispatch(removeEditingColorTokenById({ id }));
};
