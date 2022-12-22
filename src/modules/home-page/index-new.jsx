import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { logAnalyticsEvent } from "../../firebase/utils";
import {
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch-hooks-web";

import { processResults } from "../../utils/searchService";

import { generateFilters, getParams } from "../../utils";
import { useSubcategories } from "./hooks";

import ProductCard from "../../shared-components/ProductCard";
import SearchBar from "../../shared-components/SearchBar";
import Spinner from "../../shared-components/Spinner";

import { ReactComponent as SparkIcon } from "../../assets/home/spark.svg";
import BackgroundHome from "../../assets/home/background-home.jpg";

// images

const queryHook = debounce((query, search) => {
  if (query.length > 2) search(query);
}, 500);

const HomePageContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
  background-color: ${(props) => props.theme.bg.white};
  padding: ${(props) => props.theme.space[5]};
`;

const Header = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[5]};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  color: ${(props) => props.theme.text.white};
  margin: ${(props) => props.theme.space[0]} 0px
    ${(props) => props.theme.space[1]};
  line-height: 140%;
  letter-spacing: -0.02em;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${BackgroundHome});
  height: 300px;
  width: 100%;
  padding: 0px ${(props) => props.theme.space[5]};
  padding-top: 50%;
  text-align: left;
`;

const Collections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  gap: ${(props) => props.theme.space[3]};
  justify-items: center;
  @media (min-width: 330px) {
    gap: ${(props) => props.theme.space[5]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DEFAULT_VALUE = { sort: ["relevance"] };

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { status } = useInstantSearch();
  const { hits: products } = useHits();
  const [searchCount] = useState(100 + Math.floor(Math.random() * 2000));
  const params = getParams(searchParams);
  const searchValue = params["search"] || "";
  const { refine } = useSearchBox({
    queryHook,
  });

  const [searchMode, setSearchMode] = useState(!!searchValue);
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);

  const [subcategories, subcategoryLoading] = useSubcategories();

  const logEvent = debounce(
    (name, params) => logAnalyticsEvent(name, params),
    100
  );

  useEffect(() => {
    refine(searchValue);
  }, []);

  const onChange = (e) => {
    setSearchMode(true);
    refine(e.target.value);
    setSearchParams({ search: e.target.value });
    logEvent("search", { search_term: e.target.value });
    setFilterValues(DEFAULT_VALUE);
  };

  const onClick = () => {
    setSearchMode(true);
    setSearchParams({});
  };

  const onBack = () => {
    setSearchMode(false);
    setSearchParams({});
    setFilterIds([]);
  };

  if (status === "loading" || subcategoryLoading) return <Spinner />;
  if (!products)
    return (
      <div
        style={{ height: "60vh", textAlign: "center", padding: theme.space[5] }}
      >
        No products found
      </div>
    );

  const { sortedResults, searchedResults } = processResults(
    products,
    undefined,
    filterValues
  );

  const filters =
    searchValue.length > 1 ? generateFilters(searchedResults) : [];
  return (
    <>
      {!searchMode && (
        <div>
          <Header>
            Shop thousands of products from Chennai’s Favorite Boutiques
          </Header>
        </div>
      )}
      <HomePageContainer>
        <div style={{ marginTop: !searchMode ? "-40px" : "0px" }}>
          <SearchBar
            onChange={onChange}
            onBack={onBack}
            onClick={onClick}
            searchMode={searchMode}
            notFound={searchValue.length > 1 && searchedResults.length === 0}
            searchQuery={searchValue}
            trending={
              subcategories
                ? subcategories.map((item) => ({
                    label: item.name,
                    value: item.slug,
                    onClick: () =>
                      navigate(`/products/${item.slug}?subcategory=${item.id}`),
                  }))
                : []
            }
            onApply={setFilterValues}
            values={filterValues}
            filters={filters}
          />
        </div>
        {!searchMode && (
          <p
            style={{
              color: theme.text.light,
              fontSize: theme.fontSizes[1],
              lineHeight: theme.fontSizes[3],
            }}
          >
            <SparkIcon
              width='16px'
              color={theme.colors.primary}
              style={{ marginRight: theme.space[2] }}
            />
            <span
              style={{
                fontWeight: theme.fontWeights.bold,
                marginRight: theme.space[2],
              }}
            >
              {searchCount}
            </span>
            searches made today!
          </p>
        )}
        {searchMode && searchValue && (
          <>
            <p
              style={{
                color: theme.text.light,
                fontSize: theme.fontSizes[1],
                margin: theme.space[4] + " 0px",
              }}
            >
              Showing {sortedResults.length} products
            </p>
            <Collections>
              {sortedResults.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    {...product}
                    variant='medium'
                    onClick={() =>
                      navigate(
                        `/product-page/${product.slug}?id=${product.productId}`
                      )
                    }
                  />
                );
              })}
            </Collections>
          </>
        )}
      </HomePageContainer>
    </>
  );
};

export default HomePage;
