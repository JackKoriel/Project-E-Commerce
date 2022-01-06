import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CurrentCartProvider } from "./components/CurrentCartContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentCartProvider>
      <App />
    </CurrentCartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
