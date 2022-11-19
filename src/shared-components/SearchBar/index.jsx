import React from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled, { useTheme } from "styled-components";

import { ReactComponent as TrendingIcon } from "../../assets/common/trending.svg";
import { ReactComponent as RightArrow } from "../../assets/common/chevron-right.svg";
import { ReactComponent as LeftArrow } from "../../assets/common/chevron-left.svg";

import Filters from "../Filters";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledSearch = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius[2]};
  line-height: 14px;
  font-size: ${(props) => props.theme.fontSizes[1]};
  padding: ${(props) => props.theme.space[5]}};
  cursor: pointer;

  box-shadow: 0px 4px 16px rgba(41, 41, 41, 0.05);
  border: 1px solid rgba(41, 41, 41, 0.12);
  margin-bottom: ${(props) => props.theme.space[5]};

  .ant-input-lg {
    line-height: 14px;
    font-size: ${(props) => props.theme.fontSizes[1]};
  }

  :focus,
  :active,
  &:hover{
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledButton = styled(Button)`
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 16px;
  background-color: ${(props) => props.theme.bg.yellow};
  color: ${(props) => props.theme.text.dark};
  padding: ${(props) => props.theme.space[3] + " " + props.theme.space[5]};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  margin-bottom: ${(props) => props.theme.space[5]};
  cursor: pointer;
  border: none;
  :focus,
  :active,
  :hover {
    background-color: ${(props) => props.theme.bg.yellow};
    outline: none;
  }
`;

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  text-align: left;
  flex-wrap: wrap;
  margin-bottom: ${(props) => props.theme.space[5]};
  margin-top: ${(props) => props.theme.space[8]};
`;

const StyledTag = styled.span`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizes[1]};
  line-height: 16px;
  font-weight: ${(props) => props.theme.fontWeights.normal};
  color: ${(props) => props.theme.text.dark};
  margin: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  padding: ${(props) => props.theme.space[3] + " " + props.theme.space[5]};
  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
`;

const SearchBar = ({
  placeholder = "Search for sarees, kurtis and more",
  trending = [],
  onChange,
  searchMode = false,
  onClick,
  onBack,
  notFound = false,
  searchQuery = "",
  filters,
  values,
  onApply,
}) => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledSearch
        placeholder={placeholder}
        allowClear
        size='large'
        suffix={searchMode ? null : <SearchOutlined />}
        onChange={onChange}
        onClick={searchMode ? undefined : onClick}
        value={searchQuery}
        prefix={searchMode ? <LeftArrow onClick={onBack} width='16px' /> : null}
      />
      {notFound && (
        <div
          style={{ padding: theme.space[6] }}
        >{`We couldn’t find any suggestions for “${searchQuery}”`}</div>
      )}
      {searchQuery.length > 1 && !notFound ? (
        <Filters filters={filters} values={values} onApply={onApply} />
      ) : (
        <TrendingContainer searchMode={searchMode}>
          <div style={{ marginBottom: theme.space[4] }}>
            <TrendingIcon width='20px' />
            <span
              style={{
                fontSize: theme.fontSizes[1],
                color: theme.text.light,
                fontWeight: theme.fontWeights.semibold,
                marginLeft: theme.space[3],
              }}
            >
              Trending in search
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flex: "1 1 0",
            }}
          >
            {trending.map((item, index) => {
              return (
                <StyledTag key={index} onClick={item.onClick}>
                  {item.label} <RightArrow width='12px' />
                </StyledTag>
              );
            })}
          </div>
        </TrendingContainer>
      )}
    </StyledContainer>
  );
};

export default SearchBar;
