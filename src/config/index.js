import React from "react";
import DiagramContext from "../helpers/diagramContext";
import { registeredComponents } from "../registerComponent";

const Config = () => {
  return (
    <DiagramContext.Consumer>
      {({ selectedComponent, components, config, setConfig }) => {
        const comp = components.find(s => s.id === selectedComponent);
        const compDef = registeredComponents.find(
          c => c.name === comp.component.name
        );
        const compConfig = config[comp.id] || {};
        return (
          <div className="config">
            <h2>Config</h2>
            {compDef.config.map(c => {
              const val = compConfig[c.id];
              const inputProps = {
                [c.props.type === "checkbox" ? "checked" : "value"]: val
              };
              console.log(inputProps, compConfig, c.id, compConfig[c.id], val);
              return (
                <div key={c.id}>
                  <label>
                    {c.title}
                    <div>
                      <input
                        {...c.props}
                        {...inputProps}
                        onChange={e =>
                          setConfig(
                            comp.id,
                            c.id,
                            c.props.type === "checkbox"
                              ? e.target.checked
                              : e.target.value
                          )
                        }
                      />
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        );
      }}
    </DiagramContext.Consumer>
  );
};

export default Config;
