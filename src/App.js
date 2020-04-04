import React from "react";
import { configureStore, history } from "./store/configureStore";
import "./app.global.css";
import "./App.css";
import Root from "./containers/Root";
import { createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider maxSnack={3}>
          <div className="App">
            <Root store={store} history={history}></Root>
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
