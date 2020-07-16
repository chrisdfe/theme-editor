import * as types from "common/store/domains/colorTokens/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createMockSwatchColor,
  createMockColorToken,
  createMockThemeBundle,
  createGenericStateSlice,
} from "tests/utils";

import colorTokensReducer from "./colorTokens";

const createEmptyState = () => ({ byId: {}, allIds: [] });
const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("colorTokensReducer", () => {
  it("should return the initial state", () => {
    expect(colorTokensReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("colorTokens actions", () => {
    describe("SET_COLOR_TOKENS", () => {
      it("should replace an empty state", () => {
        const newColorToken = createMockColorToken();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newColorToken.id]: newColorToken,
          },
          allIds: [newColorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.SET_COLOR_TOKENS,
          colorTokens: [newColorToken],
        });

        expect(newState).toEqual(expectedState);
      });

      it("should replace a non-empty state", () => {
        const existingColorToken = createMockColorToken({ id: 1 });
        const newColorToken = createMockColorToken({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingColorToken.id]: existingColorToken,
          },
          allIds: [existingColorToken.id],
        });
        const expectedState = createMockState({
          byId: {
            [newColorToken.id]: newColorToken,
          },
          allIds: [newColorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.SET_COLOR_TOKENS,
          colorTokens: [newColorToken],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_COLOR_TOKEN", () => {
      it("should add a color token to an empty state", () => {
        const newColorToken = createMockColorToken({ id: 1 });

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newColorToken.id]: newColorToken,
          },
          allIds: [newColorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.ADD_COLOR_TOKEN,
          colorToken: newColorToken,
        });
        expect(newState).toEqual(expectedState);
      });

      it("should add a color token to a non-empty state", () => {
        const existingColorToken = createMockColorToken({ id: 1 });
        const newColorToken = createMockColorToken({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingColorToken.id]: existingColorToken,
          },
          allIds: [existingColorToken.id],
        });
        const expectedState = createMockState({
          byId: {
            [existingColorToken.id]: existingColorToken,
            [newColorToken.id]: newColorToken,
          },
          allIds: [existingColorToken.id, newColorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.ADD_COLOR_TOKEN,
          colorToken: newColorToken,
        });
        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_COLOR_TOKENS", () => {
      it("should add multiple colorTokens", () => {
        const colorToken1 = createMockColorToken({ id: 1 });
        const colorToken2 = createMockColorToken({ id: 2 });

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [colorToken1.id]: colorToken1,
            [colorToken2.id]: colorToken2,
          },
          allIds: [colorToken1.id, colorToken2.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.ADD_COLOR_TOKENS,
          colorTokens: [colorToken1, colorToken2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_COLOR_TOKEN", () => {
      it("should update a color token", () => {
        const colorToken = createMockColorToken({
          id: 1,
          swatchColorId: 1,
        });

        const attributes = { swatchColorId: 2 };

        const currentState = createMockState({
          byId: {
            [colorToken.id]: colorToken,
          },
          allIds: [colorToken.id],
        });
        const expectedState = createMockState({
          byId: {
            [colorToken.id]: { ...colorToken, ...attributes },
          },
          allIds: [colorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.UPDATE_COLOR_TOKEN,
          id: colorToken.id,
          attributes,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_COLOR_TOKENS", () => {
      it("updates multiple colorTokens", () => {
        const colorTokenToLeaveAlone = createMockColorToken({ id: 1 });
        const colorTokenToUpdate1 = createMockColorToken({ id: 2 });
        const newColorTokenAttributes1 = { name: "new name 1" };
        const colorTokenToUpdate2 = createMockColorToken({ id: 2 });
        const newColorTokenAttributes2 = { name: "new name 2" };

        const currentState = createMockState({
          byId: {
            [colorTokenToLeaveAlone.id]: colorTokenToLeaveAlone,
            [colorTokenToUpdate1.id]: colorTokenToUpdate1,
            [colorTokenToUpdate2.id]: colorTokenToUpdate2,
          },
          allIds: [
            colorTokenToLeaveAlone.id,
            colorTokenToUpdate1.id,
            colorTokenToUpdate2.id,
          ],
        });
        const expectedState = createMockState({
          byId: {
            [colorTokenToLeaveAlone.id]: colorTokenToLeaveAlone,
            [colorTokenToUpdate1.id]: {
              ...colorTokenToUpdate1,
              ...newColorTokenAttributes1,
            },
            [colorTokenToUpdate2.id]: {
              ...colorTokenToUpdate2,
              ...newColorTokenAttributes2,
            },
          },
          allIds: [
            colorTokenToLeaveAlone.id,
            colorTokenToUpdate1.id,
            colorTokenToUpdate2.id,
          ],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.UPDATE_COLOR_TOKENS,
          colorTokens: {
            [colorTokenToUpdate1.id]: newColorTokenAttributes1,
            [colorTokenToUpdate2.id]: newColorTokenAttributes2,
          },
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_COLOR_TOKEN", () => {
      it("should remove a color token", () => {
        const colorTokenToDelete = createMockColorToken({
          id: 1,
          swatchColorId: 1,
        });

        const otherColorToken = createMockColorToken({
          id: 2,
          swatchColorId: 1,
        });

        const currentState = createMockState({
          byId: {
            [colorTokenToDelete.id]: colorTokenToDelete,
            [otherColorToken.id]: otherColorToken,
          },
          allIds: [colorTokenToDelete.id, otherColorToken.id],
        });
        const expectedState = createMockState({
          byId: {
            [otherColorToken.id]: otherColorToken,
          },
          allIds: [otherColorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.REMOVE_COLOR_TOKEN,
          id: colorTokenToDelete.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_COLOR_TOKENS", () => {
      it("removes a list of color tokens", () => {
        const colorTokenToDelete = createMockColorToken({ id: 1 });
        const colorTokenToDelete2 = createMockColorToken({ id: 2 });
        const colorTokenToRemain = createMockColorToken({ id: 3 });

        const currentState = createMockState({
          byId: {
            [colorTokenToDelete.id]: colorTokenToDelete,
            [colorTokenToDelete2.id]: colorTokenToDelete2,
            [colorTokenToRemain.id]: colorTokenToRemain,
          },
          allIds: [
            colorTokenToDelete.id,
            colorTokenToDelete2.id,
            colorTokenToRemain.id,
          ],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenToRemain.id]: colorTokenToRemain,
          },
          allIds: [colorTokenToRemain.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: types.REMOVE_COLOR_TOKENS,
          ids: [colorTokenToDelete.id, colorTokenToDelete2.id],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("swatchColor actions", () => {
    describe("REMOVE_SWATCH_COLOR", () => {
      it("resets a swatchColorId that points to a deleted swatchColor", () => {
        const swatchColorToDelete = createMockSwatchColor({ id: 1 });
        const colorToken = createMockColorToken({
          swatchColorId: swatchColorToDelete.id,
        });

        const currentState = createMockState({
          byId: {
            [colorToken.id]: colorToken,
          },
          allIds: [colorToken.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorToken.id]: { ...colorToken, swatchColorId: null },
          },
          allIds: [colorToken.id],
        });

        const newState = colorTokensReducer(currentState, {
          type: swatchColorTypes.REMOVE_SWATCH_COLOR,
          id: swatchColorToDelete.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("themeBundle actions", () => {
    describe("themeBundles/ADD_THEME_BUNDLE", () => {
      it("adds new color tokens from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { colorTokens } = themeBundle;

        const currentState = createMockState({
          byId: {},
          allIds: [],
        });

        const expectedState = createMockState({
          byId: {
            ...colorTokens.reduce(
              (acc, colorTokens) => ({
                ...acc,
                [colorTokens.id]: colorTokens,
              }),
              {}
            ),
          },
          allIds: colorTokens.map(({ id }) => id),
        });

        const newState = colorTokensReducer(currentState, {
          type: themeBundleTypes.ADD_THEME_BUNDLE,
          ...themeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("themeBundles/UPDATE_THEME_BUNDLE", () => {
      it("updates an existing colorTokens from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { colorTokens } = themeBundle;
        const modifiedColorTokens = [{ ...colorTokens[0], swatchColorId: 100 }];
        const modifiedThemeBundle = {
          ...themeBundle,
          colorTokens: modifiedColorTokens,
        };

        const currentState = createMockState({
          byId: {
            ...colorTokens.reduce(
              (acc, colorToken) => ({
                ...acc,
                [colorToken.id]: colorToken,
              }),
              {}
            ),
          },
          allIds: colorTokens.map(({ id }) => id),
        });

        const expectedState = createMockState({
          byId: {
            ...modifiedColorTokens.reduce(
              (acc, colorToken) => ({
                ...acc,
                [colorToken.id]: colorToken,
              }),
              {}
            ),
          },
          allIds: modifiedColorTokens.map(({ id }) => id),
        });

        const newState = colorTokensReducer(currentState, {
          type: themeBundleTypes.UPDATE_THEME_BUNDLE,
          ...modifiedThemeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });
});
