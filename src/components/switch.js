import React, { Component } from "react";
import registerComponent from "../registerComponent";

class Switch extends Component {
  render() {
    return (
      <div>
        <span style={{ fontWeight: 800, fontSize: 32 }}>⑂</span>
      </div>
    );
  }
}

export default () => {
  registerComponent({
    name: "Switch",
    component: Switch,
    process: ({ config = {} }, inputs = {}) => {
      const { check } = config;
      const { checkInput = "", trueInput, falseInput } = inputs;
      console.log(checkInput.toString(), check);
      if (checkInput.toString() === check) return trueInput;
      return falseInput;
    },
    outputs: [{ id: "output", title: "Output of the Switch", type: "Any" }],
    inputs: [
      {
        id: "checkInput",
        title: "Check Input",
        type: "Any"
      },
      {
        id: "trueInput",
        title: "True Input",
        type: "Any"
      },
      {
        id: "falseInput",
        title: "False Input",
        type: "Any"
      }
    ],
    config: [
      {
        id: "label",
        title: "Label",
        props: {
          type: "text",
          placeholder: "Appears above component"
        }
      },
      {
        id: "check",
        title: "Correct Value",
        props: {
          type: "text",
          placeholder: "true input if check input matches"
        }
      }
    ]
  });
};
