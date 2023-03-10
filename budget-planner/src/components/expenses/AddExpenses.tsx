import React, { useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { expensesContext } from "../../App";
import {
  BudgetEditButton,
  ExpenseInput,
  FlexContainer,
  SaveExpenseButton,
} from "../../styles";

import styles from "./index.module.scss";

export const AddExpenses = () => {
  const [expenses, setExpenses] = useContext(expensesContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const handleAddExpenses = () => {
    let name = nameRef!.current!.value;
    let price = parseInt(priceRef!.current!.value);
    if (name.length <= 0 || name === "" || price < 0) return;
    setExpenses((expenses) => [
      ...expenses,
      {
        name: name,
        price: price,
        id: uuidv4(),
      },
    ]);
    nameRef!.current!.value = "";
    priceRef!.current!.value = "";
  };
  return (
    <>
      <h2 className={styles.title}>Harcama ekle</h2>
      <FlexContainer gap={20} margin="10px 0 15px">
        <FlexContainer flexDirection="column" gap={5}>
          <label htmlFor="name">Adı</label>
          <ExpenseInput ref={nameRef} type="text" id="name" />
        </FlexContainer>
        <FlexContainer flexDirection="column" gap={5}>
          <label htmlFor="name">Fiyat</label>
          <ExpenseInput ref={priceRef} min="0" type="number" id="name" />
        </FlexContainer>
      </FlexContainer>
      <SaveExpenseButton onClick={handleAddExpenses}>Ekle</SaveExpenseButton>
    </>
  );
};
