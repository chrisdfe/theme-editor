import {
  createMockThemeBundle,
  getActionTypes,
  getActionPayload,
  createMockStore,
  createGenericStateSlice,
} from "tests/utils";

import * as themeTypes from "../themes/types";
import * as themeSelectors from "../themes/selectors";
import * as themeFs from "../themes/fs";

import * as ThemeBundleModule from "./module/themeBundle";
import * as actions from "./actions";
import * as types from "./types";
import * as selectors from "./selectors";

const mockStore = createMockStore();

const initialStoreState = {
  ...createGenericStateSlice("themes"),
  ...createGenericStateSlice("swatches"),
  ...createGenericStateSlice("swatchColors"),
  ...createGenericStateSlice("colorTokenGroups"),
  ...createGenericStateSlice("colorTokens"),
};

jest.mock("../themes/fs");

describe("themeBundle actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialStoreState);
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe("#addThemeBundle", () => {
    it("creates ADD_THEME_BUNDLE", async () => {
      const themeBundle = createMockThemeBundle();

      await store.dispatch(actions.addThemeBundle({ themeBundle }));

      expect(getActionTypes(store)).toContain(types.ADD_THEME_BUNDLE);
    });

    it("sends the expected payload", async () => {
      const themeBundle = createMockThemeBundle();

      await store.dispatch(actions.addThemeBundle({ themeBundle }));

      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toHaveProperty(
        "theme",
        "swatch",
        "swatchColors",
        "colorTokenGroups",
        "colorTokens"
      );
    });
  });

  describe("#updateThemeBundle", () => {
    let themeBundle;

    beforeEach(async () => {
      themeBundle = createMockThemeBundle();

      await store.dispatch(actions.updateThemeBundle({ themeBundle }));
    });

    it("creates UPDATE_THEME_BUNDLE", async () => {
      expect(getActionTypes(store)).toContain(types.UPDATE_THEME_BUNDLE);
    });

    it("sends the expected payload", async () => {
      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toHaveProperty(
        "theme",
        "swatch",
        "swatchColors",
        "colorTokenGroups",
        "colorTokens"
      );
    });
  });

  xdescribe("#deleteThemeBundleById");

  describe("loadThemeBundleFromFile", () => {
    beforeEach(async () => {
      themeFs.loadThemeFile.mockImplementationOnce(() => themeBundle);

      const themeBundle = createMockThemeBundle();

      const filePath = "/mock-file-path/mock.theme.json";
      await store.dispatch(actions.loadThemeBundleFromFile({ filePath }));
    });

    it("loads a theme from a file", async () => {
      expect(themeFs.loadThemeFile).toHaveBeenCalled();
    });

    it("creates ADD_THEME_BUNDLE", async () => {
      expect(getActionTypes(store)).toContain(types.ADD_THEME_BUNDLE);
    });
  });

  describe("#beginEditingThemeBundle", () => {
    it("creates EDIT_STARTED", () => {
      const themeBundle = createMockThemeBundle();

      store.dispatch(actions.beginEditingThemeBundle({ themeBundle }));

      expect(getActionTypes(store)).toContain(themeTypes.EDIT_STARTED);
    });

    it("sends the expected payload", () => {
      const themeBundle = createMockThemeBundle();

      store.dispatch(actions.beginEditingThemeBundle({ themeBundle }));

      const actionPayload = getActionPayload(store.getActions()[0]);

      expect(actionPayload).toHaveProperty(
        "theme",
        "swatch",
        "swatchColors",
        "colorTokenGroups",
        "colorTokens"
      );
    });
  });

  describe("#beginEditingExistingTheme", () => {
    let themeBundle;

    beforeEach(async () => {
      themeBundle = createMockThemeBundle();
      const { theme } = themeBundle;

      selectors.getThemeBundleByThemeId = jest.fn();
      selectors.getThemeBundleByThemeId.mockImplementationOnce(
        () => themeBundle
      );

      await store.dispatch(
        actions.beginEditingExistingThemeBundle({ id: theme.id })
      );
    });

    it("creates EDIT_STARTED", async () => {
      expect(getActionTypes(store)).toContain(themeTypes.EDIT_STARTED);
    });

    it("sends the expected payload", async () => {
      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toMatchObject(themeBundle);
    });
  });

  describe("#createThemeBundleAndBeginEditing", () => {
    let themeBundle;

    beforeEach(async () => {
      themeBundle = createMockThemeBundle();

      ThemeBundleModule.create = jest.fn();
      ThemeBundleModule.create.mockImplementationOnce(() => themeBundle);

      await store.dispatch(
        actions.createThemeBundleAndBeginEditing(themeBundle)
      );
    });

    it("creates EDIT_STARTED", async () => {
      expect(getActionTypes(store)).toContain(themeTypes.EDIT_STARTED);
    });

    it("calls ThemeBundleModule.create", () => {
      expect(ThemeBundleModule.create).toHaveBeenCalled();
    });

    it("sends the expected payload", async () => {
      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toMatchObject(themeBundle);
    });
  });

  xdescribe("#createThemeBundleFromSwatchAndBeginEditing");

  xdescribe("#cancelEditingThemeBundle");

  xdescribe("#saveEditedThemeBundle");
});
