import React from "react";
import styled, { useTheme } from "styled-components";
import { useAppMode } from "@app/store";

//icons
import { HomeIcon, CurrencyRupeeIcon } from "@assets/icons";

const BottomBarContainer = styled.div`
  width: 100%;
  height: 50px;
  max-width: 768px;
  background-color: ${(props) => props.theme.bg.default};
  padding: ${(props) => `${props.theme.space[0]} ${props.theme.space[2]}`};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  z-index: 100;
`;

const Item = styled.div`
  width: 50%;
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[2]}`};
  border-top: 4px solid
    ${(props) =>
      props.active ? props.theme.colors.primary : props.theme.bg.default};
  color: ${(props) =>
    props.active ? props.theme.text.primary : props.theme.text.dark};
  cursor: pointer;
  box-sizing: none;
  svg {
    width: 24px;
    height: 24px;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes[0]};
    line-height: 12px;
  }

  transition: all 0.3s ease-in-out;
`;

const BottomBar = () => {
  const theme = useTheme();
  const { mode, setMode } = useAppMode();
  const active = mode === "buyer" ? 0 : 1;

  return (
    <>
      <div style={{ height: theme.space[9] }}></div>
      <BottomBarContainer className="flex justify-center items-center">
        <Item
          className="flex flex-col justify-center items-center active:none"
          onClick={() => setMode("buyer")}
          active={active === 0}
        >
          <HomeIcon />
          <p>Buy</p>
        </Item>
        <Item
          className="flex flex-col justify-center items-center active:none"
          onClick={() => setMode("seller")}
          active={active === 1}
        >
          <CurrencyRupeeIcon />
          <p>Earn</p>
        </Item>
      </BottomBarContainer>
    </>
  );
};

export default BottomBar;
