// Components have to be registered to be used with the Canvas.

export const registeredComponents = [];

// Component is a React component
// Process is a function that takes a few arguments:
//   - comp - the props of the component
//   - inputs - the input values of the component
// Outputs and inputs are both arrays of objects with the following keys:
//   - id - a unique id for the input or output
//   - title - an on-hover label for the input or output
//   - type - a way of keeping certain inputs from being passed to certain outputs
// Config is an array of config options with the following keys:
//   - id - unique id
//   - title - the title of the config option
//   - props - props passed to an <input /> component

const registerComponent = ({
  name,
  component,
  category,
  process,
  outputs = [],
  inputs = [],
  config = []
}) => {
  if (!name) throw new Error("Cannot register component with no name.");
  if (!component) {
    throw new Error("Cannot register component with no component definition.");
  }
  registeredComponents.push({
    name,
    component,
    category,
    process,
    outputs,
    inputs,
    config
  });
};

export default registerComponent;
