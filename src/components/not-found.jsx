import React, { Component } from "react";
import logo from "../assets/404.png";
import { browserHistory } from "react-router";
import Link from "@material-ui/core/Link";
import "../CSS/image.css";

const NotFound = () => {
  // setTimeout(function() {
  //   browserHistory.push("/");
  // }, 3000);
  return (
    <React.Fragment>
      <img
        src={logo}
        style={{
          display: "block",
          "margin-left": "auto",
          "margin-right": "auto",
          width: "50%"
        }}
        alt="Page not found image"
      />
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          browserHistory.push("/");
        }}
      >
        <h2 style={{ align: "center" }}>Login</h2>
      </Link>
    </React.Fragment>
  );
};

export default NotFound;
