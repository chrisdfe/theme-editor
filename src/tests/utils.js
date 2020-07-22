import { omit } from "lodash";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

export const createMockStore = () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  return mockStore;
};

export const getActionTypes = (store) =>
  store.getActions().map((action) => action.type);

export const getActionPayload = (action) => omit(action, ["type"]);

export const createGenericStateSlice = (key) => ({
  [key]: { byId: {}, allIds: [] },
});

export const createMockTheme = (attributes) => ({
  id: 1,
  name: "mock theme",
  directoryId: null,
  filename: null,
  ...attributes,
});

export const createMockSwatch = (attributes) => ({
  id: 1,
  name: "mock swatch",
  swatchColorIds: [],
  ...attributes,
});

export const createMockSwatchColor = (attributes) => ({
  id: 1,
  name: "mock swatch color",
  swatchId: 1,
  ...attributes,
});

export const createMockColorTokenGroup = (attributes) => ({
  id: 1,
  themeId: 1,
  name: "primary",
  colorTokenIds: [],
  ...attributes,
});

export const createMockColorToken = (attributes) => ({
  id: 1,
  colorTokenGroupId: 1,
  name: "background",
  ...attributes,
});

export const createMockDirectory = (attributes) => ({
  id: 1,
  path: "/test-directory-path/",
  ...attributes,
});

export const createMockThemeBundle = (params) => {
  const theme = createMockTheme();

  const swatch = createMockSwatch({ themeId: theme.id, swatchColorIds: [10] });
  const swatchColor1 = createMockSwatchColor({ id: 10, swatchId: swatch.id });
  const swatchColors = [swatchColor1];

  const colorTokenGroup = createMockColorTokenGroup({
    themeId: theme.id,
    colorTokenIds: [20],
  });
  const colorTokenGroups = [colorTokenGroup];
  const colorToken1 = createMockColorToken({
    id: 20,
    colorTokenGroupId: colorTokenGroup.id,
  });
  const colorTokens = [colorToken1];

  return {
    theme,
    swatch,
    swatchColors,
    colorTokenGroups,
    colorTokens,
    ...params,
  };
};
