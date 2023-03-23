import React from "react";
import { Checkbox } from "antd";
import styled from "styled-components";

const StyledCheckbox = styled(Checkbox)``;

const CheckBox = ({ onChange, label = null, checked, value }) => {
  return (
    <StyledCheckbox onChange={onChange} checked={checked} value={value}>
      {label}
    </StyledCheckbox>
  );
};

export default CheckBox;
