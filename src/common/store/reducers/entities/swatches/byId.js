import { omit, mapValues, reject } from "lodash";

import * as types from "common/store/domains/swatches/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createReducer,
  addEntityById,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

const swatchTypesHandlers = {
  [types.SET_SWATCHES]: (state, { swatches }) => {
    return swatches.reduce(
      (acc, swatch) => ({ ...acc, [swatch.id]: swatch }),
      {}
    );
  },

  [types.ADD_SWATCH]: (state, { swatch }) => {
    return {
      ...state,
      [swatch.id]: swatch,
    };
  },

  [types.ADD_SWATCHES]: (state, payload) => {
    const { swatches } = payload;

    return {
      ...state,
      ...swatches.reduce(
        (acc, swatch) => ({ ...acc, [swatch.id]: swatch }),
        {}
      ),
    };
  },

  [types.UPDATE_SWATCH]: (state, { id, attributes }) => {
    return updateEntityById(state, id, attributes);
  },

  [types.UPDATE_SWATCHES]: (state, { swatches }) => {
    return updateEntitiesById(state, swatches);
  },

  [types.REMOVE_SWATCH]: (state, { id }) => {
    return omit(state, id);
  },

  [types.REMOVE_SWATCHES]: (state, { ids }) => {
    return omit(state, ids);
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
      const swatchColorIds = reject(
        swatch.swatchColorIds,
        (swatchColorId) => swatchColorId === id
      );

      return {
        ...swatch,
        swatchColorIds,
      };
    });
  },

  [swatchColorTypes.REMOVE_SWATCH_COLORS]: (state, { ids }) => {
    return mapValues(state, (swatch) => {
      const swatchColorIds = reject(swatch.swatchColorIds, (id) =>
        ids.includes(id)
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
