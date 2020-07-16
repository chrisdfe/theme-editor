import React, { useState } from "react";
import classnames from "classnames";
import { useSelect } from "downshift";

import FormGroup from "../FormGroup";

import "./Select.css";

const getOptionClassnames = (option, selectedValue, index, highlightedIndex) =>
  classnames("Select__option", {
    "Select__option--highlighted": index === highlightedIndex,
    "Select__option--selected": option.value === selectedValue,
  });

const Select = ({ label, options, value, onChange }) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options.map((option) => option.value),
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem);
    },
  });

  return (
    <FormGroup label={label} {...getLabelProps()}>
      <button className="Select__button" {...getToggleButtonProps()}>
        {value || label}
      </button>
      <div className="Select__dropdown-wrapper">
        <ul className="Select__dropdown" {...getMenuProps()}>
          {isOpen &&
            options.map((option, index) => (
              <li
                key={option.value}
                className={getOptionClassnames(
                  option,
                  value,
                  index,
                  highlightedIndex
                )}
                {...getItemProps({ item: option.value, index })}
              >
                {option.label}
              </li>
            ))}
        </ul>
      </div>
    </FormGroup>
  );
};

// Select.defaultProps = {
//   options: [],
//   onChange: () => {},
// };

export default Select;
