import React, { Fragment } from "react";
import { registeredComponents } from "../registerComponent";
import styles from "./style.css";
import compStyles from "../compStyles.css";
import propTypes from "prop-types";
import DiagramContext from "../helpers/diagramContext";

function renderComponent(c, startDragging) {
  const Comp = c.component;
  return (
    <div
      key={c.name}
      className={`${styles.comp} ${compStyles.comp}`}
      data-component={c.name}
      onMouseDown={startDragging}
    >
      <p>{c.name}</p>
      <Comp inputs={[]} updateValue={() => {}} />
    </div>
  );
}

const Library = ({ renderButtons }) => {
  const categories = registeredComponents
    .map(c => c.category)
    // Remove Duplicates
    .filter((c, i, a) => a.indexOf(c) === i)
    // Filter out nulls
    .filter(Boolean);

  return (
    <DiagramContext.Consumer>
      {({ resetCanvas, clearCanvas, startLibraryDrag }) => (
        <div className={styles["component-inner-container"]}>
          <h2>Components</h2>
          <div className={styles["component-holder"]}>
            {categories.map(cat => (
              <details key={`category-${cat}`}>
                <summary>{cat}</summary>
                <div className={styles["grid"]}>
                  {registeredComponents
                    .filter(c => c.category === cat)
                    .map(c => renderComponent(c, startLibraryDrag))}
                </div>
              </details>
            ))}
            <details>
              <summary>Misc.</summary>
              <div className={styles["grid"]}>
                {registeredComponents
                  .filter(c => !c.category)
                  .map(c => renderComponent(c, startLibraryDrag))}
              </div>
            </details>
          </div>
          {renderButtons ? (
            renderButtons(clearCanvas, resetCanvas)
          ) : (
            <Fragment>
              <button onClick={clearCanvas} style={{ marginBottom: "10px" }}>
                Clear Canvas
              </button>
              <button onClick={resetCanvas}>Reset Zoom</button>
            </Fragment>
          )}
        </div>
      )}
    </DiagramContext.Consumer>
  );
};

Library.propTypes = {
  renderButtons: propTypes.func
};
export default Library;
