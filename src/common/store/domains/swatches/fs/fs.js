import fs from "fs";
import path from "path";
import util from "util";

import { normalize, denormalize } from "../module";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const SWATCH_FILENAME_EXTENSION = ".swatch.json";

const slugify = (str) => str.replace(/ /g, "-").toLowerCase();

const stringify = (obj) => JSON.stringify(obj, null, 4);

const getSwatchFilename = (swatch) =>
  `${slugify(swatch.name)}${SWATCH_FILENAME_EXTENSION}`;

export const loadSwatchFile = async (filePath) => {
  const rawContents = await readFile(filePath);
  const stringContents = rawContents.toString();
  const swatchData = JSON.parse(stringContents);
  const swatch = normalize(swatchData);
  return swatch;
};

export const saveSwatchFile = async (fullFilePath, swatch) => {
  const swatchData = denormalize(swatch);
  // const swatchDataWrapper = { swatch: swatchData };
  // const fileContents = stringify(swatchDataWrapper);
  const fileContents = stringify(swatchData);

  // TODO handle file save fail
  await writeFile(fullFilePath, fileContents);
};
