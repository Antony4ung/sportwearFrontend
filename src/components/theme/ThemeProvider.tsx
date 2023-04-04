import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type ThemeContextType = {
  toggleColorMode: () => void;
  theme: "light" | "dark";
};

type Prop = {
  children: React.ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

const ThemeContextProvider = ({ children }: Prop) => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const appTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography:{
          fontFamily: "JFS, sans-serif",
        }
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider
      value={{ toggleColorMode: colorMode.toggleColorMode, theme: mode }}
    >
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
