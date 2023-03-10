import React from "react";
import {
  Container,
  FlexContainer,
  LogoFooter,
  SLink,
  FooterStyles,
} from "../../styles/Styles";
import styles from "./index.module.scss";
import { AiFillInstagram, AiFillGithub } from "react-icons/ai";
export const Footer = () => {
  return (
    // <FooterStyles>
    //   <Container>
    //     <FlexContainer
    //       flexDirection="row"
    //       justifyContent="space-between"
    //       gap="15px"
    //     >
    //       <FlexContainer
    //         flexDirection="column"
    //         justifyContent="space-between"
    //         gap="20px"
    //       >
    //         <LogoFooter>
    //           Recipe<span>st</span>
    //         </LogoFooter>
    //         <div>
    //           <p>Copyright &copy; 2023-{new Date().getFullYear()}</p>
    //           <p>All rights reserved. Made by Omar Jano </p>
    //         </div>
    //       </FlexContainer>
    //       <FlexContainer
    //         className="social"
    //         alignItems="center"
    //         flexDirection="column"
    //         gap="20px"
    //       >
    //         {/* TODO: FIX THIS SHIT TOO */}
    //         <p className={styles.follow}>Follow Us</p>
    //         <ul>
    //           <li>
    //             <a href="">
    //               <AiFillInstagram size={30} />
    //             </a>
    //           </li>
    //           <a href="">
    //             <AiFillGithub size={30} />
    //           </a>
    //         </ul>
    //       </FlexContainer>
    //       <FlexContainer className="links" justifyContent="flex-end" gap="20px">
    //         {/* TODO: Fix this shit, 1 ul but break the li */}
    //         <ul>
    //           <li>
    //             <SLink to="/">About Us</SLink>
    //           </li>
    //           <li>
    //             <SLink to="/">Privacy Policy</SLink>
    //           </li>
    //           <li>
    //             <SLink to="/">Terms Of Use</SLink>
    //           </li>
    //           <li>
    //             <SLink to="/">Contact</SLink>
    //           </li>
    //           <li>
    //             <SLink to="/">News</SLink>
    //           </li>
    //         </ul>
    //         <ul>
    //           <li>
    //             <SLink to="/">Advertise</SLink>
    //           </li>
    //         </ul>
    //       </FlexContainer>
    //     </FlexContainer>
    //   </Container>
    // </FooterStyles>
    <FooterStyles>
      <Container>
        <FlexContainer className="container" justifyContent="space-between">
          <FlexContainer
            className="item"
            justifyContent="space-between"
            flexDirection="column"
            // gap="50px"
          >
            <LogoFooter>
              Recipe<span>st</span>
            </LogoFooter>
            <div>
              <p>Copyright &copy; 2023-{new Date().getFullYear()}</p>
              <p>All rights reserved. Made by Omar Jano </p>
            </div>
          </FlexContainer>
          <FlexContainer className="item" justifyContent="center">
            <p className={styles.follow}>Follow Us</p>
          </FlexContainer>
          <FlexContainer className="item" justifyContent="flex-end" gap="30px">
            <ul>
              <li>
                <SLink to="/">About Us</SLink>
              </li>
              <li>
                <SLink to="/">Privacy Policy</SLink>
              </li>
              <li>
                <SLink to="/">Terms Of Use</SLink>
              </li>
              <li>
                <SLink to="/">Contact</SLink>
              </li>
              <li>
                <SLink to="/">News</SLink>
              </li>
            </ul>
            <ul>
              <li>
                <SLink to="/">Advertise</SLink>
              </li>
            </ul>
          </FlexContainer>
        </FlexContainer>
      </Container>
    </FooterStyles>
  );
};
