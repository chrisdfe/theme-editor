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

const outputParsedTheme = async (filename, contents) => {
  const fullFilepath = path.resolve(OUTPUT_PATH, filename);
  await writeFile(fullFilepath, contents);
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

const parseSublimeTheme = async (filename) => {
  const contents = await getThemeFileContents(filename);
  const dom = new JSDOM(contents, { contentType: "text/xml" });
  const topLevelChildren = dom.window.document
    .querySelector("plist")
    .querySelector("dict").children;

  const result = buildJSONFromTree(topLevelChildren);

  const settings = result.settings[0].settings;
  const justColors = uniq(
    Object.keys(settings)
      .map((key) => settings[key])
      .filter(isHex)
  );

  const outputFilename = filename.replace(".tmTheme", ".json");
  const jsonifiedResult = JSON.stringify(justColors, null, 4);
  await outputParsedTheme(outputFilename, jsonifiedResult);
};

const run = async () => {
  // const filename = "monokai.tmTheme";
  const sublimeThemes = await readdir(SUBLIME_SWATCHES_BASE_PATH);
  const promises = sublimeThemes
    // .map((filename) => path.join(SUBLIME_SWATCHES_BASE_PATH, filename))
    .map((fullFilename) => parseSublimeTheme(fullFilename));

  await Promise.all(promises);

  // parseSublimeTheme(filename);
  // 2) generate just a de-duped array of colors to create a swatch out of

  console.log("done.");
};

run();
