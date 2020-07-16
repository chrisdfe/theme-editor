import React from "react";
import classnames from "classnames";

import "./GridColumn.css";

const GridColumn = ({ span, children }) => {
  const className = classnames("GridColumn", `GridColumn--span-${span}`);

  return <div className={className}>{children}</div>;
};

GridColumn.defaultProps = {
  span: 12,
};

export default GridColumn;
