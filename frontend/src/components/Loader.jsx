import React from "react";

const Loader = () => {
  return (
    <div
      className="loader"
      /*   style={{
        position: `${position}`,
        left: `${left}`,
        top: `${top}`,
      }} */
    >
      <i className="fa-solid fa-spinner"></i>
    </div>
  );
};

export default Loader;
