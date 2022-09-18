import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { fetchProducts } from "../../apis/home-page";
import { initializeSearch } from "./search-service";

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

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApi, setSearchApi] = useState(null);
  const [filterIds, setFilterIds] = useState([]);

  const { isLoading: productsLoading, data: productsData } = useQuery(
    "products",
    fetchProducts
  );
  const products = productsData?.data.data;

  useEffect(() => {
    if (products) setSearchApi(initializeSearch(products));
  }, [products]);

  useEffect(() => {
    if (!searchQuery) return null;
    const filterIds = searchApi
      .search(`${searchQuery}*`)
      .map((result) => +result.ref);
    setFilterIds(filterIds);
  }, [searchQuery, searchApi]);

  const onChange = (e) => {
    setSearchMode(true);
    setSearchQuery(e.target.value);
  };

  const onClick = () => {
    setSearchMode(true);
    setSearchQuery("");
  };

  const onBack = () => {
    setSearchMode(false);
    setSearchQuery("");
  };

  if (productsLoading) return <Spinner />;
  if (!products)
    return (
      <div
        style={{ height: "60vh", textAlign: "center", padding: theme.space[5] }}
      >
        No products found
      </div>
    );

  const filteredProducts =
    searchQuery.length > 1
      ? products.filter((product) => filterIds.includes(product.id))
      : [];

  return (
    <HomePageContainer>
      {!searchMode && <Header>Find unique fashion in your city!</Header>}
      <SearchBar
        onChange={onChange}
        onBack={onBack}
        onClick={onClick}
        searchMode={searchMode}
        notFound={searchQuery.length > 1 && filteredProducts.length === 0}
        searchQuery={searchQuery}
        trending={[
          {
            label: "Chanderi Cotton",
            onClick: () => navigate("/products?category=12"),
          },
          { label: "Kurtis", onClick: () => navigate("/products?category=14") },
          { label: "T-Shirts", onClick: () => navigate("/products?category=16") },
        ]}
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
      {searchMode && (
        <Collections>
          {filteredProducts.map((product) => {
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
      )}
    </HomePageContainer>
  );
};

export default HomePage;
