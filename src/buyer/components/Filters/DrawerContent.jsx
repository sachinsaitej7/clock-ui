import React from "react";
import styled from "styled-components";

import { CheckBox, Radio } from "@buyer/components";
import { useFilterContext } from "./FilterProvider";

const Option = styled.div`
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 18px;
  color: ${(props) => props.theme.text.dark};
  margin: ${(props) => props.theme.space[3]} 0px;

  p {
    font-weight: ${(props) =>
      props.checked
        ? props.theme.fontWeights.semibold
        : props.theme.fontWeights.normal};
  }
`;

const CheckBoxOptionItem = ({ option, checked, onClick }) => {
  return (
    <Option
      className="flex justify-between items-center w-full cursor-pointer"
      onClick={() => onClick(option)}
      checked={checked}
    >
      <p>{option.label}</p>
      <CheckBox checked={checked} />
    </Option>
  );
};

const RadioOptionItem = ({ option, checked, onClick }) => {
  return (
    <Option
      className="flex justify-between items-center w-full cursor-pointer"
      onClick={() => onClick(option)}
      checked={checked}
    >
      <p>{option.label}</p>
      <Radio checked={checked} />
    </Option>
  );
};

const DrawerContent = () => {
  const { selectedFilter, filterValues, setFilterValues } = useFilterContext();
  const { key, type, options, optionType } = selectedFilter;
  const selectedValues = filterValues[key] || [];

  const handleOptionClick = ({ value }) => {
    if (type === "single_select") {
      setFilterValues({ ...filterValues, [key]: [value] });
    } else {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((o) => o !== value)
        : [...selectedValues, value];
      setFilterValues({ ...filterValues, [key]: newValues });
    }
  };

  return (
    <div>
      {options.map((option, index) => {
        if (optionType === "radio") {
          return (
            <RadioOptionItem
              key={option.value + index}
              option={option}
              onClick={handleOptionClick}
              checked={selectedValues.includes(option.value)}
            />
          );
        } else {
          return (
            <CheckBoxOptionItem
              key={option.value + index}
              option={option}
              onClick={handleOptionClick}
              checked={selectedValues.includes(option.value)}
            />
          );
        }
      })}
    </div>
  );
};

export default DrawerContent;
