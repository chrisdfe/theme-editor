import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as types from "./types";
import * as ColorTokensModule from "./module";

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

  // TODO - ColorTokensModule.create();
  const colorToken = ColorTokensModule.create(attributes);
  // TODO - ColorTokensModule.validate();
  // TODO - persistence

  return dispatch({ type: types.ADD_COLOR_TOKEN, colorToken });
};

export const createColorTokens = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["colorTokens"] });
  const { colorTokens: colorTokenAttributeList } = payload;

  const colorTokens = colorTokenAttributeList.map((attributes) =>
    ColorTokensModule.create(attributes)
  );

  // TODO - ColorTokensModule.validateMany();
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
  return dispatch({ type: types.REMOVE_COLOR_TOKEN, id });
};

export const deleteColorTokensById = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return dispatch({ type: types.REMOVE_COLOR_TOKENS, ids });
};

export const updateEditingColorToken = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;
  return dispatch({ type: types.UPDATE_EDITING_COLOR_TOKEN, id, attributes });
};
