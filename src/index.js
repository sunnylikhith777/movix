import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ToggleColorModeProvider from "./utils/ToggleColorMode";
import App from "./components/App";
import store from "./app/store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={theme}> */}
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
    {/* </ThemeProvider> */}
  </Provider>,
  document.getElementById("root")
);

// import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/styles";

// const theme = createTheme({});

// const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);
// root.render(<App />);

// const theme = createTheme({});
