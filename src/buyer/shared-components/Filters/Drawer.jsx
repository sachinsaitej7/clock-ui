import React, { useContext } from "react";
import styled from "styled-components";

import { Drawer } from "antd";

import { FilterContext } from "./FilterContext";

import FilterDrawerContent from "./DrawerContent";
import FilterDrawerFooter from "./DrawerFooter";

import { ReactComponent as CCloseIcon } from "../../assets/common/close-circle.svg";

const StyledDrawer = styled(Drawer)`
  max-width: 768px;
  margin: 0px auto;
  .ant-drawer-content {
    border-top-left-radius: ${(props) => props.theme.borderRadius[3]};
    border-top-right-radius: ${(props) => props.theme.borderRadius[3]};

    .ant-drawer-header {
      padding: ${(props) => props.theme.space[5]};
    }

    .ant-drawer-body {
      padding: ${(props) => props.theme.space[5]};
      padding-right: ${(props) => props.theme.space[2]};
    }

    .ant-drawer-footer {
      padding: ${(props) => props.theme.space[5]};
    }
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

const FilterDrawer = ({ onClose, open }) => {
  const { selectedFilter } = useContext(FilterContext);

  return (
    <div>
      <StyledDrawer
        title={<Title>{selectedFilter?.title}</Title>}
        placement={"bottom"}
        width={"100%"}
        onClose={onClose}
        open={open}
        visible={open}
        closable={false}
        maskClosable={true}
        closeIcon={<StyledCloseIcon />}
        footer={<FilterDrawerFooter />}
        height={selectedFilter?.height || "280px"}
      >
        <FilterDrawerContent />
      </StyledDrawer>
    </div>
  );
};

export default FilterDrawer;
