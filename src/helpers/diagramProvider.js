import React, { Component, Fragment } from "react";
import { registeredComponents } from "../registerComponent";
import DiagramContext from "./diagramContext";
import propTypes from "prop-types";
import Dragger from "./Dragger";
import calculateValues from "./calculateValues";

class DiagramProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLibraryDrag: this.dragComponent,
      resetCanvas: () => this.setState({ reset: Math.random() }),
      clearCanvas: () =>
        this.setState({
          components: [],
          connections: [],
          config: {},
          values: {}
        }),
      components: [],
      connections: [],
      values: {},
      draggingComponent: null,
      view: {
        x: 0,
        y: 0,
        scale: 1
      },
      reset: 0,
      dimensions: { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 },
      updateSelectedComponent: id => this.setState({ selectedComponent: id }),
      selectedComponent: null,
      updateDimensions: dimensions => this.setState({ dimensions }),
      updatePan: view => {
        this.setState({ view });
      },
      updateComponentPosition: (id, position) =>
        this.setState(state => ({
          components: state.components.map(c =>
            c.id === id ? { ...c, position } : c
          )
        })),
      removeComponent: id =>
        this.setState(state => ({
          components: state.components.filter(c => c.id !== id),
          values: calculateValues(
            state.components.filter(c => c.id !== id),
            state.connections,
            state.values,
            state.config
          )
          // TODO: Also remove any connections
        })),
      addConnection: connection => {
        if (
          this.state.connections.find(
            c =>
              c.to.id === connection.to.id &&
              c.to.nodeId === connection.to.nodeId
          )
        ) {
          return;
        }
        this.setState(state => ({
          connections: state.connections.concat(connection),
          values: calculateValues(
            this.state.components,
            state.connections.concat(connection),
            state.values,
            state.config
          )
        }));
      },
      removeConnection: id =>
        this.setState(state => ({
          connections: state.connections.filter(c => c.id !== id),
          values: calculateValues(
            this.state.components,
            state.connections.filter(c => c.id !== id),
            state.values,
            state.config
          )
        })),
      updateValue: (id, value) => {
        this.setState(state => ({
          values: calculateValues(
            this.state.components,
            this.state.connections,
            { ...this.state.values, [id]: value },
            state.config
          )
        }));
      },
      config: {},
      setConfig: (id, key, value) => {
        this.setState(state => ({
          config: {
            ...state.config,
            [id]: { ...state.config[id], [key]: value }
          }
        }));
      }
    };
  }
  dragComponent = e => {
    const component = e.currentTarget.dataset.component;
    if (!component) {
      throw new Error(
        "Cannot drag a component without the data-component attribute"
      );
    }
    const Comp = registeredComponents.find(c => c.name === component);
    if (!Comp) {
      throw new Error("Cannot drag a component that hasn't been registered.");
    }
    this.setState({
      draggingComponent: {
        component: component,
        position: { x: e.clientX, y: e.clientY }
      }
    });
  };

  static propTypes = {
    children: propTypes.node
  };
  render() {
    const { draggingComponent, view, dimensions } = this.state;
    return (
      <Fragment>
        <DiagramContext.Provider value={this.state}>
          {this.props.children}
        </DiagramContext.Provider>
        {draggingComponent && (
          <Dragger
            {...draggingComponent}
            view={view}
            canvasDimensions={dimensions}
            removeDragger={() => this.setState({ draggingComponent: null })}
            addComponent={component =>
              this.setState(state => ({
                components: [...state.components, component],
                draggingComponent: null,
                values: calculateValues(
                  [...state.components, component],
                  state.connections,
                  state.values,
                  state.config
                )
              }))
            }
          />
        )}
      </Fragment>
    );
  }
}

export default DiagramProvider;
