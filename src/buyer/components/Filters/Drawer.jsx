import React from "react";
import styled from "styled-components";

import { Drawer } from "antd";

import { XCircleIcon } from "@assets/icons";

import { useFilterContext } from "./FilterProvider";
import FilterDrawerContent from "./DrawerContent";
import FilterDrawerFooter from "./DrawerFooter";

const StyledDrawer = styled(Drawer)`
  max-width: 768px;
  margin: 0px auto;
  border-top-left-radius: ${(props) => props.theme.borderRadius[2]};
  border-top-right-radius: ${(props) => props.theme.borderRadius[2]};
  .ant-drawer-header {
    padding: ${(props) => props.theme.space[5]};
  }

  .ant-drawer-body {
    padding: ${(props) => props.theme.space[2]}
      ${(props) => props.theme.space[5]};
  }
`;

const Title = styled.h5`
  font-size: ${(props) => props.theme.fontSizes[5]};
  line-height: 24px;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin: ${(props) => props.theme.space[0]};
`;

const FilterDrawer = ({ onClose, open }) => {
  const { selectedFilter } = useFilterContext();

  return (
    <StyledDrawer
      title={<Title>{selectedFilter?.title}</Title>}
      placement={"bottom"}
      onClose={onClose}
      open={open}
      closable={false}
      maskClosable={true}
      closeIcon={<XCircleIcon width="24px" />}
      footer={<FilterDrawerFooter onClose={onClose} />}
      height={selectedFilter?.height || "246px"}
    >
      <FilterDrawerContent />
    </StyledDrawer>
  );
};

export default FilterDrawer;
