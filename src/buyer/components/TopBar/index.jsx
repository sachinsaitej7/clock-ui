import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// import CartComponent from "./CartComponent";

//images
import { Logo } from "@assets/logo";

const TopBarContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 56px;
  background-color: ${(props) => props.theme.bg.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  z-index: 100;
`;

const RightMenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: ${(props) => props.theme.space[5]};
`;

const RightMenu = (
  <RightMenuContainer>
    {/* <CartComponent /> */}
  </RightMenuContainer>
);

const LeftMenu = (
  <Link to="/">
    <Logo />
  </Link>
);

const TopBar = () => {
  return (
    <TopBarContainer>
      {LeftMenu}
      {RightMenu}
    </TopBarContainer>
  );
};

export default TopBar;
