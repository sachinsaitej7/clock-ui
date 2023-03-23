import React from "react";
import { Radio } from "antd";
import styled from "styled-components";

const StyledRadio = styled(Radio)``;

const RadioButton = ({ onChange, label, value, checked }) => {
  return (
    <StyledRadio onChange={onChange} value={value} checked={checked}>
      {label}
    </StyledRadio>
  );
};

export default RadioButton;
