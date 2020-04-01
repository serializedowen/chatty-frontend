import "./utils/eventEmitter";

import React from "react";
import { configureStore, history } from "./store/configureStore";
import "./app.global.css";
import "./App.css";
import Root from "./containers/Root";

const store = configureStore();
function App() {
  return (
    <div className="App">
      <Root store={store} history={history}></Root>
    </div>
  );
}

export default App;
