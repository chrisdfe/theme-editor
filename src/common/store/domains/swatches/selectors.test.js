import * as selectors from "./selectors";

import {
  createMockSwatch,
  createMockSwatchColor,
  createGenericStateSlice,
} from "tests/utils";

const createEmptyState = () => ({
  entities: {
    ...createGenericStateSlice("swatches"),
    ...createGenericStateSlice("swatchColors"),
  },
});

describe("swatches selectors", () => {
  xdescribe("#getSwatches");

  describe("#getSwatchesList", () => {
    it("returns an array of swatches", () => {
      const mockSwatch = createMockSwatch();
      const state = {
        entities: {
          swatches: {
            byId: {
              [mockSwatch.id]: mockSwatch,
            },
            allIds: [mockSwatch.id],
          },
        },
      };
      const result = selectors.getSwatchesList(state);
      expect(result).toEqual([mockSwatch]);
    });

    it("returns an empty array when the state is empty", () => {
      const result = selectors.getSwatchesList(createEmptyState());
      expect(result).toEqual([]);
    });
  });

  describe("#getThemelessSwatchesList", () => {
    it("returns an array of swatches without themes", () => {
      const mockSwatchWithoutTheme = createMockSwatch();
      const mockSwatchWithTheme = createMockSwatch({ id: 2, themeId: 1 });

      const state = {
        entities: {
          swatches: {
            byId: {
              [mockSwatchWithoutTheme.id]: mockSwatchWithoutTheme,
              [mockSwatchWithTheme.id]: mockSwatchWithTheme,
            },
            allIds: [mockSwatchWithoutTheme.id, mockSwatchWithTheme.id],
          },
        },
      };

      const expectedResult = [mockSwatchWithoutTheme];
      const result = selectors.getThemelessSwatchesList(state);

      expect(result).toEqual(expectedResult);
    });

    it("returns an empty array when the state is empty", () => {
      const result = selectors.getSwatchesList(createEmptyState());
      expect(result).toEqual([]);
    });
  });

  describe("#getSwatchById", () => {
    it("selects a swatch by id", () => {
      const targetMockSwatch = createMockSwatch({ id: 1 });
      const otherMockSwatch = createMockSwatch({ id: 2 });

      const state = {
        entities: {
          swatches: {
            byId: {
              [targetMockSwatch.id]: targetMockSwatch,
            },
            allIds: [targetMockSwatch.id],
          },
        },
      };

      const result = selectors.getSwatchById(state, targetMockSwatch.id);
      expect(result).toEqual(targetMockSwatch);
    });
  });

  describe("#getSwatchByThemeId", () => {
    it("selects a swatch by theme id", () => {
      const targetMockSwatch = createMockSwatch({ id: 1, themeId: 2 });

      const state = {
        entities: {
          swatches: {
            byId: {
              [targetMockSwatch.id]: targetMockSwatch,
            },
            allIds: [targetMockSwatch.id],
          },
        },
      };

      const result = selectors.getSwatchByThemeId(state, 2);
      expect(result).toEqual(targetMockSwatch);
    });
  });

  xdescribe("#getSwatchSwatchColors");

  describe("#getEditingSwatch", () => {
    it("selects the editing swatch", () => {
      const targetMockSwatch = createMockSwatch({ id: 1, themeId: 2 });

      const state = {
        entities: {},
        editing: {
          swatches: {
            byId: {
              [targetMockSwatch.id]: targetMockSwatch,
            },
            allIds: [targetMockSwatch.id],
            originalState: {
              [targetMockSwatch.id]: targetMockSwatch,
            },
          },
        },
      };

      const expectedResult = targetMockSwatch;

      const result = selectors.getEditingSwatch(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingSwatchOriginalState", () => {
    it("returns the edited swatch's original state", () => {
      const originalSwatch = createMockSwatch();
      const modifiedSwatch = { ...originalSwatch, name: "new name" };

      const state = {
        entities: {},
        editing: {
          swatches: {
            byId: {
              [originalSwatch.id]: modifiedSwatch,
            },
            allIds: [originalSwatch.id],
            originalState: {
              [originalSwatch.id]: originalSwatch,
            },
          },
        },
      };

      const expectedResult = originalSwatch;

      expect(selectors.getEditingSwatchOriginalState(state)).toEqual(
        expectedResult
      );
    });
  });

  xdescribe("#getEditingSwatchSwatchColors");

  xdescribe("#getEditingSwatchColorTokenGroups");
});
