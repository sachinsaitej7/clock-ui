import React, { useMemo } from "react";
import { Input } from "antd";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { useSearchBox, useInstantSearch } from "react-instantsearch-hooks-web";

import { ChevronLeftIcon, MagnifyingGlassIcon } from "@assets/icons";
import { useSearch } from "../store/SearchProvider";

const StyledSearch = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius[2]};
  line-height: 120%;
  font-size: ${(props) => props.theme.fontSizes[2]};
  padding: ${(props) => props.theme.space[5]}};

  height: 48px;
  box-shadow: 0px 4px 16px rgba(41, 41, 41, 0.05);
  border: 1px solid rgba(41, 41, 41, 0.12);
  margin-bottom: ${(props) => props.theme.space[5]};
`;

const SuffixIcon = ({ query }) => {
  if (query) return null;
  return <MagnifyingGlassIcon width="16px" />;
};

const PrefixIcon = ({ searchMode, onClickLeftArrow }) => {
  if (!searchMode) return null;
  return <ChevronLeftIcon width="16px" onClick={onClickLeftArrow} />;
};

const SearchBar = () => {
  const { searchMode, setSearchMode } = useSearch();
  const { query, refine, clear } = useSearchBox();
  const { status } = useInstantSearch();

  const debouncedSetValue = useMemo(
    () =>
      debounce((nextValue) => {
        refine(nextValue);
      }, 300),
    []
  );

  const onClickLeftArrow = (e) => {
    e.stopPropagation();
    setSearchMode(false);
    clear();
  };

  return (
    <StyledSearch
      placeholder={"Search for sarees, kurtis and more...."}
      size="large"
      suffix={<SuffixIcon query={query} />}
      onChange={(e) => {
        debouncedSetValue(e.target.value);
        setSearchMode(true);
      }}
      onClick={() => setSearchMode(true)}
      prefix={
        <PrefixIcon
          searchMode={searchMode}
          onClickLeftArrow={onClickLeftArrow}
        />
      }
      status={status}
      allowClear
    />
  );
};

export default SearchBar;
