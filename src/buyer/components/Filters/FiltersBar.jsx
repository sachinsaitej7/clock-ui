import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

import { ChevronDownIcon, AdjustmentsHorizontalIcon } from "@assets/icons";

import { useFilterContext } from "./FilterProvider";

const { Text } = Typography;

const Container = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

const FiltersBar = ({ filters, onClick }) => {
  const { setSelectedFilter, values } = useFilterContext();

  const handleClick = (filter) => {
    setSelectedFilter({ ...filter });
    onClick();
  };

  return (
    <Container className="flex justify-start items-center w-full">
      {filters.map((filter, index) => {
        return (
          <StyledTag
            onClick={() => handleClick(filter)}
            key={filter.key + index}
            active={!!values[filter.key]}
          >
            <AdjustmentsHorizontalIcon
              width="12px"
              style={{ marginRight: "4px", width: "12px", height: "12px" }}
            />
            <Text ellipsis>{generateLabel(filter, values)}</Text>
            <ChevronDownIcon
              width="12px"
              height="12px"
              style={{ marginLeft: "4px", width: "12px", height: "12px" }}
            />
          </StyledTag>
        );
      })}
    </Container>
  );
};

export default FiltersBar;
