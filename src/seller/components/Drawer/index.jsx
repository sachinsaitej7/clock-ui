import React from "react";
import styled from "styled-components";

import { Drawer } from "antd";

import { ReactComponent as CCloseIcon } from "@seller/assets/common/close-circle.svg";

const StyledDrawer = styled(Drawer)`
  max-width: 768px;
  margin: 00px auto;
  border-top-left-radius: ${(props) => props.theme.borderRadius[3]};
  border-top-right-radius: ${(props) => props.theme.borderRadius[3]};
  .ant-drawer-header {
    padding: ${(props) => props.theme.space[5]};
  }

  .ant-drawer-body {
    padding: ${(props) => "0px " + props.theme.space[2]};
    padding-right: ${(props) => props.theme.space[2]};
  }

  .ant-drawer-footer {
    padding: ${(props) => props.theme.space[5]};
  }
`;

const StyledCloseIcon = styled(CCloseIcon)`
  width: 24px;
  height: 24px;
`;

const Title = styled.h5`
  font-size: ${(props) => props.theme.fontSizes[5]};
  line-height: 24px;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: ${(props) => props.theme.space[0]};
`;

const FilterDrawer = ({
  onClose,
  open,
  children,
  closable = false,
  title = "Select category",
  height = "580px",
}) => {
  return (
    <StyledDrawer
      title={<Title>{title}</Title>}
      placement={"bottom"}
      width={"100%"}
      onClose={onClose}
      open={open}
      closable={closable}
      maskClosable={true}
      closeIcon={<StyledCloseIcon />}
      height={height}
    >
      {children}
    </StyledDrawer>
  );
};

export default FilterDrawer;
