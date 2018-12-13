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
            {compDef.config.map(c => (
              <div key={c.id}>
                <label>
                  {c.title}
                  <div>
                    <input
                      {...c.props}
                      checked={
                        c.props.type === "checkbox" ? compConfig[c.id] : null
                      }
                      value={
                        c.props.type !== "checkbox"
                          ? compConfig[c.id] || ""
                          : null
                      }
                      onChange={e =>
                        setConfig(
                          comp.id,
                          c.id,
                          e.target.value === "on"
                            ? e.target.checked
                            : e.target.value
                        )
                      }
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
        );
      }}
    </DiagramContext.Consumer>
  );
};

export default Config;
