import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as types from "./types";
import * as SwatchColorModule from "./module";

// TODO
export const setSwatchColor = ({ swatchColor }) => {};

export const setSwatchColors = ({ swatchColors } = {}) => {
  if (!swatchColors) {
    throw new PayloadError('"swatchColors" is required');
  }
  return { type: types.SET_SWATCH_COLORS, swatchColors };
};

export const addSwatchColor = ({ swatchColor } = {}) => {
  if (!swatchColor) {
    throw new PayloadError('"swatchColor" is required');
  }

  return { type: types.ADD_SWATCH_COLOR, swatchColor };
};

export const addSwatchColors = ({ swatchColors } = {}) => {
  if (!swatchColors) {
    throw new PayloadError('"swatchColors" is required');
  }

  return { type: types.ADD_SWATCH_COLORS, swatchColors };
};

export const createSwatchColor = ({ swatchColor } = {}) => async (dispatch) => {
  if (!swatchColor) {
    throw new PayloadError('"swatchColor" is required');
  }

  const newSwatchColor = SwatchColorModule.create(swatchColor);
  // TODO - SwatchColorModule.validate

  return dispatch(addSwatchColor({ swatchColor: newSwatchColor }));
};

export const createSwatchColors = ({ swatchColors } = {}) => async (
  dispatch
) => {
  if (!swatchColors) {
    throw new PayloadError('"swatchColors" is required');
  }

  const newSwatchColors = swatchColors.map((swatchColor) =>
    SwatchColorModule.create(swatchColor)
  );
  return dispatch(addSwatchColors({ swatchColors: newSwatchColors }));
};

export const updateSwatchColor = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;
  return dispatch({ type: types.UPDATE_SWATCH_COLOR, id, attributes });
};

export const updateSwatchColors = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["swatchColors"] });
  const { swatchColors } = payload;
  return dispatch({ type: types.UPDATE_SWATCH_COLORS, swatchColors });
};

export const removeSwatchColorById = ({ id } = {}) => {
  if (!id) {
    throw new PayloadError('"id" is required');
  }
  return { type: types.REMOVE_SWATCH_COLOR, id };
};

export const deleteSwatchColorById = ({ id } = {}) => async (dispatch) => {
  if (!id) {
    throw new PayloadError('"id" is required');
  }
  return dispatch(removeSwatchColorById({ id }));
};

export const removeSwatchColorsById = ({ ids } = {}) => {
  if (!ids) {
    throw new PayloadError('"ids" is required');
  }
  return { type: types.REMOVE_SWATCH_COLORS, ids };
};

export const deleteSwatchColorsById = ({ ids } = {}) => async (dispatch) => {
  if (!ids) {
    throw new PayloadError('"ids" is required');
  }

  return dispatch(removeSwatchColorsById({ ids }));
};

// Editing
export const addEditingSwatchColor = ({ swatchColor } = {}) => {
  if (!swatchColor) {
    throw new PayloadError('"swatchColor" is required');
  }

  return { type: types.ADD_EDITING_SWATCH_COLOR, swatchColor };
};

export const createEditingSwatchColor = ({ swatchColor } = {}) => async (
  dispatch
) => {
  if (!swatchColor) {
    throw new PayloadError('"swatchColor" is required');
  }

  const newSwatchColor = SwatchColorModule.create(swatchColor);
  // TODO - SwatchColorModule.validate

  return dispatch(addEditingSwatchColor({ swatchColor: newSwatchColor }));
};

export const updateEditingSwatchColor = (payload) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;
  return dispatch({ type: types.UPDATE_EDITING_SWATCH_COLOR, id, attributes });
};

export const removeEditingSwatchColorById = ({ id } = {}) => {
  if (!id) {
    throw new PayloadError('"id" is required');
  }
  return { type: types.REMOVE_EDITING_SWATCH_COLOR, id };
};
