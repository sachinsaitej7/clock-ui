import React, { useEffect, useState, useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";

import { fetchProducts } from "../../apis/home-page";
import { processResults, createIndex, index } from "../../utils/searchService";

import { generateFilters, getParams } from "../../utils";

import ProductCard from "../../shared-components/ProductCard";
import SearchBar from "../../shared-components/SearchBar";
import Spinner from "../../shared-components/Spinner";
import { ReactComponent as LocationIcon } from "../../assets/common/location.svg";

// images

const HomePageContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
  background-color: ${(props) => props.theme.bg.white};
  padding: ${(props) => props.theme.space[5]};
  min-height: 60vh;
`;

const Header = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[5]};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  color: ${(props) => props.theme.text.dark};
  margin: ${(props) => props.theme.space[9]} 0px
    ${(props) => props.theme.space[6]};
  text-align: center;
  line-height: 140%;
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
  const params = getParams(searchParams);
  const searchValue = params["search"] || "";

  const results = useMemo(
    () => index.search(searchValue).flatMap((result) => result.result),
    [searchValue]
  );

  const [searchMode, setSearchMode] = useState(!!searchValue);
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);
  const [filterIds, setFilterIds] = useState(results || []);

  const { isLoading: productsLoading, data: productsData } = useQuery(
    "products",
    fetchProducts
  );

  const products = productsData?.data.data;

  useEffect(() => {
    if (products)
      createIndex(products).then(() => {
        const results = index.search(searchValue);
        setFilterIds(results.flatMap((result) => result.result));
      });
  }, [products]);

  useEffect(() => {
    setFilterIds(results);
  }, [results]);

  const onChange = (e) => {
    setSearchMode(true);
    setSearchParams({ search: e.target.value });
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

  if (productsLoading || isEmpty(index.register)) return <Spinner />;
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
    filterIds,
    filterValues
  );

  const filters =
    searchValue.length > 1 ? generateFilters(searchedResults) : [];

  return (
    <HomePageContainer>
      {!searchMode && <Header>Discover women’s fashion in Chennai</Header>}
      <SearchBar
        onChange={onChange}
        onBack={onBack}
        onClick={onClick}
        searchMode={searchMode}
        notFound={searchValue.length > 1 && sortedResults.length === 0}
        searchQuery={searchValue}
        trending={[
          {
            label: "Chanderi Cotton",
            onClick: () => navigate("/products?category=12"),
          },
          {
            label: "Kurtis",
            onClick: () => navigate("/products?category=14"),
          },
          {
            label: "T-Shirts",
            onClick: () => navigate("/products?category=16"),
          },
        ]}
        onApply={setFilterValues}
        values={filterValues}
        filters={filters}
      />
      {!searchMode && (
        <div
          style={{
            display: "flex",
            color: theme.colors.primary,
            fontWeight: theme.fontWeights.semibold,
            fontSize: theme.fontSizes[2],
            justifyContent: "center",
            marginTop: theme.space[9],
            marginBottom: theme.space[4],
            lineHeight: "140%",
          }}
        >
          <LocationIcon width='16px' />
          <p style={{ marginLeft: theme.space[2] }}>Chennai</p>
        </div>
      )}
      {searchMode && sortedResults.length > 0 && (
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
                  onClick={() => navigate(`/products/${product.id}`)}
                />
              );
            })}
          </Collections>
        </>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
