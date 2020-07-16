import React from "react";
import { useSelector } from "react-redux";
import { reduce, compact } from "lodash";

import * as Page from "@/components/lib/layout/pages";
import * as Grid from "@/components/lib/layout/grid";

import * as themeSelectors from "common/store/domains/themes/selectors";
import * as themeBundleSelectors from "common/store/domains/themeBundles/selectors";
import * as swatchSelectors from "common/store/domains/swatches/selectors";
import * as colorTokenGroupSelectors from "common/store/domains/colorTokenGroups/selectors";

import "./ThemePreviewArea.css";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const getCSSVariablesFromTokenMap = (tokensList, prefix = "") => {
  const variables = tokensList
    // TODO- slugify and/or validate name first
    .map(({ name, hex }) => {
      const variableName = prefix ? `${prefix}-${name}` : name;
      return `  --${variableName}: ${hex};`;
    })
    .join("\n");
  return [":root {", variables, "}"].join("\n");
};

const createFlatColorTokenMap = ({
  swatchColors,
  colorTokenGroups,
  colorTokensByGroupId,
}) => {
  const result = reduce(
    colorTokensByGroupId,
    (acc, colorTokens, colorTokenGroupId) => {
      // TODO - make a selector to get editable 'byId' values so I don't have
      //        use 'find' like this
      const colorTokenGroup = colorTokenGroups.find(
        ({ id }) => id === colorTokenGroupId
      );
      const { name: groupName } = colorTokenGroup;
      const colors = colorTokens.map((colorToken) => {
        const swatchColor = swatchColors.find(
          ({ id }) => id === colorToken.swatchColorId
        );

        if (!swatchColor) return null;

        const { hex } = swatchColor;
        const { name } = colorToken;
        return { name: `${groupName}-${colorToken.name}`, hex };
      });

      return [...acc, ...colors];
    },
    []
  );

  return compact(result);
};

const ThemePreviewArea = () => {
  // TODO
  // 1) these should ultimately be selecting the 'preview' theme/swatch/, because
  //    the user should be able to preview themes not currently being edited
  const { swatch, swatchColors, colorTokenGroups } = useSelector(
    themeBundleSelectors.getEditingThemeBundle
  );

  const colorTokensByGroupId = useSelector(
    colorTokenGroupSelectors.getEditingColorTokenGroupColorTokensById
  );

  // TODO - this util should go somewhere else
  const colorTokenMap = createFlatColorTokenMap({
    swatchColors,
    colorTokenGroups,
    colorTokensByGroupId,
  });

  const prefixedThemeCSSVariables = getCSSVariablesFromTokenMap(
    colorTokenMap,
    "preview-area"
  );

  return (
    <div className="ThemePreviewArea">
      <style>{prefixedThemeCSSVariables}</style>

      <Page.Section>
        <Page.SectionHeader>Typography</Page.SectionHeader>
        <h1>h1. heading 1.</h1>
        <h2>h2. heading 2.</h2>
        <h3>h3. heading 3.</h3>
        <h4>h4. heading 4.</h4>
        <h5>h5. heading 5.</h5>
        <h6>h6. heading 6.</h6>

        <hr />

        {[...new Array(2)].map((v, index) => (
          <p key={index}>{lorem}</p>
        ))}

        <hr />
      </Page.Section>

      <Page.Section>
        <Page.SectionHeader>Grid</Page.SectionHeader>
        {[1, 2, 3, 4, 6, 12].map((columnCount) => (
          <Grid.Container key={columnCount}>
            <Grid.Row>
              {[...new Array(columnCount)].map((n, index) => (
                <Grid.Column key={index} span={12 / columnCount}>
                  <div className="ThemePreviewArea__grid-box">
                    <span>{`${12 / columnCount}`}</span>
                  </div>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid.Container>
        ))}
      </Page.Section>

      <Page.Section>
        <Page.SectionHeader>Interactive</Page.SectionHeader>
        <p>
          Here is a <a href="">link</a>
        </p>

        <p>
          <button>Here is a button</button>
        </p>
      </Page.Section>
    </div>
  );
};

const ThemePreviewAreaWrapper = () => {
  const theme = useSelector(themeSelectors.getEditingTheme);

  if (!theme) {
    return null;
  }

  return <ThemePreviewArea />;
};

export default ThemePreviewAreaWrapper;
