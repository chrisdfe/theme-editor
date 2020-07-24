import { createSelector } from "reselect";

import * as DirectoryModule from "./module";

export const getDirectories = (state) => state.entities.directories;

export const getDirectoriesList = createSelector(
  getDirectories,
  ({ byId, allIds }) => allIds.map((id) => byId[id])
);

export const getThemeDirectoriesList = createSelector(
  getDirectoriesList,
  (directories) =>
    directories.filter(
      (directory) => directory.type === DirectoryModule.TYPES.theme
    )
);

export const getSwatchDirectoriesList = createSelector(
  getDirectoriesList,
  (directories) =>
    directories.filter(
      (directory) => directory.type === DirectoryModule.TYPES.swatch
    )
);
