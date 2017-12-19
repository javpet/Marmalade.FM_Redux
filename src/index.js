import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import "tachyons";
import "./css/main.css";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import mixesApp from "./store";

let store = createStore(mixesApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
