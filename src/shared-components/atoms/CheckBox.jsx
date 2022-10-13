import React from "react";
import { Checkbox } from "antd";
import styled from "styled-components";

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  .ant-checkbox-checked::after{
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const CheckBox = ({ onChange, label = null, checked, value }) => {
  return (
    <StyledCheckbox onChange={onChange} checked={checked} value={value}>
      {label}
    </StyledCheckbox>
  );
};

export default CheckBox;
