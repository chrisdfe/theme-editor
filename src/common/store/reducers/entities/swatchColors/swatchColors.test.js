import * as types from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import { createMockSwatchColor, createMockThemeBundle } from "tests/utils";

import swatchColorsReducer from "./swatchColors";

const createEmptyState = () => ({ byId: {}, allIds: [] });
const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("swatchColorsReducer", () => {
  it("should return the initial state", () => {
    expect(swatchColorsReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("swatchColors actions", () => {
    xdescribe("SET_SWATCH_COLOR");

    describe("SET_SWATCH_COLORS", () => {
      it("should replace an empty state", () => {
        const newSwatchColor = createMockSwatchColor();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newSwatchColor.id]: newSwatchColor,
          },
          allIds: [newSwatchColor.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.SET_SWATCH_COLORS,
          swatchColors: [newSwatchColor],
        });

        expect(newState).toEqual(expectedState);
      });

      it("should replace a non-empty state", () => {
        const existingSwatch = createMockSwatchColor({ id: 2 });
        const newSwatchColor = createMockSwatchColor();

        const currentState = createMockState({
          byId: {
            [existingSwatch.id]: existingSwatch,
          },
          allIds: [existingSwatch.id],
        });
        const expectedState = createMockState({
          byId: {
            [newSwatchColor.id]: newSwatchColor,
          },
          allIds: [newSwatchColor.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.SET_SWATCH_COLORS,
          swatchColors: [newSwatchColor],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_SWATCH_COLOR", () => {
      it("should add a swatch color to an empty state", () => {
        const newSwatchColor = createMockSwatchColor();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newSwatchColor.id]: newSwatchColor,
          },
          allIds: [newSwatchColor.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.ADD_SWATCH_COLOR,
          swatchColor: newSwatchColor,
        });
        expect(newState).toEqual(expectedState);
      });

      it("should add a theme to a non-empty state", () => {
        const existingSwatchColor = createMockSwatchColor();
        const newSwatchColor = createMockSwatchColor({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingSwatchColor.id]: existingSwatchColor,
          },
          allIds: [existingSwatchColor.id],
        });
        const expectedState = createMockState({
          byId: {
            [existingSwatchColor.id]: existingSwatchColor,
            [newSwatchColor.id]: newSwatchColor,
          },
          allIds: [existingSwatchColor.id, newSwatchColor.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.ADD_SWATCH_COLOR,
          swatchColor: newSwatchColor,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_SWATCH_COLORS", () => {
      it("should add multiple swatch colors", () => {
        const swatchColor1 = createMockSwatchColor();
        const swatchColor2 = createMockSwatchColor();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [swatchColor1.id]: swatchColor1,
            [swatchColor2.id]: swatchColor2,
          },
          allIds: [swatchColor1.id, swatchColor2.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.ADD_SWATCH_COLORS,
          swatchColors: [swatchColor1, swatchColor2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_SWATCH_COLOR", () => {
      it("should update a swatch color", () => {
        const swatchColorLeaveAlone = createMockSwatchColor({ swatchId: 2 });
        const swatchColorToUpdate = createMockSwatchColor({
          swatchId: 1,
          hex: "#ffffff",
        });
        const attributestoUpdateWith = { hex: "#000000" };

        const currentState = createMockState({
          byId: {
            [swatchColorLeaveAlone.id]: swatchColorLeaveAlone,
            [swatchColorToUpdate.id]: swatchColorToUpdate,
          },
          allIds: [swatchColorLeaveAlone.id, swatchColorToUpdate.id],
        });
        const expectedState = createMockState({
          byId: {
            [swatchColorLeaveAlone.id]: swatchColorLeaveAlone,
            [swatchColorToUpdate.id]: {
              ...swatchColorToUpdate,
              ...attributestoUpdateWith,
            },
          },
          allIds: [swatchColorLeaveAlone.id, swatchColorToUpdate.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.UPDATE_SWATCH_COLOR,
          id: swatchColorToUpdate.id,
          attributes: attributestoUpdateWith,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_SWATCH_COLORS", () => {
      it("updates multiple swatches", () => {
        const swatchColorToLeaveAlone = createMockSwatchColor({ id: 1 });
        const swatchColorToUpdate1 = createMockSwatchColor({ id: 2 });
        const newSwatchColorAttributes1 = { hex: "#111111" };
        const swatchColorToUpdate2 = createMockSwatchColor({ id: 2 });
        const newSwatchColorAttributes2 = { hex: "#222222" };

        const currentState = createMockState({
          byId: {
            [swatchColorToLeaveAlone.id]: swatchColorToLeaveAlone,
            [swatchColorToUpdate1.id]: swatchColorToUpdate1,
            [swatchColorToUpdate2.id]: swatchColorToUpdate2,
          },
          allIds: [
            swatchColorToLeaveAlone.id,
            swatchColorToUpdate1.id,
            swatchColorToUpdate2.id,
          ],
        });
        const expectedState = createMockState({
          byId: {
            [swatchColorToLeaveAlone.id]: swatchColorToLeaveAlone,
            [swatchColorToUpdate1.id]: {
              ...swatchColorToUpdate1,
              ...newSwatchColorAttributes1,
            },
            [swatchColorToUpdate2.id]: {
              ...swatchColorToUpdate2,
              ...newSwatchColorAttributes2,
            },
          },
          allIds: [
            swatchColorToLeaveAlone.id,
            swatchColorToUpdate1.id,
            swatchColorToUpdate2.id,
          ],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.UPDATE_SWATCH_COLORS,
          swatchColors: {
            [swatchColorToUpdate1.id]: newSwatchColorAttributes1,
            [swatchColorToUpdate2.id]: newSwatchColorAttributes2,
          },
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_SWATCH_COLOR", () => {
      it("should remove a swatch color", () => {
        const swatchColorToDelete = createMockSwatchColor();
        const otherSwatchColor = createMockSwatchColor({ id: 2 });

        const currentState = createMockState({
          byId: {
            [swatchColorToDelete.id]: swatchColorToDelete,
            [otherSwatchColor.id]: otherSwatchColor,
          },
          allIds: [swatchColorToDelete.id, otherSwatchColor.id],
        });

        const expectedState = createMockState({
          byId: {
            [otherSwatchColor.id]: otherSwatchColor,
          },
          allIds: [otherSwatchColor.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.REMOVE_SWATCH_COLOR,
          id: swatchColorToDelete.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_SWATCH_COLORS", () => {
      it("removes a list of swatch colors", () => {
        const swatchColorToDelete = createMockSwatchColor({ id: 1 });
        const swatchColorToDelete2 = createMockSwatchColor({ id: 2 });
        const swatchColorToRemain = createMockSwatchColor({ id: 3 });

        const currentState = createMockState({
          byId: {
            [swatchColorToDelete.id]: swatchColorToDelete,
            [swatchColorToDelete2.id]: swatchColorToDelete2,
            [swatchColorToRemain.id]: swatchColorToRemain,
          },
          allIds: [
            swatchColorToDelete.id,
            swatchColorToDelete2.id,
            swatchColorToRemain.id,
          ],
        });

        const expectedState = createMockState({
          byId: {
            [swatchColorToRemain.id]: swatchColorToRemain,
          },
          allIds: [swatchColorToRemain.id],
        });

        const newState = swatchColorsReducer(currentState, {
          type: types.REMOVE_SWATCH_COLORS,
          ids: [swatchColorToDelete.id, swatchColorToDelete2.id],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("themeBundle actions", () => {
    describe("themeBundles/ADD_THEME_BUNDLE", () => {
      it("adds new swatch colors from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { swatchColors } = themeBundle;

        const currentState = createMockState({
          byId: {},
          allIds: [],
        });

        const expectedState = createMockState({
          byId: {
            ...swatchColors.reduce(
              (acc, swatchColors) => ({
                ...acc,
                [swatchColors.id]: swatchColors,
              }),
              {}
            ),
          },
          allIds: swatchColors.map(({ id }) => id),
        });

        const newState = swatchColorsReducer(currentState, {
          type: themeBundleTypes.ADD_THEME_BUNDLE,
          ...themeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("themeBundles/UPDATE_THEME_BUNDLE", () => {
      it("updates an existing swatchColors from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { swatchColors } = themeBundle;
        const modifiedSwatchColors = swatchColors.map((swatchColor) => ({
          ...swatchColor,
          hex: "#000 ",
        }));
        const modifiedThemeBundle = {
          ...themeBundle,
          swatchColors: modifiedSwatchColors,
        };

        const currentState = createMockState({
          byId: {
            ...swatchColors.reduce(
              (acc, swatchColor) => ({
                ...acc,
                [swatchColor.id]: swatchColor,
              }),
              {}
            ),
          },
          allIds: swatchColors.map(({ id }) => id),
        });

        const expectedState = createMockState({
          byId: {
            ...modifiedSwatchColors.reduce(
              (acc, swatchColor) => ({
                ...acc,
                [swatchColor.id]: swatchColor,
              }),
              {}
            ),
          },
          allIds: modifiedSwatchColors.map(({ id }) => id),
        });

        const newState = swatchColorsReducer(currentState, {
          type: themeBundleTypes.UPDATE_THEME_BUNDLE,
          ...modifiedThemeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });
});
