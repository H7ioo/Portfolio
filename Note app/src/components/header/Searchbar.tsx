import React, { useContext } from "react";
import { FlexContainer, InputField } from "../../styles";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "./index.module.scss";
import { SearchContext } from "../../App";
export const Searchbar = () => {
  const setSearchText = useContext(SearchContext);
  const handleSearch = (value: string) => {
    if (setSearchText) {
      setSearchText(value);
    }
  };
  return (
    <>
      <FlexContainer alignItems="center" gap={5} className={styles.searchBar}>
        <BiSearchAlt2 size={18} />
        <InputField
          placeholder="Search for a note..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </FlexContainer>
    </>
  );
};
