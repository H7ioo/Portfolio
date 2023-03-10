import React, { useRef, useState, useContext } from "react";
import { expensesContext } from "../../App";
import {
  FlexContainer,
  BudgetCard,
  BudgetEditButton,
  ChangeBudgetInput,
} from "../../styles";
import styles from "./index.module.scss";

type HeaderProps = {
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
};

export const Header = ({ budget, setBudget }: HeaderProps) => {
  const changeBudgetInputRef = useRef<HTMLInputElement | null>(null);
  const [editBudget, setEditBudget] = useState(false);

  const handleEditBudget = () => {
    if (changeBudgetInputRef.current) {
      if (parseInt(changeBudgetInputRef.current.value) < 0) return;
      setBudget(parseInt(changeBudgetInputRef.current.value));
    }
    setEditBudget((previousValue) => !previousValue);
  };

  const [expenses, setExpenses] = useContext(expensesContext);

  const remainingReducer = expenses.reduce((previousValue, currentValue) => {
    return previousValue - currentValue.price;
  }, budget);

  const spentReducer = expenses.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price;
  }, 0);

  return (
    <>
      <h1 className={styles.title}>Bütçe Planım</h1>
      <FlexContainer justifyContent="space-between">
        {editBudget ? (
          <BudgetCard
            justifyContent="space-between"
            backgroundColor={"#dddfe0"}
          >
            <ChangeBudgetInput
              ref={changeBudgetInputRef}
              type="number"
              min={0}
              defaultValue={2000}
            />
            <BudgetEditButton onClick={handleEditBudget}>
              Kaydet
            </BudgetEditButton>
          </BudgetCard>
        ) : (
          <BudgetCard
            justifyContent="space-between"
            backgroundColor={"#dddfe0"}
          >
            <span>Bütçe: ${budget}</span>
            <BudgetEditButton onClick={handleEditBudget}>
              Düzenle
            </BudgetEditButton>
          </BudgetCard>
        )}
        <BudgetCard backgroundColor={"#cfead6"}>
          <span>Kalan: ${remainingReducer}</span>
        </BudgetCard>
        <BudgetCard backgroundColor={"#c4e1ff"}>
          <span>Harcalınan: ${spentReducer}</span>
        </BudgetCard>
      </FlexContainer>
    </>
  );
};
