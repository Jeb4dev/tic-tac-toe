import React from "react";

const Button = ({ label, width, height, bgcolor, margin }) => {
  return (
    <button
      style={{
        width: width,
        height: height,
        backgroundColor: bgcolor,
        margin: margin,
      }}
      className="hover:border-green-600 text-xl border  px-1 py-1 rounded mx-2 my-5 "
    >
      {label}
    </button>
  );
};

export default Button;
