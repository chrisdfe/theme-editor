import { omit, mapValues } from "lodash";

import * as types from "common/store/domains/swatches/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  setEntitiesById,
  addEntityById,
  addEntitiesById,
  updateEntityById,
  updateEntitiesById,
  removeEntityById,
  removeEntitiesById,
} from "common/store/reducerUtils";

const swatchTypesHandlers = {
  [types.SET_SWATCHES]: (state, { swatches }) => {
    return setEntitiesById(state, swatches);
  },

  [types.ADD_SWATCH]: (state, { swatch }) => {
    return addEntityById(state, swatch);
  },

  [types.ADD_SWATCHES]: (state, { swatches }) => {
    return addEntitiesById(state, swatches);
  },

  [types.UPDATE_SWATCH]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_SWATCHES]: (state, { swatches }) => {
    return updateEntitiesById(state, swatches);
  },

  [types.REMOVE_SWATCH]: (state, { id }) => {
    return removeEntityById(state, id);
  },

  [types.REMOVE_SWATCHES]: (state, { ids }) => {
    return removeEntitiesById(state, ids);
  },
};

const swatchColorTypesHandlers = {
  [swatchColorTypes.ADD_SWATCH_COLOR]: (state, { swatchColor }) => {
    return mapValues(state, (swatch) => {
      if (swatchColor.swatchId === swatch.id) {
        const { swatchColorIds } = swatch;
        return {
          ...swatch,
          swatchColorIds: [...swatchColorIds, swatchColor.id],
        };
      }

      return swatch;
    });
  },

  [swatchColorTypes.ADD_SWATCH_COLORS]: (state, { swatchColors }) => {
    return mapValues(state, (swatch) => {
      const newSwatchColorIds = swatchColors
        .filter((swatchColor) => swatchColor.swatchId === swatch.id)
        .map(({ id }) => id);

      return {
        ...swatch,
        swatchColorIds: [...swatch.swatchColorIds, ...newSwatchColorIds],
      };
    });
  },

  [swatchColorTypes.REMOVE_SWATCH_COLOR]: (state, { id }) => {
    return mapValues(state, (swatch) => {
      const swatchColorIds = swatch.swatchColorIds.filter(
        (swatchColorId) => swatchColorId !== id
      );

      return {
        ...swatch,
        swatchColorIds,
      };
    });
  },

  [swatchColorTypes.REMOVE_SWATCH_COLORS]: (state, { ids }) => {
    return mapValues(state, (swatch) => {
      const swatchColorIds = swatch.swatchColorIds.filter(
        (id) => !ids.includes(id)
      );

      return {
        ...swatch,
        swatchColorIds,
      };
    });
  },
};

const themeBundleHandlers = {
  [themeBundleTypes.ADD_THEME_BUNDLE]: (state, { swatch, swatchColors }) => {
    return addEntityById(state, {
      ...swatch,
      swatchColorIds: swatchColors
        .filter((swatchColor) => swatchColor.swatchId === swatch.id)
        .map(({ id }) => id),
    });
  },

  [themeBundleTypes.ADD_THEME_BUNDLES]: (state, { swatches, swatchColors }) => {
    return addEntitiesById(
      state,
      swatches.map((swatch) => {
        return {
          ...swatch,
          swatchColorIds: swatchColors
            .filter((swatchColor) => swatchColor.swatchId === swatch.id)
            .map(({ id }) => id),
        };
      })
    );
  },

  [themeBundleTypes.UPDATE_THEME_BUNDLE]: (state, { swatch }) => {
    return updateEntityById(state, swatch.id, swatch);
  },
};

const initialState = {};

const byId = createReducer(initialState, {
  ...swatchTypesHandlers,
  ...swatchColorTypesHandlers,
  ...themeBundleHandlers,
});

export default byId;
