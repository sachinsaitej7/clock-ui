import React, { useState } from "react";
import styled from "styled-components";

import { Menu } from "antd";

const StyledMenu = styled(Menu)``;

const TopMenu = ({ items, onClick }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const rootSubmenuKeys = ["2"];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <StyledMenu
      items={items}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={({ key }) => {
        onClick(key);
      }}
    />
  );
};

export default TopMenu;
