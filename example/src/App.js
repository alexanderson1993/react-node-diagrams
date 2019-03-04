import React, { Component } from "react";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config,
  defaultComponents
} from "react-node-diagrams";

const list = ["1", "2,", "3", "4", "5"];
const comps = list.reduce((prev, next) => {
  prev[`macro-${next}`] = {
    name: next,
    category: "Actions",
    objectKey: `macro-${next}`,
    willHide: true,
    outputs: [
      {
        id: "trigger",
        color: "orange",
        title: "Triggers the action",
        type: "Trigger"
      }
    ],
    config: [
      {
        id: "delay",
        title: "Delay",
        props: {
          type: "number",
          placeholder: "Delay in milliseconds"
        }
      }
    ],
    inputs: [],
    component: () => <p>Macro: {next}</p>
  };
  prev[`${next}`] = {
    name: next,
    category: "Actions",
    willHide: true,
    inputs: [
      {
        id: "trigger",
        color: "orange",
        title: "Triggers the action",
        type: "Trigger"
      }
    ],
    config: [
      {
        id: "delay",
        title: "Delay",
        props: {
          type: "number",
          placeholder: "Delay in milliseconds"
        }
      }
    ],
    outputs: [],
    component: () => <p>Regular: {next}</p>
  };
  return prev;
}, {});
export default class App extends Component {
  render() {
    return (
      <DiagramProvider
        registeredComponents={{ ...defaultComponents, ...comps }}
      >
        <div style={{ height: "100%", display: "flex" }}>
          <div style={{ flex: 1 }} className="component-area">
            <DiagramContext.Consumer>
              {({ selectedComponent }) =>
                selectedComponent ? <Config /> : <Library />
              }
            </DiagramContext.Consumer>
          </div>
          <div style={{ flex: 3 }} className="canvas-area">
            <Canvas />
          </div>
        </div>
      </DiagramProvider>
    );
  }
}
