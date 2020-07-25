import React, { useState } from "react";
import { Link } from "react-router-dom";

import { validateTheme } from "common/themes/ThemeLoader";

import Textarea from "@/components/lib/forms/Textarea";
import Button from "@/components/lib/forms/Button";
import * as Page from "@/components/lib/layout/pages";
import Navbar from "@/components/lib/layout/navbar/Navbar";

import "./ThemeFileValidatorPage.css";

const defaultTheme = { title: "monokai", definitionGroups: [{}] };

const ThemeFileValidatorPage = () => {
  const [themeJSON, setThemeJSON] = useState(
    JSON.stringify(defaultTheme, null, 4)
  );

  const [themeErrors, setThemeErrors] = useState([]);
  const [isValidJSON, setIsValidJSON] = useState(true);

  return (
    <div className="ThemeFileValidatorPage">
      <Navbar>
        <Link className="LinkButton" to="/">
          back
        </Link>
      </Navbar>

      <Page.TitleSection>Theme File Validator</Page.TitleSection>

      <Page.Section>
        <Textarea
          value={themeJSON}
          onChange={(value) => {
            setThemeJSON(value);
          }}
        />
        <div>
          {themeErrors.length === 0 && isValidJSON && <div>valid!</div>}
          {!isValidJSON && (
            <div style={{ marginBottom: "10px" }}>invalid JSON</div>
          )}
          {isValidJSON &&
            themeErrors.map((validationError, index) => {
              return (
                <div
                  key={`${index}-${validationError.keyword}`}
                  style={{ marginBottom: "10px" }}
                >
                  <div>
                    <strong>keyword:</strong> {validationError.keyword}
                  </div>
                  <div>
                    <strong>dataPath:</strong> {validationError.dataPath}
                  </div>
                  <div>
                    <strong>message:</strong> {validationError.message}
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          onClick={() => {
            const { isValidJSON, validationErrors } = validateTheme(themeJSON);
            console.log("validationErrors", validationErrors);
            setIsValidJSON(isValidJSON);
            setThemeErrors(validationErrors);
          }}
        >
          validate
        </Button>
      </Page.Section>
    </div>
  );
};

export default ThemeFileValidatorPage;
