# react-node-diagrams 📊

> React components for building dynamic node diagrams

[![NPM](https://img.shields.io/npm/v/react-node-diagrams.svg)](https://www.npmjs.com/package/react-node-diagrams)

## Install

```bash
npm install --save react-node-diagrams
```

## Usage

See `/src/example` for a demo app.

Before using the node diagram, you have to register the components that will be
used. You can create your own custom components or register the default
components.

Be sure to wrap all of the components that React Node Diagrams exports in the
`<DiagramProvider>`

The Library component serves as the place you can pull components out of. The
Config component makes it easy to set component configuration.

The Canvas component is where components are dragged to and connected.

```jsx
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
  registerLerp,
  registerMode,
  registerOscillator,
  registerRandom,
  registerRange
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
registerLerp();
registerMode();
registerOscillator();
registerRandom();
registerRange();

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
```

## License

MIT © [alexanderson1993](https://github.com/alexanderson1993)
