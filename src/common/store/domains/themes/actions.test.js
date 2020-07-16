import * as actions from "./actions";
import * as types from "./types";
import * as swatchTypes from "../swatches/types";
import * as colorTokenGroupTypes from "../colorTokenGroups/types";

import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import {
  createMockTheme,
  createMockSwatch,
  createMockColorTokenGroup,
  getActionTypes,
  getActionPayload,
  createGenericStateSlice,
  createMockStore,
} from "tests/utils";

const mockStore = createMockStore();

// TODO - mock selectors instead of doing this
const initialStoreState = {
  entities: {
    ...createGenericStateSlice("themes"),
    ...createGenericStateSlice("swatches"),
    ...createGenericStateSlice("colorTokenGroups"),
  },
};

describe("theme actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialStoreState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe("#addTheme", () => {
    describe("with a valid payload", () => {
      it("creates ADD_THEME", () => {
        const theme = createMockTheme();
        store.dispatch(actions.addTheme({ theme }));
        expect(getActionTypes(store)).toContain(types.ADD_THEME);
      });

      it("sends the expected payload", () => {
        const theme = createMockTheme();
        store.dispatch(actions.addTheme({ theme }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ theme });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.addTheme())).toThrow(PayloadError);
      });
    });
  });

  describe("#addThemes", () => {
    it("creates the ADD_THEMES action", async () => {
      const newTheme = createMockTheme();
      const themes = [newTheme];
      await store.dispatch(actions.addThemes({ themes }));

      expect(getActionTypes(store)).toContain(types.ADD_THEMES);
    });
  });

  xdescribe("#fetchThemes");

  describe("#createTheme", () => {
    describe("creates actions", () => {
      let theme;

      beforeEach(async () => {
        theme = createMockTheme();
        return await store.dispatch(actions.createTheme({ theme }));
      });

      it("ADD_THEME", async () => {
        expect(getActionTypes(store)).toContain(types.ADD_THEME);
      });

      it("ADD_SWATCH", async () => {
        expect(getActionTypes(store)).toContain(swatchTypes.ADD_SWATCH);
      });

      it("ADD_COLOR_TOKEN_GROUP", async () => {
        expect(getActionTypes(store)).toContain(
          colorTokenGroupTypes.ADD_COLOR_TOKEN_GROUP
        );
      });
    });

    describe("validation", () => {
      it("does not have an errors for a valid theme", async () => {
        const store = mockStore({ themes: [] });

        const newTheme = createMockTheme();

        await expect(
          store.dispatch(actions.createTheme({ id: 1 }))
        ).rejects.not.toBeUndefined();
      });

      xdescribe("creates errors for an invalid theme");
    });
  });

  describe("#updateTheme", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_THEME", async () => {
        const theme = createMockTheme();
        const attributes = { name: "new theme name" };
        await store.dispatch(actions.updateTheme({ id: theme.id, attributes }));
        expect(getActionTypes(store)).toContain(types.UPDATE_THEME);
      });

      it("sends the expected payload", () => {
        const theme = createMockTheme();
        const attributes = { name: "new theme name" };

        store.dispatch(actions.updateTheme({ id: theme.id, attributes }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: theme.id, attributes });
      });

      xdescribe("theme validation", () => {
        xdescribe("invalid theme");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(store.dispatch(actions.updateTheme())).rejects.toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#updateThemes", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_THEMES", async () => {
        const themes = {
          1: { name: "new theme name" },
          2: { name: "another new theme name" },
        };
        await store.dispatch(actions.updateThemes({ themes }));
        expect(getActionTypes(store)).toContain(types.UPDATE_THEMES);
      });

      it("sends the expected payload", async () => {
        const themes = {
          1: { name: "new theme name" },
          2: { name: "another new theme name" },
        };

        await store.dispatch(actions.updateThemes({ themes }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ themes });
      });

      xdescribe("swatch validation", () => {
        xdescribe("invalid swatch");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(store.dispatch(actions.updateThemes())).rejects.toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#removeThemeById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_THEME", () => {
        const { id } = createMockTheme();
        store.dispatch(actions.removeThemeById({ id }));
        expect(getActionTypes(store)).toContain(types.REMOVE_THEME);
      });

      it("sends the expected payload", () => {
        const { id } = createMockTheme();
        store.dispatch(actions.removeThemeById({ id }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id });
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeThemeById())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#removeThemesById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_THEMES", () => {
        const theme = createMockTheme();

        const ids = [theme.id];
        store.dispatch(actions.removeThemesById({ ids }));

        expect(getActionTypes(store)).toContain(types.REMOVE_THEMES);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeThemesById())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#deleteThemeById", () => {
    beforeEach(() => {
      store = mockStore({
        entities: {
          ...initialStoreState.entities,
          themes: {
            byId: {
              1: createMockTheme({ id: 1 }),
            },
            allIds: [1],
          },
          swatches: {
            byId: {
              1: createMockSwatch({ id: 1, themeId: 1 }),
            },
            allIds: [1],
          },
          colorTokenGroups: {
            byId: {
              1: createMockColorTokenGroup({ id: 1, themeId: 1 }),
            },
            allIds: [1],
          },
        },
      });
    });

    describe("with a valid payload", () => {
      describe("creates actions", () => {
        beforeEach(async () => {
          await store.dispatch(actions.deleteThemeById({ id: 1 }));
        });

        it("REMOVE_THEME", async () => {
          expect(getActionTypes(store)).toContain(types.REMOVE_THEME);
        });

        it("REMOVE_SWATCH", () => {
          expect(getActionTypes(store)).toContain(swatchTypes.REMOVE_SWATCH);
        });

        it("REMOVE_COLOR_TOKEN_GROUPS", () => {
          expect(getActionTypes(store)).toContain(
            colorTokenGroupTypes.REMOVE_COLOR_TOKEN_GROUPS
          );
        });
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.deleteThemeById())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#deleteThemesById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_THEMES", async () => {
        const theme = createMockTheme();

        const ids = [theme.id];
        await store.dispatch(actions.deleteThemesById({ ids }));

        expect(getActionTypes(store)).toContain(types.REMOVE_THEMES);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.deleteThemesById())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  xdescribe("beginEditingTheme");

  xdescribe("beginEditingExistingTheme");

  xdescribe("createThemeAndBeginEditing");

  xdescribe("createThemeFromSwatchAndBeginEditing");

  xdescribe("saveEditedTheme");

  xdescribe("cancelEditingTheme");

  /*
  describe("#beginEditingTheme", () => {
    describe("with existing theme", () => {
      let themeToEdit;

      beforeEach(() => {
        themeToEdit = createMockTheme({ id: 1 });
        const swatchToEdit = createMockSwatch({
          id: 1,
          themeId: themeToEdit.id,
        });
        const colorTokenGroupToEdit = createMockColorTokenGroup({
          id: 1,
          themeId: themeToEdit.id,
        });

        // TODO - write action test that don't depend on state structure
        store = mockStore({
          themes: {
            byId: {
              [themeToEdit.id]: themeToEdit,
            },
            allIds: [themeToEdit.id],
            currentEditId: null,
          },
          swatches: {
            byId: {
              [swatchToEdit.id]: swatchToEdit,
            },
            allIds: [swatchToEdit.id],
          },
          colorTokenGroups: {
            byId: {
              [colorTokenGroupToEdit.id]: colorTokenGroupToEdit,
            },
            allIds: [colorTokenGroupToEdit.id],
          },
        });
      });
      it.each([
        types.EDIT_STARTED,
        types.ADD_THEME,
        swatchTypes.ADD_SWATCH,
        colorTokenGroupTypes.ADD_COLOR_TOKEN_GROUPS,
      ])("creates %s", async (actionType) => {
        await store.dispatch(actions.beginEditingTheme({ id: themeToEdit.id }));
        expect(getActionTypes(store)).toContain(actionType);
      });
    });

    describe("for a new theme", () => {
      it.each([
        types.EDIT_STARTED,
        types.ADD_THEME,
        swatchTypes.ADD_SWATCH,
        colorTokenGroupTypes.ADD_COLOR_TOKEN_GROUP,
      ])("creates %s", async (actionType) => {
        await store.dispatch(actions.beginEditingTheme());
        expect(getActionTypes(store)).toContain(actionType);
      });
    });
  });*/

  xdescribe("#saveEditedTheme");
  xdescribe("#cancelEditingTheme");
});
