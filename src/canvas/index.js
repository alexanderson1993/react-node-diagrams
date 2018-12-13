import React from "react";
import Measure from "react-measure";
import styles from "./style.css";
import DiagramContext from "../helpers/diagramContext";
import InnerCanvas from "./innerCanvas";

const Canvas = props => {
  return (
    <DiagramContext.Consumer>
      {state => {
        const { dimensions, updateDimensions } = state;
        return (
          <Measure
            bounds
            onResize={contentRect => {
              updateDimensions(contentRect.bounds);
            }}
          >
            {({ measureRef }) => (
              <div
                ref={measureRef}
                className={styles["canvas-container"]}
                onClick={() => state.updateSelectedComponent(null)}
              >
                {dimensions && <InnerCanvas {...state} />}
              </div>
            )}
          </Measure>
        );
      }}
    </DiagramContext.Consumer>
  );
};

export default Canvas;
