import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getBuiltinThemesList, setThemeFromFile } from "common/themes/setTheme";

import Navbar from "@/components/lib/Navbar";
import * as Page from "@/components/lib/layout/pages";

import "./SettingsPage.css";

const SettingsPage = () => {
  const [themesList, setThemesList] = useState([]);

  const fetchThemes = async () => {
    const themes = await getBuiltinThemesList();
    setThemesList(themes);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  return (
    <div className="SettingsPage">
      <Navbar>
        <Link className="LinkButton" to="/">
          back
        </Link>
      </Navbar>

      <Page.TitleSection>Settings</Page.TitleSection>

      <Page.Section>
        {themesList.map(({ title, filename }) => {
          const themeImgContents = require(`common/themes/builtin/svg/${filename}`)
            .default;

          return (
            <div key={filename} style={{ cursor: "pointer" }}>
              <h3>{title}</h3>

              <img
                src={themeImgContents}
                alt={filename}
                onClick={() => {
                  setThemeFromFile("svg", filename);
                }}
              />
            </div>
          );
        })}
      </Page.Section>
    </div>
  );
};

export default SettingsPage;
