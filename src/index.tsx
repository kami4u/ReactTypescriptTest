import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxRrovider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./redux/configureStore";
import App from "./components/App";
import "./index.css";

render(
  <ReduxRrovider store={configureStore({})}>
    <Router>
      <App />
    </Router>
  </ReduxRrovider>,
  document.getElementById("app")
);
