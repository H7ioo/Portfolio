import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  ButtonProps,
  FlexContainerProps,
  GridContainerProps,
  NavbarLinksProps,
  NavbarToggleProps,
  SLinkProps,
} from "./StylesTypes";

const NAVBAR_HEIGHT = 80;

export const FlexContainer = styled.div<FlexContainerProps>`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
`;
export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.fit},
    minmax(${(props) => props.min}, 1fr)
  );
`;

// TODO Add to theme
export const Container = styled.div`
  position: relative;
  /* https://getbootstrap.com/docs/5.0/layout/containers/ */
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  /* @media (min-width: 1400px) {
    max-width: 1320px;
  } */
`;

export const NavbarToggle = styled.button<NavbarToggleProps>`
  display: none;
  position: relative;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 7.5px;
    background-color: ${({ theme }) => theme.elevation.dp02};
    padding: 10px;
    border-radius: ${({ theme }) => theme.borderRadius.light};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
  span {
    transition: ${({ theme }) => theme.transition.fast};
    &:nth-child(1) {
      rotate: ${(props) => (props.navbarIsOpen ? "45deg" : "0")};
      translate: ${(props) => (props.navbarIsOpen ? "0px 9px" : "0")};
    }
    &:nth-child(2) {
      opacity: ${(props) => (props.navbarIsOpen ? "0" : "100")};
    }
    &:nth-child(3) {
      rotate: ${(props) => (props.navbarIsOpen ? "-45deg" : "0")};
      translate: ${(props) => (props.navbarIsOpen ? "0px -10px" : "0")};
    }
    display: block;
    width: 25px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const VerticalSeparator = styled.div`
  padding: 0 20px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 2px;
    border-radius: 10px;
    height: ${NAVBAR_HEIGHT / 2}px;
    background-color: ${({ theme }) => theme.outline};
  }
`;

export const NavbarStyles = styled(FlexContainer)`
  position: relative;

  height: ${NAVBAR_HEIGHT}px;
  .logo {
    > span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .ulList {
    ul {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

export const NavbarCard = styled(Link)`
  background-color: ${({ theme }) => theme.elevation.dp02};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: ${({ theme }) => theme.borderRadius.light};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  position: relative;
  box-shadow: ${({ theme }) => theme.shadow.dp02};
  transition: ${({ theme }) => theme.transition.fast};
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.dp08};
  }
  > .number {
    display: inline-block;
    position: absolute;
    font-size: 0.75rem;
    top: -11px;
    right: -11px;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 4px 5.2px;
    border-radius: ${({ theme }) => theme.borderRadius.light};
  }
`;

export const NavbarLinks = styled(FlexContainer)<NavbarLinksProps>`
  position: relative;
  .close {
    display: none;
    cursor: pointer;
  }
  transition: ${({ theme }) => theme.transition.fast};
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: ${(props) => (props.navbarIsOpen ? 100 : 0)};
    top: ${NAVBAR_HEIGHT}px;
    left: 50%;
    translate: -50%;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    background-color: ${({ theme }) => theme.elevation.dp02};
    padding-top: 50px;
    z-index: ${(props) => (props.navbarIsOpen ? 1000 : -1000)};
    > ul {
      flex-direction: column;
    }
    ${VerticalSeparator} {
      display: none;
    }
  }
`;

export const SLink = styled(Link)<SLinkProps>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  padding: ${(props) => props.padding};
  background-color: ${(props) =>
    props.elevation ? props.theme.elevation[props.elevation] : ""};
  box-shadow: ${(props) =>
    props.shadow ? props.theme.shadow[props.shadow] : ""};
  transition: ${({ theme }) => theme.transition.fast};
`;

export const Button = styled(SLink)<ButtonProps>`
  ${({ variant, padding, theme }) =>
    (variant === "contained" &&
      css`
        border-radius: ${({ theme }) => theme.borderRadius.light};
        background-color: ${({ theme }) => theme.colors.primary};
        padding: ${padding ? padding : theme.padding.containedButton};
        &:hover {
          filter: brightness(105%);
        }
      `) ||
    (variant === "text" &&
      css`
        padding: ${padding ? padding : theme.padding.textButton};
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      `) ||
    (variant === "outlined" &&
      css`
        border-radius: ${({ theme }) => theme.borderRadius.light};
        border: 2px solid ${({ theme }) => theme.colors.primary};
        padding: ${padding ? padding : theme.padding.outlinedButton};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
        }
      `)};
`;

export const LogoFooter = styled.div`
  font-size: 2rem;
  font-weight: 700;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FooterStyles = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.elevation.dp02};
  ${Container} {
    height: 150px;
    @media (max-width: 767px) {
      height: auto;
    }
  }
  .container {
    height: 100%;
    @media (max-width: 767px) {
      flex-direction: column;
      gap: 20px;
    }
    .item {
      flex-basis: 0;
      flex-grow: 1;
      height: 100%;
      @media (max-width: 767px) {
        justify-content: center;
        text-align: center;
        &:nth-child(1) {
          order: 3;
        }
      }
      &:nth-child(3) {
        font-size: 1.1rem;
        ul {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }
    }
  }
`;
// TODO: Media queries to flexContainer
// TODO: Separate file
// TODO: Logo Component
// TODO: Remove props from components that doesn't require one
