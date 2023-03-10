import React, { createContext } from "react";
import { useState } from "react";
import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";
import { Header } from "./components/header/Header";
import { Notes } from "./components/notes/Notes";
import { Container } from "./styles";
export const SearchContext = React.createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

function App() {
  const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    color: ${(props) => props.theme.textColor};
    font-family: "Josefin Sans", sans-serif;
  }
    body { 
      margin: 0;
      background-color: ${(props) => props.theme.backgroundColor};
    }
    button {
      outline: none;
      background: none;
      border: none;
  cursor: pointer;
    }
    input {
      background: none;
      outline: none;
      border: none;
    }
    textarea {
      border: none;
    resize: none;
    background-color: transparent;
    }
    textarea:focus {
      outline: none;
    }
  `;

  const darkTheme: DefaultTheme = {
    textColor: "#f1f1f1",
    backgroundColor: "#212121",
    takeNoteCardColor: "#4d5051a3",
    doneCardBackgroundColor: "#4d5051a3",
  };
  const lightTheme: DefaultTheme = {
    textColor: "#000",
    backgroundColor: "#f1f1f1",
    takeNoteCardColor: "#c7cccfeb",
    doneCardBackgroundColor: "#c7cccfeb",
  };

  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const [searchText, setSearchText] = useState("");
  return (
    <div className="App">
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <SearchContext.Provider value={setSearchText}>
          <GlobalStyles />
          <Container>
            <Header toggleTheme={toggleTheme} />
            <Notes searchText={searchText} />
          </Container>
        </SearchContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
