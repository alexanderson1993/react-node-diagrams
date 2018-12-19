import React, { Component } from "react";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config,
  defaultComponents
} from "react-node-diagrams";

export default class App extends Component {
  render() {
    return (
      <DiagramProvider registeredComponents={defaultComponents}>
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
