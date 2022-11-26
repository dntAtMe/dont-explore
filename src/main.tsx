import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer, { initialState } from "./reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer, initialState);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
