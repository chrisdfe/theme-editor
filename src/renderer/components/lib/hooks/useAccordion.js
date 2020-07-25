import React, { useState } from "react";

const useAccordion = (initialValue = true) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return [isOpen, setIsOpen, toggleIsOpen];
};

export default useAccordion;
