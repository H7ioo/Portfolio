import React, { useContext } from "react";
import { FlexContainer, HeaderText, ThemeButton, Wrapper } from "../../styles";
import styles from "./index.module.scss";
import { Searchbar } from "./Searchbar";

type HeaderProps = {
  toggleTheme: () => void;
};

export const Header = ({ toggleTheme }: HeaderProps) => {
  return (
    <Wrapper margin="50px 0 20px">
      <FlexContainer
        margin="0 0 10px"
        justifyContent="space-between"
        alignItems="center"
        className={styles.header}
      >
        <HeaderText>Notes</HeaderText>
        <ThemeButton onClick={() => toggleTheme()}>Toggle Mode</ThemeButton>
      </FlexContainer>
      <Searchbar />
    </Wrapper>
  );
};
