import React from "react";
import styled from "styled-components";
import darkDesktopImage from "../assets/images/bg-desktop-dark.jpg";
import lightDesktopImage from "../assets/images/bg-desktop-light.jpg";
const BackgroundTheme = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  width: 100%;
`;
export const Background = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <>
      {isDarkTheme ? (
        <BackgroundTheme src={darkDesktopImage} />
      ) : (
        <BackgroundTheme src={lightDesktopImage} />
      )}
    </>
  );
};
