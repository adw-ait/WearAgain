import React from "react";

function Button({ children, styles, ...otherProps }) {
  return (
    <React.Fragment>
      <button className={styles} {...otherProps}>
        {children}
      </button>
    </React.Fragment>
  );
}

export default Button;
