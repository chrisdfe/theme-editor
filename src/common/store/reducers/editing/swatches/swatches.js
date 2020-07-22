import { mapValues } from "lodash";
import {
  createReducer,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/swatches/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const themeActionHandlers = {
  [themeTypes.EDIT_STARTED]: (state, { swatch, swatchColors }) => {
    const swatchColorIds = swatchColors.map(({ id }) => id);

    const byId = {
      [swatch.id]: {
        ...swatch,
        swatchColorIds,
      },
    };

    const allIds = [swatch.id];

    const originalState = {
      ...state.originalState,
      [swatch.id]: {
        ...swatch,
      },
    };

    return {
      byId,
      allIds,
      originalState,
    };
  },

  // Makes the assumption that there is 1 theme being edited at a time
  [themeTypes.EDIT_CLEARED]: () => {
    return { ...initialState };
  },
};

const swatchColorActionHandlers = {
  [swatchColorTypes.ADD_EDITING_SWATCH_COLOR]: (state, { swatchColor }) => {
    const byId = mapValues(state.byId, (swatch) => {
      if (swatchColor.swatchId === swatch.id) {
        const { swatchColorIds } = swatch;
        return {
          ...swatch,
          swatchColorIds: [...swatchColorIds, swatchColor.id],
        };
      }

      return swatch;
    });

    return {
      ...state,
      byId,
    };
  },

  [swatchColorTypes.REMOVE_EDITING_SWATCH_COLOR]: (state, { id }) => {
    const byId = mapValues(state.byId, (swatch) => {
      const swatchColorIds = swatch.swatchColorIds.filter(
        (swatchColorId) => swatchColorId !== id
      );

      return {
        ...swatch,
        swatchColorIds,
      };
    });

    return {
      ...state,
      byId,
    };
  },
};

const swatchesReducer = createReducer(initialState, {
  ...themeActionHandlers,
  ...swatchColorActionHandlers,
});

export default swatchesReducer;
