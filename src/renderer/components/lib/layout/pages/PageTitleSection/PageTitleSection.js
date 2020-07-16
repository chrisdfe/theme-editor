import React from "react";

import PageSection from "../PageSection";
import PageTitle from "../PageTitle";

import "./PageTitleSection.css";

const PageTitleSection = ({ children }) => {
  return (
    <PageSection>
      <PageTitle>{children}</PageTitle>
    </PageSection>
  );
};

export default PageTitleSection;
