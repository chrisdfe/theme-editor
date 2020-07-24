import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);

import * as DirectoryModule from "common/store/domains/directories/module";

import * as themeFs from "common/store/domains/themes/fs";

import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import * as swatchFs from "common/store/domains/swatches/fs";
import * as swatchActions from "common/store/domains/swatches/actions";

import * as swatchColorActions from "common/store/domains/swatchColors/actions";

const addThemeBundles = async (entityFilePaths, dispatch) => {
  const themeBundles = await Promise.all(
    entityFilePaths.map(async ({ directory, fileName, fullFilePath }) => {
      const themeBundle = await themeFs.loadThemeFile(fullFilePath);
      return {
        ...themeBundle,
        theme: {
          ...themeBundle.theme,
          // TODO - think about whether this should live in a separate
          //        lookup table or not (e.g themeDirectories)
          directoryId: directory.id,
          fileName,
          fullFilePath,
        },
      };
    })
  );

  // TODO - addOrUpdate
  return dispatch(themeBundleActions.addThemeBundles({ themeBundles }));
};

const addSwatches = async (entityFilePaths, dispatch) => {
  const swatchBundles = await Promise.all(
    entityFilePaths.map(async ({ directory, fileName, fullFilePath }) => {
      const swatchBundle = await swatchFs.loadSwatchFile(fullFilePath);

      return {
        ...swatchBundle,
        swatch: {
          ...swatchBundle.swatch,
          // TODO - think about whether this should live in a separate
          //        lookup table or not (e.g swatchDirectories)
          directoryId: directory.id,
          fileName,
          fullFilePath,
        },
      };
    })
  );

  const swatches = swatchBundles.map(({ swatch }) => swatch);
  const swatchColors = swatchBundles.reduce(
    (acc, { swatchColors }) => [...acc, ...swatchColors],
    []
  );

  // TODO - addOrUpdate
  await dispatch(swatchColorActions.addSwatchColors({ swatchColors }));
  await dispatch(swatchActions.addSwatches({ swatches }));
};

const scanDirectoriesAndAddEntities = (payload = {}) => async (
  dispatch,
  getState
) => {
  const { type, directories } = payload;

  const filenameExtension = DirectoryModule.getFilenameExtensionForType(type);

  const directoriesWithFiles = await Promise.all(
    directories.map(async (directory) => {
      const { filePath } = directory;

      const files = await readdir(filePath);
      const filteredfiles = files.filter((file) =>
        file.endsWith(filenameExtension)
      );

      return { directory, files: filteredfiles };
    })
  );

  const entityFilePaths = directoriesWithFiles.reduce(
    (acc, { directory, files }) => {
      const directoryFiles = files.map((file) => ({
        directory,
        fileName: file,
        fullFilePath: path.join(directory.filePath, file),
      }));
      return [...acc, ...directoryFiles];
    },
    []
  );

  if (type === DirectoryModule.TYPES.theme) {
    return addThemeBundles(entityFilePaths, dispatch, getState);
  }

  if (type === DirectoryModule.TYPES.swatch) {
    return addSwatches(entityFilePaths, dispatch, getState);
  }
};

export default scanDirectoriesAndAddEntities;
