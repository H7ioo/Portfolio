import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Mukta', sans-serif;
}
input {
  outline: none;
}
button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}
`;
