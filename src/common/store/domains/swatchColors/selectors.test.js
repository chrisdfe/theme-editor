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

describe("swatchColors selectors", () => {
  xdescribe("#getSwatchColorsList");

  describe("#getSwatchColorsList", () => {
    it("returns an array of swatch colors", () => {
      const mockSwatchColor = createMockSwatchColor();
      const state = {
        entities: {
          swatchColors: {
            byId: {
              [mockSwatchColor.id]: mockSwatchColor,
            },
            allIds: [mockSwatchColor.id],
          },
        },
      };

      const result = selectors.getSwatchColorsList(state);
      expect(result).toEqual([mockSwatchColor]);
    });

    it("returns an empty array when the state is empty", () => {
      const result = selectors.getSwatchColorsList(createEmptyState());
      expect(result).toEqual([]);
    });
  });

  xdescribe("#getSwatchColorById");

  describe("#getEditingSwatchColors", () => {
    it("returns the swatchColors editing state", () => {
      const mockSwatchColor = createMockSwatchColor();
      const swatchColors = [mockSwatchColor];

      const state = {
        entities: {},
        editing: {
          swatchColors: {
            byId: {
              [mockSwatchColor.id]: mockSwatchColor,
            },
            allIds: [mockSwatchColor.id],
          },
        },
      };

      const expectedResult = {
        byId: {
          [mockSwatchColor.id]: mockSwatchColor,
        },
        allIds: [mockSwatchColor.id],
      };

      const result = selectors.getEditingSwatchColors(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingSwatchColorsList", () => {
    it("returns an array of editing swatch colors", () => {
      const mockSwatchColor = createMockSwatchColor();
      const swatchColors = [mockSwatchColor];

      const state = {
        entities: {},
        editing: {
          swatchColors: {
            byId: {
              [mockSwatchColor.id]: mockSwatchColor,
            },
            allIds: [mockSwatchColor.id],
          },
        },
      };

      const expectedResult = swatchColors;

      const result = selectors.getEditingSwatchColorsList(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingSwatchColorsOriginalState", () => {
    it("returns the edited swatch colors' original state", () => {
      const originalSwatchColor = createMockSwatchColor();
      const originalSwatchColors = [originalSwatchColor];
      const modifiedSwatchColor = { ...originalSwatchColor, hex: "#333" };

      const state = {
        entities: {},
        editing: {
          swatchColors: {
            byId: {
              [originalSwatchColor.id]: modifiedSwatchColor,
            },
            allIds: [originalSwatchColor.id],
            originalState: {
              [originalSwatchColor.id]: originalSwatchColor,
            },
          },
        },
      };

      const expectedResult = originalSwatchColors;

      expect(selectors.getEditingSwatchColorsOriginalState(state)).toEqual(
        expectedResult
      );
    });
  });
});
