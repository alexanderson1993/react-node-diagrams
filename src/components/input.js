import React from "react";
import PropTypes from "prop-types";
import registerComponent from "../registerComponent";

const Input = props => {
  const { value = "", updateValue = () => {} } = props;
  return (
    <input
      onMouseDown={e => {
        e.stopPropagation();
      }}
      value={value}
      onChange={e => updateValue(e.target.value)}
    />
  );
};

Input.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default () => {
  registerComponent({
    name: "Input",
    component: Input,
    outputs: [
      { id: "inputValue", title: "Value of the component", type: "Any" }
    ],
    inputs: [],
    config: [
      {
        id: "label",
        title: "Label",
        props: {
          type: "text",
          placeholder: "Appears above component"
        }
      }
    ]
  });
};
