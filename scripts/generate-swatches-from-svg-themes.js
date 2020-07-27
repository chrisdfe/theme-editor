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
