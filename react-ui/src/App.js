import "./App.scss";
import "normalize-css/normalize.css";

import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { AppRouter } from "./AppRouter";
import { Provider } from "./context";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#7e7afa" },
    secondary: {
      main: "#2196f3"
    }
  },
  typography: {
    fontFamily: ["Roboto", "Montserrat", '"Helvetica Neue"', "sans-serif"].join(
      ","
    )
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <AppRouter></AppRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
