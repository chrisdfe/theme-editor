import React from "react";
import classNames from "classnames";

import useAccordion from "@/components/lib/hooks/useAccordion";

const SidebarSection = ({ title, children }) => {
  const [isOpen, , toggleIsOpen] = useAccordion();

  const bodyClassName = classNames("Sidebar__section-body", {
    "Sidebar__section-body--is-open": isOpen,
    "Sidebar__section-body--is-closed": !isOpen,
  });

  return (
    <div className="Sidebar__section">
      {title && (
        <div
          className="Sidebar__section-header"
          onClick={() => {
            toggleIsOpen();
          }}
        >
          <h3 className="Sidebar__section-title">{title}</h3>
          <div className="Sidebar__section-header-toggle-icon">
            [{isOpen ? "-" : "+"}]
          </div>
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default SidebarSection;
