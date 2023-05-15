import React from "react";
import styled, { useTheme } from "styled-components";

import { Image96 } from "@buyer/assets/images/home-page";
import { useSearch } from "../store/SearchProvider";
import SearchBar from "./SearchBar";

const Header = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${Image96});

  width: 100vw;
  position: relative;
  left: calc(-50vw + 50%);
  min-height: 240px;

  padding: ${(props) => props.theme.space[5]};
  font-family: "Crimson Pro";
  color: ${(props) => props.theme.text.white};
  transition: all 0.3s ease-out;

  h2 {
    margin-top: ${(props) => props.theme.space[9]};
    font-size: ${(props) => props.theme.fontSizes[6]};
    line-height: 120%;
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }

  .subtitle {
    font-size: ${(props) => props.theme.fontSizes[2]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    margin-top: ${(props) => props.theme.space[5]};
  }
  &.invisible {
    opacity: 0;
    transition: all 0.3s ease-out;
  }
`;

const Search = () => {
  const theme = useTheme();
  const { searchMode } = useSearch();

  return (
    <div>
      <Header
        className={`flex flex-col justify-center items-start ${
          searchMode ? "invisible" : "visible"
        }`}
      >
        <h2>Find and share places you love</h2>
        {/* <p className="subtitle">Ready to buy? Just search!</p> */}
      </Header>
      <div
        style={{
          marginTop: `-${theme.space[7]}`,
        }}
        className="relative"
      >
        <SearchBar />
      </div>
    </div>
  );
};

export default Search;
