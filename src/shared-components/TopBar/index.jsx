import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";

//images
import { ReactComponent as Logo } from "../../assets/common/logo-mobile.svg";
import { ReactComponent as BetaIcon } from "../../assets/common/beta.svg";
import { ReactComponent as CartIcon } from "../../assets/common/shopping-cart.svg";
import { ReactComponent as MenuIcon } from "../../assets/common/menu.svg";
import { ReactComponent as CCloseIcon } from "../../assets/common/close-circle.svg";

import { Drawer } from "antd";
import TopMenu from "../TopMenu";
import { CircleTag } from "../atoms";
import LoginModal from "../LoginModal";

const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  box-sizing: border-box;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.05);
`;

const RightMenuContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.close ? "1fr 1fr" : "1fr 1fr")};
  align-items: center;
  grid-gap: ${(props) => props.theme.space[5]};
  cursor: pointer;
`;

const StyledLogoContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: ${(props) => props.theme.space[1]};
`;

const StyledDrawer = styled(Drawer)`
  top: 50px;
  height: 100%;
`;

const TopBar = ({
  itemsCount,
  clickHandler = () => {},
  openLogin = false,
  authHandler = {},
  menuItems = [],
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const theme = useTheme();
  const handleMenu = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <TopBarContainer>
      <StyledLogoContainer>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/">
          <BetaIcon />
        </Link>
      </StyledLogoContainer>
      {drawerVisible ? (
        <RightMenuContainer close>
          <div style={{ width: "20px" }}></div>
          <CCloseIcon onClick={handleMenu} />
        </RightMenuContainer>
      ) : (
        <RightMenuContainer>
          <div
            style={{ position: "relative" }}
            onClick={() => clickHandler("cart")}
          >
            <CartIcon />
            {!!itemsCount && (
              <CircleTag
                active
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  padding: theme.space[2],
                  lineHeight: "12px",
                }}
                title={itemsCount}
              />
            )}
          </div>
          <MenuIcon onClick={handleMenu} />
        </RightMenuContainer>
      )}

      {drawerVisible && (
        <StyledDrawer
          placement="top"
          onClose={handleMenu}
          visible={drawerVisible}
          closable={false}
          bodyStyle={{
            padding: theme.space[0],
            paddingTop: theme.space[5],
          }}
        >
          <TopMenu
            items={menuItems}
            onClick={(key) => {
              clickHandler("menu", { key });
              handleMenu();
            }}
          />
        </StyledDrawer>
      )}
      {openLogin && (
        <LoginModal
          handleClose={() => clickHandler("login", {})}
          {...authHandler}
        />
      )}
    </TopBarContainer>
  );
};

export default TopBar;
