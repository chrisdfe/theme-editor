import * as types from "common/store/domains/colorTokenGroups/types";
import * as colorTokenTypes from "common/store/domains/colorTokens/types";
import * as themeBundleTypes from "common/store/domains/themeBundles/types";

import {
  createMockColorTokenGroup,
  createMockColorToken,
  createMockThemeBundle,
} from "tests/utils";

import colorTokenGroupsReducer from "./colorTokenGroups";

const createEmptyState = () => ({ byId: {}, allIds: [] });
const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

describe("colorTokenGroupsReducer", () => {
  it("should return the initial state", () => {
    expect(colorTokenGroupsReducer(undefined, {})).toEqual(createEmptyState());
  });

  describe("colorTokenGroup actions", () => {
    xdescribe("SET_COLOR_TOKEN_GROUP");

    describe("SET_COLOR_TOKEN_GROUPS", () => {
      it("should replace an empty state", () => {
        const newColorTokenGroup = createMockColorTokenGroup();

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newColorTokenGroup.id]: newColorTokenGroup,
          },
          allIds: [newColorTokenGroup.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.SET_COLOR_TOKEN_GROUPS,
          colorTokenGroups: [newColorTokenGroup],
        });

        expect(newState).toEqual(expectedState);
      });

      it("should replace a non-empty state", () => {
        const existingColorTokenGroup = createMockColorTokenGroup({ id: 1 });
        const newColorTokenGroup = createMockColorTokenGroup({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingColorTokenGroup.id]: existingColorTokenGroup,
          },
          allIds: [existingColorTokenGroup.id],
        });
        const expectedState = createMockState({
          byId: {
            [newColorTokenGroup.id]: newColorTokenGroup,
          },
          allIds: [newColorTokenGroup.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.SET_COLOR_TOKEN_GROUPS,
          colorTokenGroups: [newColorTokenGroup],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_COLOR_TOKEN_GROUP", () => {
      it("should add a color token to an empty state", () => {
        const newColorTokenGroup = createMockColorTokenGroup({ id: 1 });

        const currentState = createEmptyState();
        const expectedState = createMockState({
          byId: {
            [newColorTokenGroup.id]: newColorTokenGroup,
          },
          allIds: [newColorTokenGroup.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.ADD_COLOR_TOKEN_GROUP,
          colorTokenGroup: newColorTokenGroup,
        });

        expect(newState).toEqual(expectedState);
      });

      it("should add a theme to a non-empty state", () => {
        const existingColorTokenGroup = createMockColorTokenGroup({ id: 2 });
        const newColorTokenGroup = createMockColorTokenGroup({ id: 2 });

        const currentState = createMockState({
          byId: {
            [existingColorTokenGroup.id]: existingColorTokenGroup,
          },
          allIds: [existingColorTokenGroup.id],
        });

        const expectedState = createMockState({
          byId: {
            [existingColorTokenGroup.id]: existingColorTokenGroup,
            [newColorTokenGroup.id]: newColorTokenGroup,
          },
          allIds: [existingColorTokenGroup.id, newColorTokenGroup.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.ADD_COLOR_TOKEN_GROUP,
          colorTokenGroup: newColorTokenGroup,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_COLOR_TOKEN_GROUPS", () => {
      it("add swatches to a non-empty state", () => {
        const existingColorTokenGroup = createMockColorTokenGroup({ id: 1 });
        const newColorTokenGroup1 = createMockColorTokenGroup({ id: 2 });
        const newColorTokenGroup2 = createMockColorTokenGroup({ id: 3 });

        const currentState = createMockState({
          byId: {
            [existingColorTokenGroup.id]: existingColorTokenGroup,
          },
          allIds: [existingColorTokenGroup.id],
        });
        const expectedState = createMockState({
          byId: {
            [existingColorTokenGroup.id]: existingColorTokenGroup,
            [newColorTokenGroup1.id]: newColorTokenGroup1,
            [newColorTokenGroup2.id]: newColorTokenGroup2,
          },
          allIds: [
            existingColorTokenGroup.id,
            newColorTokenGroup1.id,
            newColorTokenGroup2.id,
          ],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.ADD_COLOR_TOKEN_GROUPS,
          colorTokenGroups: [newColorTokenGroup1, newColorTokenGroup2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_COLOR_TOKEN_GROUP", () => {
      it("should update a color token group", () => {
        const colorTokenGroupToLeaveAlone = createMockColorTokenGroup({
          name: "primary",
        });
        const colorTokenGrouptoUpdate = createMockColorTokenGroup({
          id: 1,
          name: "secondary",
        });
        const attributes = { name: "tertiary" };

        const currentState = createMockState({
          byId: {
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
            [colorTokenGrouptoUpdate.id]: colorTokenGrouptoUpdate,
          },
          allIds: [colorTokenGroupToLeaveAlone.id, colorTokenGrouptoUpdate.id],
        });
        const expectedState = createMockState({
          byId: {
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
            [colorTokenGrouptoUpdate.id]: {
              ...colorTokenGrouptoUpdate,
              ...attributes,
            },
          },
          allIds: [colorTokenGroupToLeaveAlone.id, colorTokenGrouptoUpdate.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.UPDATE_COLOR_TOKEN_GROUP,
          id: colorTokenGrouptoUpdate.id,
          attributes,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("UPDATE_COLOR_TOKEN_GROUPS", () => {
      it("updates multiple colorTokenGroups", () => {
        const colorTokenToLeaveAlone = createMockColorTokenGroup({ id: 1 });
        const colorTokenGroupToUpdate1 = createMockColorTokenGroup({ id: 2 });
        const newColorTokenGroupAttributes1 = { name: "new name 1" };
        const colorTokenGroupToUpdate2 = createMockColorTokenGroup({ id: 2 });
        const newColorTokenGroupAttributes2 = { name: "new name 2" };

        const currentState = createMockState({
          byId: {
            [colorTokenToLeaveAlone.id]: colorTokenToLeaveAlone,
            [colorTokenGroupToUpdate1.id]: colorTokenGroupToUpdate1,
            [colorTokenGroupToUpdate2.id]: colorTokenGroupToUpdate2,
          },
          allIds: [
            colorTokenToLeaveAlone.id,
            colorTokenGroupToUpdate1.id,
            colorTokenGroupToUpdate2.id,
          ],
        });
        const expectedState = createMockState({
          byId: {
            [colorTokenToLeaveAlone.id]: colorTokenToLeaveAlone,
            [colorTokenGroupToUpdate1.id]: {
              ...colorTokenGroupToUpdate1,
              ...newColorTokenGroupAttributes1,
            },
            [colorTokenGroupToUpdate2.id]: {
              ...colorTokenGroupToUpdate2,
              ...newColorTokenGroupAttributes2,
            },
          },
          allIds: [
            colorTokenToLeaveAlone.id,
            colorTokenGroupToUpdate1.id,
            colorTokenGroupToUpdate2.id,
          ],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.UPDATE_COLOR_TOKEN_GROUPS,
          colorTokenGroups: {
            [colorTokenGroupToUpdate1.id]: newColorTokenGroupAttributes1,
            [colorTokenGroupToUpdate2.id]: newColorTokenGroupAttributes2,
          },
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_COLOR_TOKEN_GROUP", () => {
      it("should remove a color token group", () => {
        const colorTokenGroupToDelete = createMockColorTokenGroup({
          id: 1,
          name: "untitled",
          themeId: 1,
        });
        const colorTokenGroupToLeaveAlone = createMockColorTokenGroup({
          id: 2,
          name: "primary",
          themeId: 1,
        });

        const currentState = createMockState({
          byId: {
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
            [colorTokenGroupToDelete.id]: colorTokenGroupToDelete,
          },
          allIds: [colorTokenGroupToLeaveAlone.id, colorTokenGroupToDelete.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroupToLeaveAlone.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.REMOVE_COLOR_TOKEN_GROUP,
          id: colorTokenGroupToDelete.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_COLOR_TOKEN_GROUPS", () => {
      it("removes multiple colorTokenGroups", () => {
        const colorTokenGroupToRemain = createMockColorTokenGroup({ id: 1 });
        const colorTokenGroupToDelete1 = createMockColorTokenGroup({ id: 2 });
        const colorTokenGroupToDelete2 = createMockColorTokenGroup({ id: 3 });

        const currentState = createMockState({
          byId: {
            [colorTokenGroupToRemain.id]: colorTokenGroupToRemain,
            [colorTokenGroupToDelete1.id]: colorTokenGroupToDelete1,
            [colorTokenGroupToDelete2.id]: colorTokenGroupToDelete2,
          },
          allIds: [colorTokenGroupToRemain.id, colorTokenGroupToDelete1.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenGroupToRemain.id]: colorTokenGroupToRemain,
          },
          allIds: [colorTokenGroupToRemain.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: types.REMOVE_COLOR_TOKEN_GROUPS,
          ids: [colorTokenGroupToDelete1.id, colorTokenGroupToDelete2.id],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("colorToken actions", () => {
    describe("ADD_COLOR_TOKEN", () => {
      it("updates colorTokenIds of the appropriate colorTokenGroup", () => {
        const colorTokenGroup = createMockColorTokenGroup({ id: 10 });
        const colorTokenGroupToLeaveAlone = createMockColorTokenGroup({
          id: 2,
        });

        const newColorToken = createMockColorToken({
          id: 1,
          colorTokenGroupId: colorTokenGroup.id,
        });

        const currentState = createMockState({
          byId: {
            [colorTokenGroup.id]: colorTokenGroup,
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenGroup.id]: {
              ...colorTokenGroup,
              colorTokenIds: [newColorToken.id],
            },
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: colorTokenTypes.ADD_COLOR_TOKEN,
          colorToken: newColorToken,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("ADD_COLOR_TOKENS", () => {
      it("updates the appropriate colorTokenGroup", () => {
        const colorTokenGroup = createMockColorTokenGroup({ id: 10 });
        const colorTokenGroupToLeaveAlone = createMockColorTokenGroup({
          id: 2,
        });

        const newColorToken1 = createMockColorToken({
          id: 1,
          colorTokenGroupId: colorTokenGroup.id,
        });
        const newColorToken2 = createMockColorToken({
          id: 2,
          colorTokenGroupId: colorTokenGroup.id,
        });

        const currentState = createMockState({
          byId: {
            [colorTokenGroup.id]: colorTokenGroup,
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenGroup.id]: {
              ...colorTokenGroup,
              colorTokenIds: [newColorToken1.id, newColorToken2.id],
            },
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: colorTokenTypes.ADD_COLOR_TOKENS,
          colorTokens: [newColorToken1, newColorToken2],
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_COLOR_TOKEN", () => {
      it("updates the appropriate colorTokenGroup", () => {
        const colorToken = createMockColorToken({
          id: 1,
          colorTokenGroupId: 1,
        });
        const colorTokenIdToRemain = 2;

        const colorTokenGroup = createMockColorTokenGroup({
          id: 1,
          colorTokenIds: [colorToken.id, colorTokenIdToRemain],
        });
        const colorTokenGroupToLeaveAlone = createMockColorTokenGroup({
          id: 2,
        });

        const currentState = createMockState({
          byId: {
            [colorTokenGroup.id]: colorTokenGroup,
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenGroup.id]: {
              ...colorTokenGroup,
              colorTokenIds: [colorTokenIdToRemain],
            },
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: colorTokenTypes.REMOVE_COLOR_TOKEN,
          id: colorToken.id,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("REMOVE_COLOR_TOKENS", () => {
      it("updates the appropriate colorTokenIds fields", () => {
        const colorTokenIdToRemove = 1;
        const colorTokenGroupIdToRemain = 2;

        const colorTokenGroup = createMockColorTokenGroup({
          id: 1,
          colorTokenIds: [colorTokenIdToRemove, colorTokenGroupIdToRemain],
        });

        const colorTokenGroupToLeaveAlone = createMockColorTokenGroup({
          id: 2,
          colorTokenIds: [colorTokenGroupIdToRemain],
        });

        const currentState = createMockState({
          byId: {
            [colorTokenGroup.id]: colorTokenGroup,
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const expectedState = createMockState({
          byId: {
            [colorTokenGroup.id]: {
              ...colorTokenGroup,
              colorTokenIds: [colorTokenGroupIdToRemain],
            },
            [colorTokenGroupToLeaveAlone.id]: colorTokenGroupToLeaveAlone,
          },
          allIds: [colorTokenGroup.id, colorTokenGroupToLeaveAlone.id],
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: colorTokenTypes.REMOVE_COLOR_TOKENS,
          ids: [colorTokenIdToRemove],
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe("themeBundle actions", () => {
    describe("themeBundles/ADD_THEME_BUNDLE", () => {
      it("adds new color token groups from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { colorTokenGroups } = themeBundle;

        const currentState = createMockState({
          byId: {},
          allIds: [],
        });

        const expectedState = createMockState({
          byId: {
            ...colorTokenGroups.reduce(
              (acc, colorTokenGroup) => ({
                ...acc,
                [colorTokenGroup.id]: colorTokenGroup,
              }),
              {}
            ),
          },
          allIds: colorTokenGroups.map(({ id }) => id),
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: themeBundleTypes.ADD_THEME_BUNDLE,
          ...themeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });

    describe("themeBundles/UPDATE_THEME_BUNDLE", () => {
      it("updates an existing colorTokenGroups from the payload", () => {
        const themeBundle = createMockThemeBundle();
        const { colorTokenGroups } = themeBundle;
        const modifiedColorTokenGroups = [
          { ...colorTokenGroups[0], name: "secondary" },
        ];
        const modifiedThemeBundle = {
          ...themeBundle,
          colorTokenGroups: modifiedColorTokenGroups,
        };

        const currentState = createMockState({
          byId: {
            ...colorTokenGroups.reduce(
              (acc, colorTokenGroup) => ({
                ...acc,
                [colorTokenGroup.id]: colorTokenGroup,
              }),
              {}
            ),
          },
          allIds: colorTokenGroups.map(({ id }) => id),
        });

        const expectedState = createMockState({
          byId: {
            ...modifiedColorTokenGroups.reduce(
              (acc, colorTokenGroup) => ({
                ...acc,
                [colorTokenGroup.id]: colorTokenGroup,
              }),
              {}
            ),
          },
          allIds: modifiedColorTokenGroups.map(({ id }) => id),
        });

        const newState = colorTokenGroupsReducer(currentState, {
          type: themeBundleTypes.UPDATE_THEME_BUNDLE,
          ...modifiedThemeBundle,
        });

        expect(newState).toEqual(expectedState);
      });
    });
  });
});
