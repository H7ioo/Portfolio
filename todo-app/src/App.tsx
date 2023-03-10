import { useState } from "react";
import { Background } from "./components/Background";
import { Todo } from "./components/Todo";
import GlobalStyles from "./styles/GlobalStyles";
import { DefaultTheme } from "styled-components";
import { ThemeProvider } from "styled-components";

// const theme: DefaultTheme = {
//   primary: "hsl(220, 98%, 61%)",
//   background: "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)",
//   dark: {
//     veryDarkDBlue: "hsl(235, 24%, 19%)",
//     darkGrayBlue: "hsl(234, 11%, 52%)",
//     veryDarkGrayBlue: "hsl(233, 14%, 35%)",
//     veryDarkGrayBlue2: "hsl(237, 14%, 26%)",
//   },
//   light: {
//     veryLightBlue: "hsl(0, 0%, 98%)",
//     veryLightGrayBlue: "hsl(236, 33%, 92%)",
//     lightGrayBlue: "hsl(233, 11%, 84%)",
//     darkGrayBlue: "hsl(236, 9%, 61%)",
//     veryDarkGrayBlue: "hsl(235, 19%, 35%)",
//   },
// };

function App() {
  const defaultTheme = {
    primary: "hsl(220, 98%, 61%)",
    checkedColor: "hsl(192, 100%, 67%), hsl(280, 87%, 65%)",
  };
  const darkTheme: DefaultTheme = {
    ...defaultTheme,
    backgroundColor: "hsl(235, 21%, 11%)",
    cardBackgroundColor: "hsl(235, 24%, 19%)",
    textColor: "hsl(0, 0%, 73%)",
    inactiveColor: "hsl(234, 11%, 52%)",
    hoverColor: "hsl(236, 33%, 92%)",
    checkColor: "hsl(233, 14%, 35%)",
    shadowColor: "hsla(0, 0%, 7%, 0.877)",
    plusColor: "white",
  };
  const lightTheme: DefaultTheme = {
    ...defaultTheme,
    backgroundColor: "hsl(0, 0%, 98%)",
    cardBackgroundColor: "hsl(0, 0%, 98%)",
    textColor: "hsl(0, 0%, 26%)",
    inactiveColor: "hsl(236, 9%, 61%)",
    hoverColor: "hsl(235, 19%, 35%)",
    checkColor: "hsl(233, 11%, 84%)",
    shadowColor: "hsla(240, 5%, 85%, 0.603)",
    plusColor: "black",
  };
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />

      <div className="App">
        <Background isDarkTheme={isDarkTheme} />
        <Todo isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  );
}

export default App;
