import fs from "fs";
import path from "path";
import util from "util";
import { remote } from "electron";

import { normalize, denormalize } from "../module";

const { dialog } = remote;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const THEME_FILENAME_EXTENSION = ".theme.json";

const slugify = (str) => str.replace(/ /g, "-").toLowerCase();

const stringify = (obj) => JSON.stringify(obj, null, 4);

const getThemeFilename = (theme) =>
  `${slugify(theme.name)}${THEME_FILENAME_EXTENSION}`;

export const loadThemeFile = async (filePath) => {
  const rawContents = await readFile(filePath);
  const stringContents = rawContents.toString();
  const themeData = JSON.parse(stringContents);
  const { theme } = themeData;
  const themeBundle = normalize(theme);
  return themeBundle;
};

// themeBundle = { theme, swatch, swatchColors, colorTokenGorups, colorTokens }
export const saveThemeFile = async (fullFilePath, themeBundle) => {
  const theme = denormalize(themeBundle);
  const themeWrapper = { theme };
  const fileContents = stringify(themeWrapper);

  // TODO handle file save fail
  await writeFile(fullFilePath, fileContents);
};

export const getNewThemeFilePathFromDialog = async (theme) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  const { canceled, filePaths } = result;

  if (canceled) {
    return;
  }

  const [filePath] = filePaths;
  return path.join(filePath, getThemeFilename(theme));
};

export const getExistingThemeFilePathFromDialog = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      {
        extensions: [THEME_FILENAME_EXTENSION],
      },
    ],
  });

  if (canceled) {
    return;
  }

  const [filePath] = filePaths;
  return filePath;
};

export const loadThemeFileFromDialog = async () => {
  const filePath = await getExistingThemeFilePathFromDialog();
  if (!filePath) {
    return;
  }
  return loadThemeFile(filePath);
};
