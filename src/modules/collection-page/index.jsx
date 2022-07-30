import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Button, Input } from "antd";
import lunr from "lunr";

//images
import { ReactComponent as SearchIcon } from "../../assets/collection-page/search-normal.svg";
import { ReactComponent as CCloseIcon } from "../../assets/common/close-circle.svg";

import { fetchProducts } from "../../apis/home-page";
import ProductCard from "../../shared-components/ProductCard";
import Spinner from "../../shared-components/Spinner";
import SpecialCollectionPage from "./special-collection-page";

import { getParams, getQueryString, getCollectionName } from "./utils";

const CollectionPageContainer = styled.div`
  width: 100%;
  padding-bottom: ${(props) => props.theme.space[5]};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[5]};
  p {
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 24px;
  }
  svg {
    cursor: pointer;
    :hover {
      transform: scale(1.2);
    }
  }
`;

const Collections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${(props) => props.theme.space[3]};
  align-content: center;
  gap: ${(props) => props.theme.space[3]};
  @media (min-width: 330px) {
    padding: ${(props) => props.theme.space[5]};
    gap: ${(props) => props.theme.space[5]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledInput = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius[1]};
  width: 90%;
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.secondary};
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.grey};
  }
`;

const StyledButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  span {
    color: ${(props) => props.theme.text.primary};
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 18px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
  }
`;

const STEP = 10;

function initializeSearch(products) {
  return lunr(function () {
    this.ref("id");
    this.field("name");
    this.field("description");
    this.field("brand");
    this.field("category");
    products.forEach((doc) => {
      this.add({...doc, brand: doc.brand?.name, category: doc.category?.name});
    });
  });
}

const CollectionPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchApi, setSearchApi] = useState(null);
  const [filterIds, setFilterIds] = useState([]);
  const [searching, setSearching] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { isLoading: productsLoading, data: productsData } = useQuery(
    ["products", getQueryString(params)],
    () => fetchProducts(params)
  );
  const products = productsData?.data.data;

  useEffect(() => {
    if (products) initializeSearch(products);
  }, []);

  useEffect(() => {
    if (products) setSearchApi(initializeSearch(products));
  }, [products]);

  useEffect(() => {
    if (searchApi && query.length > 2) {
      setSearching(true);
      const filterIds = searchApi.search(`${query}*`).map((result) => +result.ref);
      setFilterIds(filterIds);
      setSearching(false);
    }
  }, [query, searchApi]);


  if (productsLoading) return <Spinner />;
  if (params.type) return <SpecialCollectionPage />;
  if (!products)
    return (
      <div
        style={{ height: "60vh", textAlign: "center", padding: theme.space[5] }}
      >
        No products found
      </div>
    );

  const collectionName = getCollectionName(searchParams, products);
  const filteredProducts =
    query.length > 2
      ? products.filter((product) => filterIds.includes(product.id))
      : products;

  return (
    <CollectionPageContainer>
      <Header>
        {searchMode ? (
          <StyledInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder={
              collectionName
                ? `Search ${collectionName}’s Collection`
                : `Search All Products`
            }
          />
        ) : (
          <p>
            {collectionName ? `${collectionName}’s Collection` : `All Products`}
            <span
              style={{ fontSize: theme.fontSizes[2] }}
            >{`(${products.length})`}</span>
          </p>
        )}
        <div>
          {searchMode ? (
            <CCloseIcon
              onClick={() => {
                setSearchMode(false);
                setQuery("");
              }}
            />
          ) : (
            <SearchIcon onClick={() => setSearchMode(true)} />
          )}
        </div>
      </Header>
      {filteredProducts.length ? (
        <>
          <Collections>
            {filteredProducts.slice(0, STEP * page).map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  {...product}
                  variant="medium"
                  onClick={() => navigate(`/products/${product.id}`)}
                />
              );
            })}
          </Collections>
          {filteredProducts.length > STEP * page && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: `${theme.space[5]} auto`,
              }}
            >
              <StyledButton onClick={() => setPage(page + 1)}>
                Load More Products
              </StyledButton>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            height: "60vh",
            textAlign: "center",
            padding: theme.space[5],
          }}
        >
        {searching ? "Searching" : "No products found"}
        </div>
      )}
    </CollectionPageContainer>
  );
};

export default CollectionPage;
