import * as types from "common/store/domains/swatches/types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createMockSwatch,
  createMockSwatchColor,
  createMockThemeBundle,
} from "tests/utils";

import swatchesReducer, { initialState } from "./swatches";

const createEmptyState = () => ({ byId: {}, allIds: [] });
const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("swatchesReducer", () => {
  it("should return the initial state", () => {
    expect(swatchesReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("swatch actions", () => {
    xdescribe("SET_SWATCH");

    describe("SET_SWATCHES", () => {
      it("should replace an empty state", () => {
        const newSwatch = createMockSwatch();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newSwatch.id]: newSwatch,
          },
          allIds: [newSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.SET_SWATCHES,
          swatches: [newSwatch],
        });

        expect(newState).toEqual(expectedState);
      });

      it("should replace a non-empty state", () => {
        const newSwatch = createMockSwatch({ id: 2 });

        const currentState = createMockState({
          byId: {
            1: createMockSwatch({ id: 1 }),
          },
          allIds: [1],
        });

        const expectedState = createMockState({
          byId: {
            [newSwatch.id]: newSwatch,
          },
          allIds: [newSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.SET_SWATCHES,
          swatches: [newSwatch],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_SWATCH", () => {
      it("should add a swatch to an empty state", () => {
        const newSwatch = createMockSwatch({ id: 1 });

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newSwatch.id]: newSwatch,
          },
          allIds: [newSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.ADD_SWATCH,
          swatch: newSwatch,
        });

        expect(newState).toEqual(expectedState);
      });

      it("should add a theme to a non-empty state", () => {
        const existingSwatch = createMockSwatch();
        const newSwatch = createMockSwatch({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingSwatch.id]: existingSwatch,
          },
          allIds: [existingSwatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [existingSwatch.id]: existingSwatch,
            [newSwatch.id]: newSwatch,
          },
          allIds: [existingSwatch.id, newSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.ADD_SWATCH,
          swatch: newSwatch,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_SWATCHES", () => {
      it("add swatches to a non-empty state", () => {
        const existingSwatch = createMockSwatch({ id: 1 });
        const newSwatch1 = createMockSwatch({ id: 2 });
        const newSwatch2 = createMockSwatch({ id: 3 });

        const currentState = createMockState({
          byId: {
            [existingSwatch.id]: existingSwatch,
          },
          allIds: [existingSwatch.id],
        });
        const expectedState = createMockState({
          byId: {
            [existingSwatch.id]: existingSwatch,
            [newSwatch1.id]: newSwatch1,
            [newSwatch2.id]: newSwatch2,
          },
          allIds: [existingSwatch.id, newSwatch1.id, newSwatch2.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.ADD_SWATCHES,
          swatches: [newSwatch1, newSwatch2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_SWATCH", () => {
      it("should update a swatch", () => {
        const swatchToLeaveAlone = createMockSwatch({
          id: 1,
          name: "mock swatch 1",
        });
        const swatchToUpdate = createMockSwatch({
          id: 2,
          name: "mock swatch 2",
        });
        const attributesToUpdateWith = { name: "updated mock swatch name" };

        const currentState = createMockState({
          byId: {
            [swatchToLeaveAlone.id]: swatchToLeaveAlone,
            [swatchToUpdate.id]: swatchToUpdate,
          },
          allIds: [swatchToLeaveAlone.id, swatchToUpdate.id],
        });
        const expectedState = createMockState({
          byId: {
            [swatchToLeaveAlone.id]: swatchToLeaveAlone,
            [swatchToUpdate.id]: {
              ...swatchToUpdate,
              ...attributesToUpdateWith,
            },
          },
          allIds: [swatchToLeaveAlone.id, swatchToUpdate.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.UPDATE_SWATCH,
          id: swatchToUpdate.id,
          attributes: attributesToUpdateWith,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_SWATCHES", () => {
      it("updates multiple swatches", () => {
        const swatch = createMockSwatch({ id: 1 });
        const swatchToUpdate1 = createMockSwatch({ id: 2 });
        const newSwatchAttributes1 = { name: "new name 1" };
        const swatchToUpdate2 = createMockSwatch({ id: 2 });
        const newSwatchAttributes2 = { name: "new name 2" };

        const currentState = createMockState({
          byId: {
            [swatch.id]: swatch,
            [swatchToUpdate1.id]: swatchToUpdate1,
            [swatchToUpdate2.id]: swatchToUpdate2,
          },
          allIds: [swatch.id, swatchToUpdate1.id, swatchToUpdate2.id],
        });
        const expectedState = createMockState({
          byId: {
            [swatch.id]: swatch,
            [swatchToUpdate1.id]: {
              ...swatchToUpdate1,
              ...newSwatchAttributes1,
            },
            [swatchToUpdate2.id]: {
              ...swatchToUpdate2,
              ...newSwatchAttributes2,
            },
          },
          allIds: [swatch.id, swatchToUpdate1.id, swatchToUpdate2.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.UPDATE_SWATCHES,
          swatches: {
            [swatchToUpdate1.id]: newSwatchAttributes1,
            [swatchToUpdate2.id]: newSwatchAttributes2,
          },
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_SWATCH", () => {
      it("should remove a swatch", () => {
        const swatchToDelete = createMockSwatch({ id: 1 });
        const otherSwatch = createMockSwatch({ id: 2 });

        const currentState = createMockState({
          byId: {
            [swatchToDelete.id]: swatchToDelete,
            [otherSwatch.id]: otherSwatch,
          },
          allIds: [swatchToDelete.id, otherSwatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [otherSwatch.id]: otherSwatch,
          },
          allIds: [otherSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.REMOVE_SWATCH,
          id: swatchToDelete.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_SWATCHES", () => {
      it("removes swatches", () => {
        const swatchToRemain = createMockSwatch({ id: 1 });
        const swatchToDelete1 = createMockSwatch({ id: 2 });
        const swatchToDelete2 = createMockSwatch({ id: 3 });

        const currentState = createMockState({
          byId: {
            [swatchToRemain.id]: swatchToRemain,
            [swatchToDelete1.id]: swatchToDelete1,
            [swatchToDelete2.id]: swatchToDelete2,
          },
          allIds: [swatchToRemain.id, swatchToDelete1.id],
        });

        const expectedState = createMockState({
          byId: {
            [swatchToRemain.id]: swatchToRemain,
          },
          allIds: [swatchToRemain.id],
        });

        const newState = swatchesReducer(currentState, {
          type: types.REMOVE_SWATCHES,
          ids: [swatchToDelete1.id, swatchToDelete2.id],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("swatchColorActions", () => {
    describe("ADD_SWATCH_COLOR", () => {
      it("upates swatchColorIds of the appropriate swatch", () => {
        const swatch = createMockSwatch({ id: 10 });
        const anotherSwatch = createMockSwatch({ id: 2 });

        const newSwatchColor = createMockSwatchColor({ id: 1, swatchId: 10 });

        const currentState = createMockState({
          byId: {
            [swatch.id]: swatch,
            [anotherSwatch.id]: anotherSwatch,
          },
          allIds: [swatch.id, anotherSwatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [swatch.id]: {
              ...swatch,
              swatchColorIds: [newSwatchColor.id],
            },
            [anotherSwatch.id]: anotherSwatch,
          },
          allIds: [swatch.id, anotherSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: swatchColorTypes.ADD_SWATCH_COLOR,
          swatchColor: newSwatchColor,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_SWATCH_COLORS", () => {
      it("updates the appropriate swatch", () => {
        const swatch = createMockSwatch({ id: 10 });
        const anotherSwatch = createMockSwatch({ id: 2 });

        const newSwatchColor1 = createMockSwatchColor({
          id: 1,
          swatchId: swatch.id,
        });
        const newSwatchColor2 = createMockSwatchColor({
          id: 1,
          swatchId: swatch.id,
        });

        const currentState = createMockState({
          byId: {
            [swatch.id]: swatch,
            [anotherSwatch.id]: anotherSwatch,
          },
          allIds: [swatch.id, anotherSwatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [swatch.id]: {
              ...swatch,
              swatchColorIds: [newSwatchColor1.id, newSwatchColor2.id],
            },
            [anotherSwatch.id]: anotherSwatch,
          },
          allIds: [swatch.id, anotherSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: swatchColorTypes.ADD_SWATCH_COLORS,
          swatchColors: [newSwatchColor1, newSwatchColor2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_SWATCH_COLOR", () => {
      it("updates the appropriate swatch", () => {
        const swatchColorToRemove = createMockSwatchColor({ id: 1 });
        const swatchColorIdToRemain = 2;

        const swatch = createMockSwatch({
          id: 1,
          swatchColorIds: [swatchColorToRemove.id, swatchColorIdToRemain],
        });
        const anotherSwatch = createMockSwatch({ id: 2 });

        const currentState = createMockState({
          byId: {
            [swatch.id]: swatch,
            [anotherSwatch.id]: anotherSwatch,
          },
          allIds: [swatch.id, anotherSwatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [swatch.id]: {
              ...swatch,
              swatchColorIds: [swatchColorIdToRemain],
            },
            [anotherSwatch.id]: anotherSwatch,
          },
          allIds: [swatch.id, anotherSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: swatchColorTypes.REMOVE_SWATCH_COLOR,
          id: swatchColorToRemove.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_SWATCH_COLORS", () => {
      it("updates the appropriate swatchColorIds fields", () => {
        const swatchColorIdToRemove = 1;
        const swatchColorIdToRemain = 2;

        const swatch = createMockSwatch({
          id: 1,
          swatchColorIds: [swatchColorIdToRemove, swatchColorIdToRemain],
        });

        const unchangedSwatch = createMockSwatch({
          id: 2,
          swatchColorIds: [swatchColorIdToRemain],
        });

        const currentState = createMockState({
          byId: {
            [swatch.id]: swatch,
            [unchangedSwatch.id]: unchangedSwatch,
          },
          allIds: [swatch.id, unchangedSwatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [swatch.id]: {
              ...swatch,
              swatchColorIds: [swatchColorIdToRemain],
            },
            [unchangedSwatch.id]: unchangedSwatch,
          },
          allIds: [swatch.id, unchangedSwatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: swatchColorTypes.REMOVE_SWATCH_COLORS,
          ids: [swatchColorIdToRemove],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("themeBundle actions", () => {
    describe("themeBundles/ADD_THEME_BUNDLE", () => {
      it("adds a new swatch from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { swatch } = themeBundle;

        const currentState = createMockState({
          byId: {},
          allIds: [],
        });

        const expectedState = createMockState({
          byId: {
            [swatch.id]: swatch,
          },
          allIds: [swatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: themeBundleTypes.ADD_THEME_BUNDLE,
          ...themeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("themeBundles/UPDATE_THEME_BUNDLE", () => {
      it("updates an existing swatches from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { swatch } = themeBundle;
        const modifiedSwatch = { ...swatch, name: "new swatch name" };
        const modifiedThemeBundle = {
          ...themeBundle,
          swatch: { ...modifiedSwatch },
        };

        const currentState = createMockState({
          byId: {
            [swatch.id]: swatch,
          },
          allIds: [swatch.id],
        });

        const expectedState = createMockState({
          byId: {
            [swatch.id]: modifiedSwatch,
          },
          allIds: [swatch.id],
        });

        const newState = swatchesReducer(currentState, {
          type: themeBundleTypes.UPDATE_THEME_BUNDLE,
          ...modifiedThemeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });
});
