const uuid = require("uuid").v4;
const fs = require("fs");
const path = require("path");
const util = require("util");
const xmlParser = require("fast-xml-parser");
const { JSDOM } = require("jsdom");
const { uniq } = require("lodash");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// const testFilepath = path.resolve(__dirname, "..", "raw", "monokai.tmTheme");
const SWATCHES_BASE_PATH = path.resolve(__dirname, "..", "swatches");
const SUBLIME_SWATCHES_BASE_PATH = path.resolve(
  SWATCHES_BASE_PATH,
  "source",
  "sublime"
);
const OUTPUT_PATH = path.resolve(SWATCHES_BASE_PATH, "parsed");

// "peacocks-in-space.tmTheme"
// "monokai.tmTheme"

const isHex = (str) => /#\w{3,6}/.test(str);

const getThemeFileContents = async (filename) => {
  const fullFilepath = path.resolve(SUBLIME_SWATCHES_BASE_PATH, filename);
  const contentsBuffer = await readFile(fullFilepath);
  const contents = contentsBuffer.toString();
  return contents;
};

const buildJSONFromTree = (branch, tagName = "dict") => {
  if (tagName === "array") {
    // Assume every array child is going to be a 'dict', at this point
    return Array.from(branch).map((child, index) => {
      return buildJSONFromTree(child.children, child.tagName);
    });
  }

  let currentKey = null;
  return Array.from(branch).reduce((acc, child, index) => {
    if (child.tagName === "key") {
      currentKey = child.textContent;
      return acc;
    }

    // TODO - check for currentKey before using it
    if (child.tagName === "string") {
      return { ...acc, [currentKey]: child.textContent };
    }

    return {
      ...acc,
      [currentKey]: buildJSONFromTree(child.children, child.tagName),
    };
  }, {});
};

// sublime theme -> denormalized swatch
const parseSublimeTheme = async (filename) => {
  const contents = await getThemeFileContents(filename);
  const dom = new JSDOM(contents, { contentType: "text/xml" });
  const topLevelChildren = dom.window.document
    .querySelector("plist")
    .querySelector("dict").children;

  const result = buildJSONFromTree(topLevelChildren);

  const { name } = result;
  const settings = result.settings[0].settings;

  const colors = uniq(
    Object.keys(settings)
      .map((key) => settings[key])
      .filter(isHex)
  );

  const swatchColors = colors.map((hex) => ({ id: uuid(), hex }));

  const swatch = {
    id: uuid(),
    name,
    swatchColors,
  };

  return swatch;
};

const writeParsedTheme = async (filename, contents) => {
  const fullFilepath = path.resolve(OUTPUT_PATH, filename);
  await writeFile(fullFilepath, contents);
};

const parseSublimeThemeAndWrite = async (filename) => {
  const swatch = await parseSublimeTheme(filename);
  const outputFilename = filename.replace(".tmTheme", ".swatch.json");
  const fileContents = { swatch };
  const stringifiedContents = JSON.stringify(fileContents, null, 4);
  await writeParsedTheme(outputFilename, stringifiedContents);
};

const run = async () => {
  // const filename = "monokai.tmTheme";
  const sublimeThemes = await readdir(SUBLIME_SWATCHES_BASE_PATH);
  const promises = sublimeThemes.map((fullFilename) =>
    parseSublimeThemeAndWrite(fullFilename)
  );

  await Promise.all(promises);

  console.log("done.");
};

run();
