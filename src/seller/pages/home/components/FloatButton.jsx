import React from "react";
import { useTheme } from "styled-components";
import { FloatButton } from "antd";
import { ReactComponent as Add } from "@seller/assets/common/plus-circle-filled.svg";
import { StyledStickyFloater } from "@seller/styled-components";

const Floater = ({ handleAddNew }) => {
  const theme = useTheme();
  return (
    <FloatButton
      style={{ right: theme.space[4], bottom: theme.space[9] }}
      onClick={() => handleAddNew("place")}
      icon={
        <StyledStickyFloater>
          <Add style={{ color: theme.colors.primary }} />
        </StyledStickyFloater>
      }
    />
  );
};

export default Floater;
