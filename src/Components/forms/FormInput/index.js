import React from "react";

function FormInput({ handleChange, ...otherProps }) {
  return (
    <input
      {...otherProps}
      className="p-2 rounded-lg outline-none border focus:border-black bg-gray-200 w-full "
      required
    />
  );
}

export default FormInput;
