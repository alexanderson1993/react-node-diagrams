import React, { Component } from "react";
import registerComponent from "../registerComponent";

class PrevValue extends Component {
  render() {
    return <span style={{ fontWeight: 800, fontSize: 32 }}>↫</span>;
  }
}

export default () => {
  registerComponent({
    name: "PrevValue",
    component: PrevValue,
    process: (comp, inputs) => {
      console.log(this);
      this.a.prevValues = this.a.prevValues || {};
      this.a.nextValues = this.a.nextValues || {};
      this.a.nextValues[comp.id] = this.a.nextValues[comp.id] || 0;
      const value = this.a.nextValues[comp.id] || 0;
      if (this.a.nextValues[comp.id] === inputs.input) {
        return this.a.prevValues[comp.id];
      }
      this.a.prevValues[comp.id] = this.a.nextValues[comp.id];
      this.a.nextValues[comp.id] = inputs.input;

      return value;
    },
    inputs: [
      {
        id: "input",
        title: "Value to track the previoius value of",
        type: "Any"
      }
    ],
    outputs: [{ id: "prevValue", title: "Previous Value", type: "Any" }],
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