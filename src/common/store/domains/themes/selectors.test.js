import * as selectors from "./selectors";

import {
  createMockTheme,
  createMockSwatch,
  createMockColorTokenGroup,
} from "tests/utils";

describe("theme selectors", () => {
  describe("#getThemes", () => {
    it("returns the state themes", () => {
      const theme = createMockTheme();
      const state = {
        entities: {
          themes: {
            byId: {
              [theme.id]: theme,
            },
            allIds: [theme.id],
          },
        },
      };

      const expectedValue = {
        byId: {
          [theme.id]: theme,
        },
        allIds: [theme.id],
      };

      const result = selectors.getThemes(state);
      expect(result).toMatchObject(expectedValue);
    });
  });

  describe("#getThemesList", () => {
    it("returns a list of themes", () => {
      const theme1 = createMockTheme();
      const theme2 = createMockTheme();
      const state = {
        entities: {
          themes: {
            byId: {
              [theme1.id]: theme1,
              [theme2.id]: theme2,
            },
            allIds: [theme1.id, theme1.id],
          },
        },
      };

      const expectedValue = [theme1, theme2];

      const result = selectors.getThemesList(state);
      expect(result).toEqual(expectedValue);
    });
  });

  describe("#getSavedThemesList", () => {
    it("returns a list of themes that aren't currently being edited", () => {
      const theme1 = createMockTheme({ id: 1 });
      const theme2 = createMockTheme({ id: 2 });
      const themeBeingEdited = createMockTheme({ id: 3, isEditing: true });
      const state = {
        entities: {
          themes: {
            byId: {
              [theme1.id]: theme1,
              [theme2.id]: theme2,
              [themeBeingEdited.id]: themeBeingEdited,
            },
            allIds: [theme1.id, theme2.id, themeBeingEdited.id],
          },
        },
      };

      const expectedValue = [theme1, theme2];

      const result = selectors.getSavedThemesList(state);
      expect(result).toEqual(expectedValue);
    });
  });

  describe("#getThemeById", () => {
    const theme = createMockTheme();
    const state = {
      entities: {
        themes: {
          byId: {
            [theme.id]: theme,
          },
          allIds: [theme.id],
        },
      },
    };

    const expectedValue = theme;

    const result = selectors.getThemeById(state, theme.id);
    expect(result).toMatchObject(expectedValue);
  });

  describe("#getEditingTheme", () => {
    const anotherTheme = createMockTheme({ id: 1 });
    const themeBeingEdited = createMockTheme({ id: 2 });

    const state = {
      entities: {
        themes: {
          byId: {
            [anotherTheme.id]: anotherTheme,
          },
          allIds: [anotherTheme.id],
        },
      },
      editing: {
        themes: {
          byId: {
            [themeBeingEdited.id]: themeBeingEdited,
          },
          allIds: [themeBeingEdited.id],
        },
      },
    };

    const expectedValue = themeBeingEdited;

    const result = selectors.getEditingTheme(state);
    expect(result).toMatchObject(expectedValue);
  });

  describe("#getThemeSwatches", () => {
    const theme = createMockTheme({ id: 5 });
    const swatch = createMockSwatch({ themeId: 5 });
    const state = {
      entities: {
        themes: {
          byId: {
            [theme.id]: theme,
          },
          allIds: [theme.id],
        },
        swatches: {
          byId: {
            [swatch.id]: swatch,
          },
          allIds: [swatch.id],
        },
      },
    };

    const expectedValue = swatch;

    const result = selectors.getThemeSwatch(state, theme);
    expect(result).toMatchObject(expectedValue);
  });

  describe("#getThemeColorTokenGroups", () => {
    const theme = createMockTheme({ id: 5 });
    const colorTokenGroup = createMockColorTokenGroup({ themeId: 5 });

    const state = {
      entities: {
        themes: {
          byId: {
            [theme.id]: theme,
          },
          allIds: [theme.id],
        },
        colorTokenGroups: {
          byId: {
            [colorTokenGroup.id]: colorTokenGroup,
          },
          allIds: [colorTokenGroup.id],
        },
      },
    };

    const expectedValue = [colorTokenGroup];

    const result = selectors.getThemeColorTokenGroups(state, theme);
    expect(result).toMatchObject(expectedValue);
  });

  xdescribe("#getEditingTheme");

  xdescribe("#getEditingThemeOriginalState");

  xdescribe("#getEditingThemeSwatch");

  xdescribe("#getEditingThemeColorTokenGroups");

  describe("#getEditingThemeIsNew", () => {
    it("returns true if no corresponding theme exists in the entities state", () => {
      const editingTheme = createMockTheme({ id: 5 });

      const state = {
        entities: {
          themes: {
            byId: {},
            allIds: [],
          },
        },
        editing: {
          themes: {
            byId: {
              [editingTheme.id]: editingTheme,
            },
            allIds: [editingTheme.id],
            originalState: {
              [editingTheme.id]: editingTheme,
            },
          },
        },
      };

      const expectedResult = true;

      expect(selectors.getEditingThemeIsNew(state)).toEqual(expectedResult);
    });

    it("returns false of there is a corresponding theme in the entities state", () => {
      const editingTheme = createMockTheme({ id: 5 });

      const state = {
        entities: {
          themes: {
            byId: {
              [editingTheme.id]: editingTheme,
            },
            allIds: [editingTheme.id],
          },
        },
        editing: {
          themes: {
            byId: {
              [editingTheme.id]: editingTheme,
            },
            allIds: [editingTheme.id],
            originalState: {
              [editingTheme.id]: editingTheme,
            },
          },
        },
      };

      const expectedResult = false;

      expect(selectors.getEditingThemeIsNew(state)).toEqual(expectedResult);
    });
  });
});
