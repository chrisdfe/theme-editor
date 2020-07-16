import * as themeBundleSelectors from "../selectors";

import * as ThemeModule from "../../themes/module";
import * as SwatchModule from "../../swatches/module";
import * as SwatchColorModule from "../../swatchColors/module";
import * as ColorTokenModule from "../../colorTokens/module";
import * as ColorTokenGroupModule from "../../colorTokenGroups/module";

// const getDefaultCreateAttributes = () => {
//   const colorTokenGroup = ColorTokenGroupModule.create({
//     name: ColorTokenGroupModule.getNextName(),
//   });
//   console.log("colorTokenGroup", colorTokenGroup);
//   const colorTokenGroupAttributesList = [colorTokenGroup];
//   const colorTokenAttributesList = ColorTokenModule.getDefaultColorTokenNames().map(
//     (name) =>
//       ColorTokenModule.create({ colorTokenGroupId: colorTokenGroup.id, name })
//   );

//   return {
//     themeAttributes: {},
//     swatchAttributes: {},
//     swatchColorAttributesList: [],
//     colorTokenGroupAttributesList,
//     colorTokenAttributesList,
//   };
// };

export const create = (params = {}) => {
  const {
    themeAttributes = {},
    swatchAttributes,
    swatchColorAttributesList = [],
    colorTokenGroupAttributesList,
    colorTokenAttributesList = [],
  } = params;

  const theme = ThemeModule.create(themeAttributes);

  let swatch;
  let swatchColors;
  if (!swatchAttributes) {
    // TODO - SwatchModule.createDefault
    swatch = SwatchModule.create({ themeId: theme.id });
    const swatchColor = SwatchColorModule.create({
      swatchId: swatch.id,
      hex: "#ff0000",
    });
    swatchColors = [swatchColor];
    swatch.swatchColorIds = swatchColors.map(({ id }) => id);
  } else {
    swatch = SwatchModule.create({ themeId: theme.id, ...swatchAttributes });
    swatchColors = swatchColorAttributesList.map((attributes) =>
      SwatchColorModule.create({ swatchId: swatch.id, ...attributes })
    );
  }

  let colorTokenGroups;
  let colorTokens;
  if (!colorTokenGroupAttributesList) {
    ({ colorTokenGroups, colorTokens } = ColorTokenGroupModule.createDefault({
      theme,
    }));
  } else {
    colorTokenGroups = colorTokenGroupAttributesList.map((attributes) =>
      ColorTokenGroupModule.create(attributes)
    );

    colorTokens = colorTokenAttributesList.map((attributes) =>
      ColorTokenModule.create(attributes)
    );
  }

  return {
    theme,
    swatch,
    swatchColors,
    colorTokenGroups,
    colorTokens,
  };
};

export const validate = () => {};

export const diff = (themeBundleA, themeBundleB) => {};
