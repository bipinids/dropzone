import React from "react";
import ReactDOM from "react-dom";
import "react-notifications/lib/notifications.css";
import "./globals/styles/App.scss";
import App from "./components/app";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
