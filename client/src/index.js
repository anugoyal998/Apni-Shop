import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import CurrentUserProvider from "./context/CurrentUserProvider.jsx"
import TAProvider from "./context/TAProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <CurrentUserProvider>
          {/* <App/> */}
          <TAProvider><App/></TAProvider>
        </CurrentUserProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
