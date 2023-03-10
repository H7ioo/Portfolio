import styled from "styled-components";
import { BudgetProps, FlexProps, WrapperProps } from "./stylesTypes";

export const Container = styled.div`
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 30px;
  padding-left: 30px;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const Wrapper = styled.div<WrapperProps>`
  margin: ${(props) => props.margin};
`;

export const FlexContainer = styled.div<FlexProps>`
  margin: ${(props) => props.margin};
  display: flex;
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
`;
export const BudgetCard = styled(FlexContainer)<BudgetProps>`
  background-color: ${(props) => props.backgroundColor};
  padding: 17.5px;
  width: 300px;
  align-items: center;
  border-radius: 5px;
`;

export const BudgetEditButton = styled.button`
  background-color: #0073fb;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const SearchInputContainer = styled(FlexContainer)`
  margin-top: 10px;
  border: 1px solid #00000033;
  border-radius: 5px;
  padding: 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 1.1rem;
  padding-left: 10px;
`;

export const ExpensesList = styled(FlexContainer)`
  border: 1px solid #00000033;
  border-radius: 5px;
  border-top: none;
  border-bottom: none;
  /* width: 100%; */
  & > :not(:first-child) {
    border-top: none;
  }
  & > :last-child {
    border-radius: 5px;
  }
`;

export const ExpensesItem = styled(FlexContainer)`
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  border: 1px solid #00000033;
  border-left: none;
  border-right: none;
`;

export const ExpenseInput = styled.input`
  border: 1px solid #00000033;
  border-radius: 5px;
  font-size: 1.1rem;
  padding: 5px;
`;

export const SaveExpenseButton = styled(BudgetEditButton)`
  padding: 7.5px 15px;
  font-size: 0.9rem;
`;

export const ChangeBudgetInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
`;
