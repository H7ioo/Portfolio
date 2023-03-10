import { DefaultTheme } from "styled-components";

export type FlexContainerProps = Partial<{
  margin: string;
  padding: string;
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  gap: string;
}>;

export type GridContainerProps = {
  fit: "auto-fit" | "auto-fill";
  min: string;
};

export type SLinkProps = Partial<{
  fontSize: string;
  fontWeight: number;
  padding: string;
  elevation: keyof DefaultTheme["elevation"];
  shadow: keyof DefaultTheme["shadow"];
}>;

export type NavbarLinksProps = {
  navbarIsOpen: boolean;
};

export type NavbarToggleProps = {
  navbarIsOpen: boolean;
};

export type ButtonProps = {
  variant: "contained" | "text" | "outlined";
};
