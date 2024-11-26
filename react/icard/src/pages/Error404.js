import React from "react";

export function Error404(props) {
  const { children } = props;
  return (
    <div>
      <h3>error 404</h3>
      {children}
    </div>
  );
}
