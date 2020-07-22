import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);

import * as DirectoryModule from "common/store/domains/directories/module";

import * as themeFs from "common/store/domains/themes/fs";

import * as themeBundleActions from "common/store/domains/themeBundles/actions";

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

  const themeFilePaths = directoriesWithFiles.reduce(
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

  const themeBundles = await Promise.all(
    themeFilePaths.map(async ({ directory, fileName, fullFilePath }) => {
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

  console.log("themeBundles", themeBundles);
  // TODO - addOrUpdate
  return dispatch(themeBundleActions.addThemeBundles({ themeBundles }));
};

export default scanDirectoriesAndAddEntities;
