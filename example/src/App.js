import React, { Component } from "react";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config,
  registerInput,
  registerOutput,
  registerDivide,
  registerMultiply,
  registerRound,
  registerSubtract,
  registerSum,
  registerColor,
  registerMode,
  registerOscillator,
  registerRandom,
  registerRange,
  registerSwitch
} from "react-node-diagrams";

// Import and execute some default registrations
registerInput();
registerOutput();
registerSum();
registerSubtract();
registerMultiply();
registerDivide();
registerRound();
registerColor();
registerMode();
registerOscillator();
registerRandom();
registerRange();
registerSwitch();
export default class App extends Component {
  render() {
    return (
      <DiagramProvider>
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
