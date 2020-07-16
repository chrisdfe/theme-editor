import { omit } from "lodash";
import * as types from "common/store/domains/themes/types";

import {
  createMockThemeBundle,
  createMockColorToken,
  createMockColorTokenGroup,
} from "tests/utils";

import colorTokenGroupsReducer from "./colorTokenGroups";

const createEmptyState = () => ({
  byId: {},
  allIds: [],
  originalState: {},
});

const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("editing/colorTokenGroupsReducer", () => {
  it("should return the initial state", () => {
    expect(colorTokenGroupsReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("EDIT_STARTED", () => {
    it("adds the 'colorTokenGroups' field from a theme bundle to the state", () => {
      const colorTokenGroup = createMockColorToken();
      const colorTokenGroups = [colorTokenGroup];

      const colorToken = createMockColorToken({
        id: 10,
        colorTokenGroupId: colorTokenGroup.id,
      });
      const colorTokens = [colorToken];

      const themeBundle = createMockThemeBundle({
        colorTokenGroups,
        colorTokens,
      });

      const currentState = createEmptyState();
      const expectedState = createMockState({
        byId: {
          [colorTokenGroup.id]: {
            ...colorTokenGroup,
            colorTokenIds: [10],
          },
        },
        allIds: [colorTokenGroup.id],
        originalState: {
          [colorTokenGroup.id]: {
            ...colorTokenGroup,
            colorTokenIds: [10],
          },
        },
      });

      const newState = colorTokenGroupsReducer(currentState, {
        type: types.EDIT_STARTED,
        ...themeBundle,
      });

      expect(newState).toEqual(expectedState);
    });
  });
});
