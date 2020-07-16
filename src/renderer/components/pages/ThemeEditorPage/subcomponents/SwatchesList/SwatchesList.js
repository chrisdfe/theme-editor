import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as themeBundleActions from "common/store/domains/themeBundles/actions";

import * as themeActions from "common/store/domains/themes/actions";
import * as swatchSelectors from "common/store/domains/swatches/selectors";

import "./SwatchesList.css";

const SwatchesListItem = ({ swatch }) => {
  const dispatch = useDispatch();
  const swatchColors = useSelector((state) =>
    swatchSelectors.getSwatchSwatchColors(state, swatch)
  );

  return (
    <div
      className="SwatchesList__item"
      onClick={() => {
        dispatch(
          themeBundleActions.createThemeBundleFromSwatchAndBeginEditing({
            id: swatch.id,
          })
        );
      }}
    >
      <div className="SwatchesList__item__swatch-colors-list">
        {swatchColors.map((swatchColor) => (
          <div
            key={swatchColor.id}
            className="SwatchesList__item__swatch-colors-list__item"
            style={{ backgroundColor: swatchColor.hex }}
          />
        ))}
      </div>
      <h4 className="SwatchesList__item__name">{swatch.name}</h4>
    </div>
  );
};

const SwatchesList = () => {
  const swatchesList = useSelector(swatchSelectors.getThemelessSwatchesList);

  return (
    <div className="SwatchesList">
      <div className="SwatchesList__list-wrapper">
        {swatchesList.map((swatch) => (
          <SwatchesListItem key={swatch.id} swatch={swatch} />
        ))}
      </div>
    </div>
  );
};

export default SwatchesList;
