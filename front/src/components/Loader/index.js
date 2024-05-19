import React from "react";
export const Loader = ({className}) => {
  return (
    <div className={`page_loader ${className ? className : ""}`}>
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
    </div>
  );
};
