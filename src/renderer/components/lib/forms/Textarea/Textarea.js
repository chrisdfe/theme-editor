import React from "react";

import FormGroup from "../FormGroup";

import "./Textarea.css";

const Textarea = ({ children, label, id, onChange, ...other }) => {
  // TODO - don't use Input class here
  return (
    <FormGroup label={label} id={id}>
      <textarea
        className="Textarea TextInput"
        id={id}
        {...other}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </textarea>
    </FormGroup>
  );
};

Textarea.defaultProps = {
  onChange: () => {},
};

export default Textarea;
