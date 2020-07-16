const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const cssFileContents = (componentName) => `.${componentName} {
}`;

const componentFileContents = (componentName) =>
  `import React from "react";

import "./${componentName}.css";

const ${componentName} = () => {
  return (
    <div className="${componentName}">
      <h2>${componentName}</h2>
    </div>
  );
};

export default ${componentName};`;

const indexFileContents = (componentName) =>
  `export { default } from "./${componentName}";`;

const createFile = async (filePath, contents) => {
  // make sure file exists
  await exec(`touch ${filePath}`);
  // clear out file in case it already has contents
  await exec(`cp /dev/null ${filePath}`);
  // add contents to file
  await exec(`echo '${contents}' >> ${filePath}`);
};

const generateComponentAtPath = async (componentName, componentPath) => {
  const componentDirectory = path.join(
    __dirname,
    "..",
    "src",
    "renderer",
    "components",
    componentPath,
    componentName
  );

  const componentFile = path.join(componentDirectory, `${componentName}.js`);
  const cssFile = path.join(componentDirectory, `${componentName}.css`);
  const indexFile = path.join(componentDirectory, "index.js");

  // Create directory
  try {
    await exec(`mkdir -p ${componentDirectory}`);
  } catch (e) {
    if (!e.message.includes("File exists")) {
      throw e;
    }
  }

  // Create component file
  await createFile(componentFile, componentFileContents(componentName));

  // Create css file
  await createFile(cssFile, cssFileContents(componentName));

  // Create index file
  await createFile(indexFile, indexFileContents(componentName));
};

const argv = require("yargs")
  .command("$0 <name> <path>", "Generates a component", (yargs) => {
    yargs.positional("name", {
      type: "string",
      required: true,
      describe: "the name of the component to generate",
    });
    yargs.positional("path", {
      type: "string",
      required: true,
      describe:
        "the path to generate the component at (relative to src/components/)",
    });
  })
  .parse();

const { name: componentName, path: componentPath } = argv;

const run = async () => {
  await generateComponentAtPath(componentName, componentPath);
  console.log("done.");
};

run();
