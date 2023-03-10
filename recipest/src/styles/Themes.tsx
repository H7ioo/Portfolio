import { ReactNode, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

export const darkTheme: DefaultTheme = {
  colors: {
    background: "#121212",
    text: "#fff",
    link: "#fff",
    primary: "#9F87E5",
  },
  borderRadius: {
    light: "10px",
    heavy: "",
    circle: "50%",
  },
  elevation: {
    dp01: "#1d1d1d",
    dp02: "#222222",
    dp03: "#242424",
    dp04: "#262626",
    dp06: "#292929",
    dp08: "#2b2b2b",
    dp12: "#2f2f2f",
    dp16: "#313131",
    dp24: "#333333",
  },
  shadow: {
    dp00: "0 4px 4px rgba(0,0,0,0.25)",
    dp01: "0 1px 1px rgba(0,0,0,0.14), 0 2px 1px rgba(0,0,0,0.12), 0 2px 3px rgba(0,0,0,0.20)",
    dp02: "0 2px 2px rgba(0,0,0,0.14), 0 3px 1px rgba(0,0,0,0.12), 0 1px 5px rgba(0,0,0,0.20)",
    dp03: "0 3px 4px rgba(0,0,0,0.14), 0 3px 3px rgba(0,0,0,0.12), 0 1px 8px rgba(0,0,0,0.20)",
    dp04: "0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.20)",
    dp06: "0 6px 10px rgba(0,0,0,0.14), 0 1px 18px rgba(0,0,0,0.12), 0 3px 5px rgba(0,0,0,0.20)",
    dp08: "0 8px 10px rgba(0,0,0,0.14), 0 3px 14px rgba(0,0,0,0.12), 0 5px 5px rgba(0,0,0,0.20)",
    dp12: "0 12px 17px rgba(0,0,0,0.14), 0 5px 22px rgba(0,0,0,0.12), 0 7px 8px rgba(0,0,0,0.20)",
    dp16: "0 16px 24px rgba(0,0,0,0.14), 0 6px 30px rgba(0,0,0,0.12), 0 8px 10px rgba(0,0,0,0.20)",
    dp24: "0 24px 38px rgba(0,0,0,0.14), 0 9px 46px rgba(0,0,0,0.12), 0 11px 15px rgba(0,0,0,0.20)",
  },
  transition: {
    fast: "0.3s",
    slow: "0.5s",
  },
  padding: {
    outlinedButton: "6px 13px",
    containedButton: "8px 15px",
    textButton: "5px 10px",
  },
  outline: "rgba(255, 255, 255, 0.12)",
};

export const lightTheme: DefaultTheme = {
  colors: {
    background: "#121212",
    text: "#fff",
    link: "#fff",
    primary: "#9F87E5",
  },
  borderRadius: {
    light: "10px",
    heavy: "",
    circle: "50%",
  },
  elevation: {
    dp01: "#1d1d1d",
    dp02: "#222222",
    dp03: "#242424",
    dp04: "#262626",
    dp06: "#292929",
    dp08: "#2b2b2b",
    dp12: "#2f2f2f",
    dp16: "#313131",
    dp24: "#333333",
  },
  shadow: {
    dp00: "0 4px 4px rgba(0,0,0,0.25)",
    dp01: "0 1px 1px rgba(0,0,0,0.14), 0 2px 1px rgba(0,0,0,0.12), 0 2px 3px rgba(0,0,0,0.20)",
    dp02: "0 2px 2px rgba(0,0,0,0.14), 0 3px 1px rgba(0,0,0,0.12), 0 1px 5px rgba(0,0,0,0.20)",
    dp03: "0 3px 4px rgba(0,0,0,0.14), 0 3px 3px rgba(0,0,0,0.12), 0 1px 8px rgba(0,0,0,0.20)",
    dp04: "0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.20)",
    dp06: "0 6px 10px rgba(0,0,0,0.14), 0 1px 18px rgba(0,0,0,0.12), 0 3px 5px rgba(0,0,0,0.20)",
    dp08: "0 8px 10px rgba(0,0,0,0.14), 0 3px 14px rgba(0,0,0,0.12), 0 5px 5px rgba(0,0,0,0.20)",
    dp12: "0 12px 17px rgba(0,0,0,0.14), 0 5px 22px rgba(0,0,0,0.12), 0 7px 8px rgba(0,0,0,0.20)",
    dp16: "0 16px 24px rgba(0,0,0,0.14), 0 6px 30px rgba(0,0,0,0.12), 0 8px 10px rgba(0,0,0,0.20)",
    dp24: "0 24px 38px rgba(0,0,0,0.14), 0 9px 46px rgba(0,0,0,0.12), 0 11px 15px rgba(0,0,0,0.20)",
  },
  padding: {
    outlinedButton: "6px 13px",
    containedButton: "8px 15px",
    textButton: "0px 0px",
  },
  transition: {
    fast: "0.3s",
    slow: "0.5s",
  },

  outline: "rgba(255, 255, 255, 0.12)",
};

export const Theme = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};
