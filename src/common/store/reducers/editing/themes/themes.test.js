import { omit } from "lodash";
import * as types from "common/store/domains/themes/types";

import themesReducer from "./themes";

import { createMockTheme, createMockThemeBundle } from "tests/utils";

const createEmptyState = () => ({
  byId: {},
  allIds: [],
  originalState: {},
});

const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("editing/themesReducer", () => {
  it("should return the initial state", () => {
    expect(themesReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("EDIT_STARTED", () => {
    it("adds the 'theme' field from a theme bundle to the state", () => {
      const themeBundle = createMockThemeBundle();
      const { theme } = themeBundle;

      const currentState = createEmptyState();
      const expectedState = createMockState({
        byId: {
          [theme.id]: theme,
        },
        allIds: [theme.id],
        originalState: {
          [theme.id]: theme,
        },
      });

      const newState = themesReducer(currentState, {
        type: types.EDIT_STARTED,
        ...themeBundle,
      });

      expect(newState).toEqual(expectedState);
    });
  });
});
