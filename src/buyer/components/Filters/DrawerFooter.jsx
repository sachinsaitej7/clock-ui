import React from "react";
import styled from "styled-components";

import { Button } from "antd";
import { removeEmptyKeys } from "@buyer/utils";

import { useFilterContext } from "./FilterProvider";

const StyledButton = styled(Button)`
  height: 32px;
  margin: 0px;
  width: 48%;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  box-shadow: none;
`;

export default function DrawerFooter({ onClose }) {
  const { filterValues, setFilterValues, selectedFilter, onApply } =
    useFilterContext();
  const { key, type } = selectedFilter;

  const handleClear = () => {
    const newFilterValues = { ...filterValues };
    delete newFilterValues[key];
    setFilterValues(newFilterValues);
    onApply(removeEmptyKeys(newFilterValues), selectedFilter);
    onClose();
  };

  const handleApply = () => {
    onApply(removeEmptyKeys(filterValues), selectedFilter);
    onClose();
  };

  return (
    <div className="flex items-center justify-between">
      <StyledButton
        type="text"
        onClick={handleClear}
        className="text-primary"
        disabled={type === "single_select"}
      >
        Clear All
      </StyledButton>
      <StyledButton
        type="primary"
        className="bg-primary hover:bg-primary-dark"
        onClick={handleApply}
      >
        Apply
      </StyledButton>
    </div>
  );
}
