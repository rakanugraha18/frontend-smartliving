import React from "react";

const Label = (props) => {
  const { htmlFor, children, classname } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-900 block mb-2 ${classname} dark:text-gray-300`}
    >
      {children}
    </label>
  );
};

export default Label;
