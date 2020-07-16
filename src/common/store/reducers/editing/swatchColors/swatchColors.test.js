import { omit } from "lodash";
import * as types from "common/store/domains/themes/types";

import { createMockThemeBundle, createMockSwatchColor } from "tests/utils";

import swatchColorsReducer from "./swatchColors";

const createEmptyState = () => ({
  byId: {},
  allIds: [],
  originalState: {},
});

const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("editing/swatchColorsReducer", () => {
  it("should return the initial state", () => {
    expect(swatchColorsReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("EDIT_STARTED", () => {
    it("adds the 'swatchColors' field from a theme bundle to the state", () => {
      const swatchColor = createMockSwatchColor({ id: 10 });
      const swatchColors = [swatchColor];
      const themeBundle = createMockThemeBundle({
        swatchColors,
      });

      const currentState = createEmptyState();
      const expectedState = createMockState({
        byId: {
          [swatchColor.id]: swatchColor,
        },
        allIds: [swatchColor.id],
        originalState: {
          [swatchColor.id]: swatchColor,
        },
      });

      const newState = swatchColorsReducer(currentState, {
        type: types.EDIT_STARTED,
        ...themeBundle,
      });

      expect(newState).toEqual(expectedState);
    });
  });
});
