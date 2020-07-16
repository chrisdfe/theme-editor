import { omit } from "lodash";
import * as types from "common/store/domains/themes/types";

import swatchesReducer from "./swatches";

import { createMockThemeBundle, createMockSwatchColor } from "tests/utils";

const createEmptyState = () => ({
  byId: {},
  allIds: [],
  originalState: {},
});

const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("editing/swatchesReducer", () => {
  it("should return the initial state", () => {
    expect(swatchesReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("EDIT_STARTED", () => {
    it("adds the 'swatch' field from a theme bundle to the state", () => {
      const themeBundle = createMockThemeBundle({
        swatchColors: [createMockSwatchColor({ id: 10 })],
      });
      const { swatch, swatchColors } = themeBundle;

      const currentState = createEmptyState();
      const expectedState = createMockState({
        byId: {
          [swatch.id]: {
            ...swatch,
            swatchColorIds: [10],
          },
        },
        allIds: [swatch.id],
        originalState: {
          [swatch.id]: swatch,
        },
      });

      const newState = swatchesReducer(currentState, {
        type: types.EDIT_STARTED,
        ...themeBundle,
      });

      expect(newState).toEqual(expectedState);
    });
  });
});
