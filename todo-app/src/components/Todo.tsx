import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SunIcon from "../assets/images/icon-sun.svg";
import MoonIcon from "../assets/images/icon-moon.svg";
import CrossIcon from "../assets/images/icon-cross.svg";
const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  width: 40%;
  @media (max-width: 920px) {
    width: 90%;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 125px;
`;

const Logo = styled.div`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
`;

const DarkModeIcon = styled.img`
  cursor: pointer;
`;

const NewTodoContainer = styled.div`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  padding: 10px 20px;
  margin-top: 30px;
`;

const TodoCircle = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border-color: ${(props) => props.theme.checkColor};
  border-width: 2px;
  border-style: solid;
`;

const NewTodoInput = styled.input`
  background: none;
  border: none;
  padding: 15px;
  color: ${(props) => props.theme.textColor};
  flex-grow: 1;
`;

const PlusIcon = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.theme.plusColor};
  cursor: pointer;
`;

const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  box-shadow: 1px 8px 10px ${(props) => props.theme.shadowColor},
    2px 5px 7px ${(props) => props.theme.shadowColor},
    1px 7px 4px ${(props) => props.theme.shadowColor};
`;

const Cross = styled.img`
  display: none;
`;

const Todos = styled(NewTodoContainer)`
  border-bottom: 1px solid ${(props) => props.theme.checkColor};
  margin: 0;
  cursor: pointer;
  &:hover ${Cross} {
    display: block;
  }
`;

const TodoText = styled.p`
  flex-grow: 1;
`;

const TodoCircleHover = styled(TodoCircle)`
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: inherit;
    background-color: ${(props) => props.theme.cardBackgroundColor};
  }
  &:hover {
    border: none;
    background-image: linear-gradient(${(props) => props.theme.checkedColor});
  }
  &.active {
    background-image: linear-gradient(${(props) => props.theme.checkedColor});
    border: none;
    &:after {
      background-color: transparent;
    }
  }
`;

const TodoControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 20px;
  > span {
    color: ${(props) => props.theme.inactiveColor};
    font-size: 0.8rem;
  }
  > span:last-child {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.hoverColor};
    }
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 25px;
    span {
      font-weight: bold;
      cursor: pointer;
      &.active {
        color: ${(props) => props.theme.primary};
      }
      &:hover {
        color: ${(props) => props.theme.hoverColor};
      }
    }
  }
`;

export const Todo = ({
  isDarkTheme,
  toggleTheme,
}: {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}) => {
  const handleActive = (event: React.MouseEvent<HTMLElement>) => {
    const controls = document.querySelector(".controls");
    let controlsChildren = [...(controls?.children || [])];
    controlsChildren.forEach((child) => child.classList.remove("active"));
    let click = event.target as HTMLSpanElement;
    click.classList.add("active");
  };

  const [tasks, setTasks] = useState<object[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = () => {
    setTasks((oldArray) => [
      ...oldArray,
      { task: inputRef?.current?.value, id: "ID" },
    ]);
  };

  return (
    <Container>
      <HeaderContainer>
        <Logo>TODO</Logo>
        <DarkModeIcon
          onClick={() => toggleTheme()}
          src={isDarkTheme ? SunIcon : MoonIcon}
        />
      </HeaderContainer>
      <NewTodoContainer>
        <TodoCircle />
        <NewTodoInput ref={inputRef} placeholder="Create a new todo..." />
        <PlusIcon onClick={addTodo}>+</PlusIcon>
      </NewTodoContainer>
      <TodosContainer>
        <>
          {tasks.map((task) => {
            return (
              <Todos>
                <TodoCircleHover
                  onClick={(e: React.MouseEvent) => {
                    let element = e.target as HTMLDivElement;
                    element.classList.toggle("active");
                  }}
                />
                <TodoText>test</TodoText>
                <Cross src={CrossIcon} />
              </Todos>
            );
          })}
          <TodoControlsContainer>
            <span>0 items left</span>
            <div className="controls">
              <span className="active" onClick={handleActive}>
                All
              </span>
              <span onClick={handleActive}>Active</span>
              <span onClick={handleActive}>Completed</span>
            </div>
            <span>Clear completed</span>
          </TodoControlsContainer>
        </>
      </TodosContainer>
    </Container>
  );
};
