import "dayjs/locale/pl";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider, plPL } from "@mui/x-date-pickers";
import React from "react";
import ReactDOM from "react-dom/client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import App from "./App";
import { NotificationProvider } from "./components/notification";

const darkTheme = createTheme({
  palette: {
    primary: { main: "#FFCB05" },
    mode: "dark",
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(2px)",
        },
      },
    },
  },
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
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pl"
        localeText={
          plPL.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
