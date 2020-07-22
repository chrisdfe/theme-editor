import { omit } from "lodash";
import * as types from "common/store/domains/themes/types";

import { createMockThemeBundle, createMockColorToken } from "tests/utils";

import colorTokensReducer from "./colorTokens";

const createEmptyState = () => ({
  byId: {},
  allIds: [],
  originalState: {},
});

const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("editing/colorTokenReducer", () => {
  it("should return the initial state", () => {
    expect(colorTokensReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("EDIT_STARTED", () => {
    it("adds the 'colorTokens' field from a theme bundle to the state", () => {
      const colorToken = createMockColorToken({ id: 10 });
      const colorTokens = [colorToken];
      const themeBundle = createMockThemeBundle({
        colorTokens,
      });

      const currentState = createEmptyState();
      const expectedState = createMockState({
        byId: {
          [colorToken.id]: colorToken,
        },
        allIds: [colorToken.id],
        originalState: {
          [colorToken.id]: colorToken,
        },
      });

      const newState = colorTokensReducer(currentState, {
        type: types.EDIT_STARTED,
        ...themeBundle,
      });

      expect(newState).toEqual(expectedState);
    });
  });

  xdescribe("swatchColors/REMOVE_EDITING_SWATCH_COLOR");
});
