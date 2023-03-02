import React from "react";
import { Radio } from "antd";
import styled from "styled-components";

const StyledRadio = styled(Radio)`
  .ant-radio-checked,
  .ant-radio-wrapper:hover .ant-radio {
    border-color: ${(props) => props.theme.colors.primary};
  }
  .ant-radio-checked .ant-radio-inner {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  .ant-radio-checked::after {
    border: 1px solid ${(props) => props.theme.colors.white};
  }
  .ant-radio-checked .ant-radio-inner::after {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const RadioButton = ({ onChange, label, value, checked }) => {
  return (
    <StyledRadio onChange={onChange} value={value} checked={checked}>
      {label}
    </StyledRadio>
  );
};

export default RadioButton;
