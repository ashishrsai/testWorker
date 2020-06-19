import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
     <Suspense fallback={null}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
