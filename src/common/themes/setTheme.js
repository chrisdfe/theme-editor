// TODO - import conditionally based on environment (chrome/electron)
import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);

const SRC = path.resolve(__dirname, "..");
const THEMES_DIR = path.join(SRC, "themes", "builtin");

const parseThemeFileContents = (contents) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(contents, "image/svg+xml");

  const background = doc.getElementById("background").attributes.fill.value;

  const circleElements = doc.getElementsByTagName("circle");
  const themeMap = Array.from(circleElements).reduce(
    (acc, element) => {
      const id = element.attributes.id.value;
      const fill = element.attributes.fill.value;
      return { ...acc, [id]: fill };
    },
    { background }
  );
  return themeMap;
};

const cssVariablesFromThemeMap = (themeMap) => {
  return `
    :root {
      ${Object.keys(themeMap)
        .map((key) => `--${key}: ${themeMap[key]}`)
        .join("; \n")}
    }
  `;
};

const prependThemeStyleElement = (themeMap) => {
  let styleElement = document.getElementById("theme-variables");
  if (styleElement === null) {
    const head = document.getElementsByTagName("head")[0];
    styleElement = document.createElement("style");
    styleElement.setAttribute("id", "theme-variables");
    head.prepend(styleElement);
  }
  styleElement.innerText = "";
  const styleElementContent = document.createTextNode(
    cssVariablesFromThemeMap(themeMap)
  );
  styleElement.appendChild(styleElementContent);
};

export const setThemeFromString = (contents) => {
  const themeMap = parseThemeFileContents(contents);
  prependThemeStyleElement(themeMap);
};

export const setThemeFromFile = (themeType, filepath) => {
  // Make sure the path is the right format
  if (!filepath.endsWith(".svg")) {
    console.log("Theme file must be an svg");
    return;
  }

  const contentsBuffer = fs.readFileSync(
    path.join(THEMES_DIR, themeType, filepath)
  );
  const contents = contentsBuffer.toString();

  setThemeFromString(contents);
};

export const getBuiltinThemesList = async () => {
  const files = await readdir(path.join(THEMES_DIR, "svg"));
  const filteredFiles = files.filter((filename) => filename !== ".DS_Store");

  const themeList = filteredFiles.map((filename) => {
    const title = filename.replace(/.svg$/, "");
    return {
      title,
      filename: filename,
    };
  });

  return themeList;
};
