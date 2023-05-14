import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//images
import { LogoutOutlined } from "@ant-design/icons";
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

const RightMenuContainer = styled.div``;

const RightMenu = ({ handleClick }) => (
  <RightMenuContainer>
    {handleClick && <LogoutOutlined onClick={handleClick} />}
  </RightMenuContainer>
);

const LeftMenu = (
  <Link to='/seller'>
    <Logo width='75px' height='32px' />
  </Link>
);

const TopBar = ({ handleClick }) => {
  return (
    <TopBarContainer>
      {LeftMenu}
      {<RightMenu handleClick={handleClick} />}
    </TopBarContainer>
  );
};

export default TopBar;
