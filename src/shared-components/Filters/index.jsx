import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";

import { FILTER_MAP } from "./constants";
import { FilterContext } from "./FilterContext";
import FilterDrawer from "./Drawer";

import { ReactComponent as FilterIcon } from "../../assets/common/filter.svg";
import { ReactComponent as DownArrow } from "../../assets/common/chevron-down.svg";

const { Text } = Typography;

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bg.white};
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTag = styled.span`
  display: inline-flex;
  margin: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  padding: ${(props) => props.theme.space[3]};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.colors.primary : "rgba(41, 41, 41, 0.12)"};
  background-color: ${(props) =>
    props.active ? props.theme.bg.secondary : props.theme.bg.default};
  span {
    color: ${(props) =>
      props.active ? props.theme.text.primary : props.theme.text.dark};
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 16px;
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

const generateLabel = (filter, values) => {
  const { label, key, options } = filter;
  const value = values[key];
  if (value) {
    const optionLabel = options?.find(
      (option) => option.value === value[0]
    )?.label;

    return `${label}: ${value.length > 1 ? `(${value.length})` : optionLabel}`;
  }
  return label;
};

const Filters = ({ filters = [], values = {}, onApply = () => {} }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterValues, setFilterValues] = useState(values);

  const handleOpen = (filter) => {
    setSelectedFilter(filter);
    setOpen(true);
  };

  const handleClose = (finalValues) => {
    setOpen(false);
    setFilterValues(finalValues || values);
  };

  const handleApply = (finalValues) => {
    onApply(finalValues);
    handleClose(finalValues);
  };

  const mergedFilters = filters.map((filter) => {
    if (filter.options)
      return {
        ...FILTER_MAP[filter.label],
        options: filter.options,
      };
    return FILTER_MAP[filter.label];
  });

  return (
    <FilterContext.Provider
      value={{
        filterValues,
        setFilterValues,
        selectedFilter,
        values,
        handleApply,
      }}
    >
      <FilterBar>
        {mergedFilters.map((filter) => {
          return (
            <StyledTag
              onClick={() => handleOpen(filter)}
              key={filter.key}
              active={!!values[filter.key]}
            >
              <FilterIcon width="12px" style={{ marginRight: "4px" }} />
              <Text ellipsis>{generateLabel(filter, values)}</Text>
              <DownArrow width="12px" style={{ marginLeft: "4px" }} />
            </StyledTag>
          );
        })}
      </FilterBar>
      <FilterDrawer open={open} onClose={() => handleClose()} />
    </FilterContext.Provider>
  );
};

Filters.Drawer = FilterDrawer;

export default Filters;
