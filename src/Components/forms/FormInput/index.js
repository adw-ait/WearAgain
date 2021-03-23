import React from "react";

function FormInput({ handleChange, value, ...otherProps }) {
  return (
    <input
      {...otherProps}
      value={value}
      onChange={handleChange}
      className="p-2 rounded-lg outline-none border focus:border-black bg-gray-200 w-full "
      required
    />
  );
}

export default FormInput;
