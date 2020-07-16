import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const ROOT_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "..",
  "swatches",
  "parsed"
);

export const fetchSwatches = async () => {
  const swatchFiles = await readdir(ROOT_PATH);

  return swatchFiles.map((filename) => {
    const fullFileName = path.join(ROOT_PATH, filename);
    const rawContents = fs.readFileSync(fullFileName);
    const name = filename.replace(".json", "");
    const colors = JSON.parse(rawContents);
    return { name, colors };
  });
};
