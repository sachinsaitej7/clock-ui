import React from "react";
import styled, { useTheme } from "styled-components";
import { useAppMode } from "@app/store";

//antd use icon
import { UserOutlined, ShopOutlined } from "@ant-design/icons";

const BottomBarContainer = styled.div`
  width: 100%;
  height: 56px;
  max-width: 768px;
  background-color: ${(props) => props.theme.bg.default};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${(props) => `${props.theme.space[0]} ${props.theme.space[2]}`};
  box-sizing: border-box;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  z-index: 100;
`;

const LeftItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[2]}`};
  border-top: 4px solid
    ${(props) => (props.active ? props.theme.bg.primary : "none")};
  svg {
    width: 24px;
    height: 24px;
  }
`;

const RightItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[2]}`};
  border-top: 4px solid ${(props) => (props.active ? "#31a683" : "none")};
  svg {
    width: 24px;
    height: 24px;
  }
`;

const BottomBar = () => {
  const theme = useTheme();
  const { mode, setMode } = useAppMode();
  const active = mode === "buyer" ? 0 : 1;

  return (
    <>
      <div style={{ height: theme.space[9] }}></div>
      <BottomBarContainer>
        <LeftItem onClick={() => setMode("buyer")} active={active === 0}>
          <UserOutlined
            style={{ color: active === 0 ? theme.bg.primary : "" }}
          />
        </LeftItem>
        <RightItem onClick={() => setMode("seller")} active={active === 1}>
          <ShopOutlined style={{ color: active === 1 ? "#31a683" : "" }} />
        </RightItem>
      </BottomBarContainer>
    </>
  );
};

export default BottomBar;
