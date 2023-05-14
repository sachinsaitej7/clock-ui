import React from "react";
import { useTheme } from "styled-components";
import { FloatButton } from "antd";
import { ReactComponent as Add } from "@seller/assets/common/plus-circle-filled.svg";
import { StyledStickyFloater } from "@seller/styled-components";
import { ReactComponent as Location } from "@seller/assets/common/map-pin.svg";
import { ReactComponent as Tag } from "@seller/assets/common/tag.svg";

const Floater = ({ handleAddNew }) => {
  const theme = useTheme();
  return (
    <FloatButton.Group
      trigger='hover'
      style={{ right: theme.space[4], bottom: theme.space[9] }}
      icon={
        <StyledStickyFloater>
          <Add style={{ color: theme.colors.primary }} />
        </StyledStickyFloater>
      }
    >
      <FloatButton icon={<Location />} onClick={() => handleAddNew("place")} />
      <FloatButton onClick={() => handleAddNew("product")} icon={<Tag />} />
    </FloatButton.Group>
  );
};

export default Floater;
