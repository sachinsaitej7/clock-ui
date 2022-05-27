import React, { useState } from "react";
import styled from "styled-components";

//images
import { ReactComponent as UserIcon } from "../../assets/common/user.svg";
import { ReactComponent as CategoryIcon } from "../../assets/common/category.svg";

import { Menu } from "antd";

const MENU_ITEMS = [
  {
    key: "1",
    label: "Profile",
    icon: <UserIcon />,
  },
  {
    key: "2",
    label: "Categories",
    icon: <CategoryIcon />,
    children: [
      {
        key: "3",
        label: "All Products",
      },
      {
        key: "4",
        label: "Men",
      },
      {
        key: "5",
        label: "Women",
      },
    ],
  },
];

const StyledMenu = styled(Menu)`
    /* .ant-menu-submenu-active, .ant-menu-submenu-title:hover{
        color: ${(props) => props.theme.colors.primary}};
    };
    .ant-menu-item-active{
        color: ${(props) => props.theme.colors.primary}};
    }; */
`;

const TopMenu = () => {
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
      items={MENU_ITEMS}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={(item) => {console.log(item)}}
    />
  );
};

export default TopMenu;
