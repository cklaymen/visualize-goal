import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(2px)"
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={{
          "html, body, #root": {
            height: "100%",
          },
        }}
      />
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
