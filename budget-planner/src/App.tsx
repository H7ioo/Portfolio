import React, { useRef, useState } from "react";

import { createGlobalStyle } from "styled-components";
import { Expenses } from "./components/expenses/Expenses";
import { Header } from "./components/header/Header";
import { Container } from "./styles";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
  }
  body {

  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  input {
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

export type ExpensesType = {
  name: string;
  price: number;
  id: string;
};

export const expensesContext = React.createContext(
  null as unknown as [
    ExpensesType[],
    React.Dispatch<React.SetStateAction<ExpensesType[]>>
  ]
);
function App() {
  const [budget, setBudget] = useState(2000);
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);

  return (
    <div className="App">
      <expensesContext.Provider value={[expenses, setExpenses]}>
        <GlobalStyles />
        <Container>
          <Header budget={budget} setBudget={setBudget} />
          <Expenses />
        </Container>
      </expensesContext.Provider>
    </div>
  );
}

export default App;
