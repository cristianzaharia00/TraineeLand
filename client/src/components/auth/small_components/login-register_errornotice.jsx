import React from "react";

const ErrorNotice = (props) => {
  return (
    <div className="error-notice">
      <h5>{props.msg}</h5>
    </div>
  );
};

export default ErrorNotice;
