import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as types from "./types";
import * as SwatchModule from "./module";
import * as selectors from "./selectors";

import * as SwatchColorModule from "../swatchColors/module";
import * as swatchColorActions from "../swatchColors/actions";

import * as swatchApi from "./api";

// TODO
export const setSwatch = ({ swatch }) => {};

export const setSwatches = ({ swatches } = {}) => {
  if (!swatches) {
    throw new PayloadError('"swatches" is required');
  }
  return { type: types.SET_SWATCHES, swatches };
};

export const addSwatch = (payload = {}) => {
  validateActionPayload(payload, { required: ["swatch"] });
  const { swatch } = payload;
  return { type: types.ADD_SWATCH, swatch };
};

export const addSwatches = (payload = {}) => {
  const { swatches } = payload;
  validateActionPayload(payload, { required: ["swatches"] });

  return { type: types.ADD_SWATCHES, swatches };
};

export const createSwatch = ({ swatch, swatchColors } = {}) => async (
  dispatch
) => {
  const newSwatch = SwatchModule.create(swatch);

  // TODO here SwatchModule.validate
  // TODO here - avoid duplicate swatch names

  await dispatch(addSwatch({ swatch: newSwatch }));

  if (swatchColors) {
    const newSwatchColors = swatchColors.map((swatchColor) => {
      return { ...swatchColor, swatchId: newSwatch.id };
    });
    await dispatch(
      swatchColorActions.createSwatchColors({ swatchColors: newSwatchColors })
    );
  }
};

// TODO
export const fetchSwatches = () => async (dispatch) => {
  const response = await swatchApi.fetchSwatches();
  // Convert swatch api 'response' shape into action payload shpe
  const { swatches, swatchColors } = response.reduce(
    (acc, swatchData) => {
      const { name, colors } = swatchData;

      const newSwatch = SwatchModule.create({ name });
      const newSwatchColors = colors.map((color) =>
        SwatchColorModule.create({ hex: color, swatchId: newSwatch.id })
      );

      return {
        swatches: [...acc.swatches, newSwatch],
        swatchColors: [...acc.swatchColors, ...newSwatchColors],
      };
    },
    { swatches: [], swatchColors: [] }
  );

  await dispatch(addSwatches({ swatches }));
  return await dispatch(swatchColorActions.addSwatchColors({ swatchColors }));

  // return dispatch(createSwatches({ swatches }));
};

export const createSwatchForTheme = ({ theme, attributes } = {}) => async (
  dispatch
) => {
  const swatch = { themeId: theme.id, ...attributes };
  return dispatch(createSwatch({ swatch }));
};

export const updateSwatch = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });

  const { id, attributes } = payload;
  return dispatch({ type: types.UPDATE_SWATCH, id, attributes });
};

export const updateSwatches = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["swatches"] });
  const { swatches } = payload;
  return dispatch({ type: types.UPDATE_SWATCHES, swatches });
};

export const removeSwatchById = ({ id } = {}) => {
  if (!id) {
    throw new PayloadError('"id" is required');
  }

  return { type: types.REMOVE_SWATCH, id };
};

// TODO - themes should not be able to be left without a swatch,
// so check that before actually deleting
export const deleteSwatchById = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;

  const state = getState();
  const swatch = selectors.getSwatchById(state, id);

  if (swatch.swatchColorIds.length) {
    await dispatch(
      swatchColorActions.deleteSwatchColorsById({ ids: swatch.swatchColorIds })
    );
  }

  return dispatch(removeSwatchById({ id }));
};

export const deleteSwatchByThemeId = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["themeId"] });

  const { themeId } = payload;
  const state = getState();
  const swatchToDelete = selectors.getSwatchByThemeId(state, themeId);
  return dispatch(deleteSwatchById({ id: swatchToDelete.id }));
};
