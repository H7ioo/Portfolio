import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
export const GlobalStyles = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  letter-spacing: -0.3px;
  }
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.link};
  }
`;
