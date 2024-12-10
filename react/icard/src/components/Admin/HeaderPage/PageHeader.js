import React from "react";
import { Button } from "semantic-ui-react";
import "./PageHeader.scss";

export function PageHeader(props) {
  const { title, btnTitle, btnClic, btnTitleTwo, btnClicTwo } = props;
  return (
    <div className="header-page-admin">
      <h2>{title}</h2>
      <div>
        {btnTitle && (
          <Button positive onClick={btnClic}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button negative onClick={btnClicTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}
