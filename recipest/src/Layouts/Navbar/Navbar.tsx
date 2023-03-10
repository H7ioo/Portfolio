import React from "react";
import { useTheme } from "styled-components";
import {
  Container,
  FlexContainer,
  NavbarStyles,
  NavbarCard,
  VerticalSeparator,
  SLink,
  NavbarLinks,
  NavbarToggle,
  Button,
} from "../../styles/Styles";
import { MdShoppingCart, MdPerson } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeNavbar, openNavbar } from "../../features/app/appSlice";
import { ImCross } from "react-icons/im";
export const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const navbarIsOpen = useAppSelector((state) => state.app.navbarIsOpen);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const handleOpenNavbar = () => {
    dispatch(!navbarIsOpen ? openNavbar() : closeNavbar());
  };
  return (
    <Container>
      <NavbarStyles justifyContent="space-between" alignItems="center">
        <SLink fontSize="2rem" fontWeight={700} to="/" className="logo">
          Recipe<span>st</span>
        </SLink>
        <NavbarToggle onClick={handleOpenNavbar} navbarIsOpen={navbarIsOpen}>
          <span></span>
          <span></span>
          <span></span>
        </NavbarToggle>
        <NavbarLinks navbarIsOpen={navbarIsOpen} className="ulList">
          <ul>
            <li>
              <SLink fontSize="1.2rem" to="/">
                Recipes
              </SLink>
            </li>
            <li>
              <SLink fontSize="1.2rem" to="/">
                Random
              </SLink>
            </li>
          </ul>
          <VerticalSeparator />
          {user.loggedIn ? (
            <ul>
              <li>
                <SLink fontSize="1.2rem" to="/saved">
                  Saved
                </SLink>
              </li>
              <ul>
                <li>
                  <NavbarCard to="/shopping-cart">
                    <MdShoppingCart size={23} color={theme.colors.primary} />
                    <span className="number">99</span>
                  </NavbarCard>
                </li>
                <li>
                  <NavbarCard to="/">
                    <MdPerson size={25} color={theme.colors.primary} />
                  </NavbarCard>
                </li>
              </ul>
            </ul>
          ) : (
            <ul>
              <li>
                <Button
                  variant="outlined"
                  // onClick={() => dispatch(login())}
                  fontSize="1.2rem"
                  to="/login"
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  variant="text"
                  padding="0px"
                  fontSize="1.2rem"
                  to="/sign-up"
                >
                  Sign up
                </Button>
              </li>
            </ul>
          )}
        </NavbarLinks>
      </NavbarStyles>
    </Container>
  );
};
