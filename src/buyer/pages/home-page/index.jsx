import React from "react";
import styled from "styled-components";

import {
  TrendingCategories,
  SellBanner,
  Search,
  Collections,
  DailySearchCount,
  FiltersBar,
} from "./components";

import { SearchProvider, useSearch } from "./store/SearchProvider";

const HomePageContainer = styled.div`
  padding: 0px ${(props) => props.theme.space[5]};
  transition: all 0.3s ease-out;
  &.slide-up {
    transform: translateY(-200px);
  }
`;

const Home = () => {
  const { searchMode } = useSearch();
  return (
    <HomePageContainer className={searchMode ? "slide-up" : ""}>
      <Search />
      <SellBanner />
      <TrendingCategories />
      <FiltersBar />
      <Collections />
      <DailySearchCount />
    </HomePageContainer>
  );
};

const HomePage = () => (
  <SearchProvider>
    <Home />
  </SearchProvider>
);

export default HomePage;
