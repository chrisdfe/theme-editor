import React, { createRef } from "react";

import { setThemeFromFile } from "common/themes/setTheme";

const ThemeUploadRegion = ({ children }) => {
  const containerRef = createRef();

  return (
    <div
      id="theme-upload-region"
      ref={containerRef}
      onDragOver={(event) => {
        // onDrop doesn't work without this override
        event.stopPropagation();
        event.preventDefault();
      }}
      onDrop={(e) => {
        if (e.dataTransfer.files.length) {
          setThemeFromFile(e.dataTransfer.files[0].path);
        }
      }}
    >
      {children}
    </div>
  );
};

export default ThemeUploadRegion;
