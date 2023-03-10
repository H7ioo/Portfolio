import styled from "styled-components";
import { CardType, FlexContainerType } from "./stylesTypes";
import arrowDown from "../assets/arrow-down.png";
export const GRAY_COLOR = "#3f3c3cc7";

export const FlexContainer = styled.div<FlexContainerType>`
  margin: ${(props) => props.margin};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
`;

export const Container = styled.div`
  padding: 50px 0;
  gap: 25px;
  max-width: 840px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

export const CardsContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px; */
  display: flex;
  gap: 25px;
`;

export const Card = styled.div<CardType>`
  position: relative;
  background-color: #ffffff;
  padding: 20px 20px 40px;
  border-radius: 15px;
  width: 220px;
  & .header {
    color: ${GRAY_COLOR};
    margin-bottom: 5px;
  }
  & .number {
    display: block;
    font-weight: 700;
    font-size: 1.3rem;
  }
  & .date {
    color: ${GRAY_COLOR};
    font-weight: 700;
    font-size: 0.9rem;
  }
  & .text {
    font-size: 0.9rem;
    font-weight: 600;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.beforeColor};
    height: 10px;
    width: 100%;
    border-radius: 0px 0px 15px 15px;
  }
`;

export const CountrySelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; /* Remove default arrow */
  width: 450px;
  padding: 5px 35px 5px 5px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${GRAY_COLOR};
  outline: none;
  background-color: transparent;
  height: 34px;

  background: url("${arrowDown}") 97% / 15% no-repeat; /* Standard syntax; must be last */
  background-size: 10px;
`;
