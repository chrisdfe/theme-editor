import { omit } from "lodash";

import * as types from "common/store/domains/themes/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import themesReducer, { initialState } from "./themes";

import { createMockTheme, createMockThemeBundle } from "tests/utils";

const createEmptyState = () => ({
  byId: {},
  allIds: [],
});
const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("themesReducer", () => {
  it("should return the initial state", () => {
    expect(themesReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("theme actions", () => {
    xdescribe("SET_THEME");

    describe("SET_THEMES", () => {
      it("should replace an empty state", () => {
        const newTheme1 = createMockTheme();
        const newTheme2 = createMockTheme();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newTheme1.id]: newTheme1,
            [newTheme2.id]: newTheme2,
          },
          allIds: [newTheme1.id, newTheme2.id],
        });

        const newState = themesReducer(currentState, {
          type: types.SET_THEMES,
          themes: [newTheme1, newTheme2],
        });

        expect(newState).toEqual(expectedState);
      });

      it("should replace a non-empty state", () => {
        const existingTheme = createMockTheme({ id: 1 });
        const newTheme = createMockTheme({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingTheme.id]: existingTheme,
          },
          allIds: [existingTheme.id],
        });
        const expectedState = createMockState({
          ...createEmptyState(),
          byId: {
            [newTheme.id]: newTheme,
          },
          allIds: [newTheme.id],
        });

        const newState = themesReducer(currentState, {
          type: types.SET_THEMES,
          themes: [newTheme],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_THEME", () => {
      it("should add a theme to an empty state", () => {
        const newTheme = createMockTheme();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newTheme.id]: newTheme,
          },
          allIds: [newTheme.id],
        });

        const newState = themesReducer(currentState, {
          type: types.ADD_THEME,
          theme: newTheme,
        });

        expect(newState).toEqual(expectedState);
      });

      it("should add a theme to a non-empty state", () => {
        const currentTheme = createMockTheme({ id: 1 });
        const newTheme = createMockTheme({ id: 2 });

        const currentState = createMockState({
          byId: {
            [currentTheme.id]: currentTheme,
          },
          allIds: [currentTheme.id],
        });
        const expectedState = createMockState({
          byId: {
            [currentTheme.id]: currentTheme,
            [newTheme.id]: newTheme,
          },
          allIds: [currentTheme.id, newTheme.id],
        });

        const newState = themesReducer(currentState, {
          type: types.ADD_THEME,
          theme: newTheme,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_THEMES", () => {
      it("adds themes to a non-empty state", () => {
        const existingTheme = createMockTheme({ id: 1 });
        const newTheme1 = createMockTheme({ id: 2 });
        const newTheme2 = createMockTheme({ id: 3 });

        const currentState = createMockState({
          byId: {
            [existingTheme.id]: existingTheme,
          },
          allIds: [existingTheme.id],
        });
        const expectedState = createMockState({
          ...createEmptyState(),
          byId: {
            [existingTheme.id]: existingTheme,
            [newTheme1.id]: newTheme1,
            [newTheme2.id]: newTheme2,
          },
          allIds: [existingTheme.id, newTheme1.id, newTheme2.id],
        });

        const newState = themesReducer(currentState, {
          type: types.ADD_THEMES,
          themes: [newTheme1, newTheme2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_THEME", () => {
      it("updates a theme", () => {
        const themeToLeaveAlone = createMockTheme({ id: 1 });
        const themeToUpdate = createMockTheme({ id: 2 });
        const attributesToUpdateWith = { name: "new theme name" };

        const currentState = createMockState({
          byId: {
            [themeToLeaveAlone.id]: themeToLeaveAlone,
            [themeToUpdate.id]: themeToUpdate,
          },
          allIds: [themeToLeaveAlone.id, themeToUpdate.id],
        });
        const expectedState = createMockState({
          byId: {
            [themeToLeaveAlone.id]: themeToLeaveAlone,
            [themeToUpdate.id]: { ...themeToUpdate, ...attributesToUpdateWith },
          },
          allIds: [themeToLeaveAlone.id, themeToUpdate.id],
        });

        const newState = themesReducer(currentState, {
          type: types.UPDATE_THEME,
          id: themeToUpdate.id,
          attributes: attributesToUpdateWith,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_THEMES", () => {
      it("updates multiple themes", () => {
        const theme = createMockTheme({ id: 1 });
        const themeToUpdate1 = createMockTheme({ id: 2 });
        const newThemeAttributes1 = { name: "new name 1" };
        const themeToUpdate2 = createMockTheme({ id: 2 });
        const newThemeAttributes2 = { name: "new name 2" };

        const currentState = createMockState({
          byId: {
            [theme.id]: theme,
            [themeToUpdate1.id]: themeToUpdate1,
            [themeToUpdate2.id]: themeToUpdate2,
          },
          allIds: [theme.id, themeToUpdate1.id, themeToUpdate2.id],
        });
        const expectedState = createMockState({
          byId: {
            [theme.id]: theme,
            [themeToUpdate1.id]: { ...themeToUpdate1, ...newThemeAttributes1 },
            [themeToUpdate2.id]: { ...themeToUpdate2, ...newThemeAttributes2 },
          },
          allIds: [theme.id, themeToUpdate1.id, themeToUpdate2.id],
        });

        const newState = themesReducer(currentState, {
          type: types.UPDATE_THEMES,
          themes: {
            [themeToUpdate1.id]: newThemeAttributes1,
            [themeToUpdate2.id]: newThemeAttributes2,
          },
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_THEME", () => {
      it("removes a theme", () => {
        const themeToDelete = createMockTheme({ id: 1 });
        const otherTheme = createMockTheme({ id: 2 });

        const currentState = createMockState({
          byId: {
            [themeToDelete.id]: themeToDelete,
            [otherTheme.id]: otherTheme,
          },
          allIds: [themeToDelete.id, otherTheme.id],
        });
        const expectedState = createMockState({
          byId: {
            [otherTheme.id]: otherTheme,
          },
          allIds: [otherTheme.id],
        });

        const newState = themesReducer(currentState, {
          type: types.REMOVE_THEME,
          id: themeToDelete.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_THEMES", () => {
      it("removes multiple themes", () => {
        const themeToRemain = createMockTheme({ id: 1 });
        const themeToDelete1 = createMockTheme({ id: 2 });
        const themeToDelete2 = createMockTheme({ id: 2 });

        const currentState = createMockState({
          byId: {
            [themeToRemain.id]: themeToRemain,
            [themeToDelete1.id]: themeToDelete1,
            [themeToDelete2.id]: themeToDelete2,
          },
          allIds: [themeToRemain.id, themeToDelete1.id],
        });

        const expectedState = createMockState({
          byId: {
            [themeToRemain.id]: themeToRemain,
          },
          allIds: [themeToRemain.id],
        });

        const newState = themesReducer(currentState, {
          type: types.REMOVE_THEMES,
          ids: [themeToDelete1.id, themeToDelete2.id],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("themeBundle action", () => {
    describe("themeBundles/ADD_THEME_BUNDLE", () => {
      it("adds a new theme from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { theme } = themeBundle;

        const currentState = createMockState({
          byId: {},
          allIds: [],
        });

        const expectedState = createMockState({
          byId: {
            [theme.id]: theme,
          },
          allIds: [theme.id],
        });

        const newState = themesReducer(currentState, {
          type: themeBundleTypes.ADD_THEME_BUNDLE,
          ...themeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("themeBundles/UPDATE_THEME_BUNDLE", () => {
      it("updates an existing theme from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { theme } = themeBundle;
        const modifiedTheme = { ...theme, name: "new theme name" };
        const modifiedThemeBundle = {
          ...themeBundle,
          theme: { ...modifiedTheme },
        };

        const currentState = createMockState({
          byId: {
            [theme.id]: theme,
          },
          allIds: [theme.id],
        });

        const expectedState = createMockState({
          byId: {
            [theme.id]: modifiedTheme,
          },
          allIds: [theme.id],
        });

        const newState = themesReducer(currentState, {
          type: themeBundleTypes.UPDATE_THEME_BUNDLE,
          ...modifiedThemeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });
});
