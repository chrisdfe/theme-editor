import { createMockColorTokenGroup, createMockColorToken } from "tests/utils";

import * as selectors from "./selectors";

describe("colorTokenGroup selectors", () => {
  describe("#getColorTokenGroupsByThemeId", () => {
    it("gets a list of colorTokenGroups withthe pecified themeId", () => {
      const colorTokenGroup1 = createMockColorTokenGroup({
        themeId: 1,
      });
      const colorTokenGroup2 = createMockColorTokenGroup({
        themeId: 1,
      });

      const state = {
        entities: {
          colorTokenGroups: {
            byId: {
              [colorTokenGroup1.id]: colorTokenGroup1,
              [colorTokenGroup2.id]: colorTokenGroup2,
            },
            allIds: [colorTokenGroup1.id, colorTokenGroup2.id],
          },
        },
      };

      const expectedResult = [colorTokenGroup1, colorTokenGroup2];
      const result = selectors.getColorTokenGroupsByThemeId(state, 1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getColorTokenGroupColorTokens", () => {
    it("gets a list of colorTokens", () => {
      const colorTokenGroup = createMockColorTokenGroup({ id: 5, themeId: 1 });
      const colorToken1 = createMockColorToken({ colorTokenGroupId: 5 });
      const colorToken2 = createMockColorToken({ colorTokenGroupId: 5 });

      const state = {
        entities: {
          colorTokenGroups: {
            byId: {
              [colorTokenGroup.id]: colorTokenGroup,
            },
            allIds: [colorTokenGroup.id],
          },
          colorTokens: {
            byId: {
              [colorToken1.id]: colorToken1,
              [colorToken2.id]: colorToken2,
            },
            allIds: [colorToken1.id, colorToken2.id],
          },
        },
      };

      const expectedResult = [colorToken1, colorToken2];
      expect(
        selectors.getColorTokenGroupColorTokens(state, colorTokenGroup)
      ).toEqual(expectedResult);
    });
  });

  xdescribe("#getColorTokenGroupsColorTokensFlatList");

  describe("#getEditingColorTokenGroups", () => {
    it("returns the colorTokenGroups editing state", () => {
      const mockColorTokenGroup = createMockColorTokenGroup();
      const colorTokenGroups = [mockColorTokenGroup];

      const state = {
        entities: {},
        editing: {
          colorTokenGroups: {
            byId: {
              [mockColorTokenGroup.id]: mockColorTokenGroup,
            },
            allIds: [mockColorTokenGroup.id],
          },
        },
      };

      const expectedResult = {
        byId: {
          [mockColorTokenGroup.id]: mockColorTokenGroup,
        },
        allIds: [mockColorTokenGroup.id],
      };

      const result = selectors.getEditingColorTokenGroups(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingColorTokenGroupsList", () => {
    it("returns an array of editing color token groups", () => {
      const mockColorTokenGroup = createMockColorTokenGroup();
      const colorTokenGroups = [mockColorTokenGroup];

      const state = {
        entities: {},
        editing: {
          colorTokenGroups: {
            byId: {
              [mockColorTokenGroup.id]: mockColorTokenGroup,
            },
            allIds: [mockColorTokenGroup.id],
          },
        },
      };

      const expectedResult = colorTokenGroups;

      const result = selectors.getEditingColorTokenGroupsList(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingColorTokenGroupsOriginalState", () => {
    it("returns the edited color token groups' original state", () => {
      const originalColorTokenGroup = createMockColorTokenGroup();
      const originalColorTokenGroups = [originalColorTokenGroup];
      const modifiedColorTokenGroup = {
        ...originalColorTokenGroup,
        name: "secondary",
      };

      const state = {
        entities: {},
        editing: {
          colorTokenGroups: {
            byId: {
              [originalColorTokenGroup.id]: modifiedColorTokenGroup,
            },
            allIds: [originalColorTokenGroup.id],
            originalState: {
              [originalColorTokenGroup.id]: originalColorTokenGroup,
            },
          },
        },
      };

      const expectedResult = originalColorTokenGroups;

      expect(selectors.getEditingColorTokenGroupsOriginalState(state)).toEqual(
        expectedResult
      );
    });
  });

  xdescribe("#getEditingColorTokenGroupColorTokensById");

  xdescribe("#getEditingColorTokenGroupColorTokensList");

  xdescribe("#getEditingColorTokenGroupsColorTokensFlatList");
});
