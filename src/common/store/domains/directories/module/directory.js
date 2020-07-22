import path from "path";
import { v4 as uuid } from "uuid";

export const TYPES = {
  theme: "theme",
  swatch: "swatch",
  template: "template",
};

// TODO - ideally there's only one source of truth for these
const FILENAME_EXTESION_TYPES = {
  theme: "theme.json",
  swatch: "swatch.json",
  template: "template.json",
};

export const create = (attributes = {}) => ({
  id: uuid(),
  type: "",
  filePath: "",
  ...attributes,
});

export const trimFilePath = (filePath) => {
  const directoryCutoff = 3;
  const pieces = filePath.split(path.sep);
  if (pieces.length <= directoryCutoff) {
    return filePath.join(path.sep);
  }
  const trimmedPieces = pieces.slice(-directoryCutoff);
  return `...${path.sep}${trimmedPieces.join(path.sep)}`;
};

export const getFilenameExtensionForType = (type) =>
  FILENAME_EXTESION_TYPES[type];
