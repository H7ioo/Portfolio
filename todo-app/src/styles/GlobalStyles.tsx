import { createGlobalStyle } from "styled-components";
import { useTheme } from "styled-components";
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'Josefin Sans', sans-serif;
  }
  body {
    color: ${(props) => props.theme.textColor};
  }
  #root {
    margin:0 auto;
  }
  .App {
    min-height: 100vh;
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;
export default GlobalStyles;
