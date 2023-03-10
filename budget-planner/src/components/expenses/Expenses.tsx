import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import {
  ExpensesItem,
  ExpensesList,
  FlexContainer,
  SearchInput,
  SearchInputContainer,
} from "../../styles";
import { AddExpenses } from "./AddExpenses";
import { expensesContext } from "../../App";
export const Expenses = () => {
  const [expenses, setExpenses] = useContext(expensesContext);
  const [searchParams, setSearchParams] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchParams(searchValue);
  };

  const filterSearch = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  return (
    <>
      <h2 className={styles.title}>Harcamalar</h2>
      <SearchInputContainer alignItems="center" margin="0 0 10px">
        <AiOutlineSearch size={24} />
        <SearchInput
          onChange={(e) => handleSearch(e)}
          placeholder="Araştırmak için yazınız..."
        />
      </SearchInputContainer>
      <ExpensesList flexDirection="column">
        {filterSearch.map((expense) => {
          return (
            <ExpensesItem key={expense.id} alignItems="center">
              <p>{expense.name}</p>
              <FlexContainer gap={15} alignItems="center">
                <span className={styles.price}>${expense.price}</span>
                <GiCancel
                  onClick={() => handleDelete(expense.id)}
                  size={20}
                  cursor="pointer"
                />
              </FlexContainer>
            </ExpensesItem>
          );
        })}
      </ExpensesList>
      <AddExpenses />
    </>
  );
};
