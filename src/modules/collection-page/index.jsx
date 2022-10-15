import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Button } from "antd";

import { processResults } from "../../utils/searchService";

import { generateFilters } from "../../utils";

import { fetchProducts } from "../../apis/home-page";

import Filters from "../../shared-components/Filters";
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
const DEFAULT_VALUE = { sort: ["relevance"] };

const CollectionPage = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);
  const { isLoading: productsLoading, data: productsData } = useQuery(
    ["products", getQueryString(params)],
    () => fetchProducts(params)
  );
  const products = productsData?.data.data;

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
  const { searchedResults, sortedResults } = processResults(products, undefined, filterValues);

  const filters = generateFilters(searchedResults);

  return (
    <CollectionPageContainer>
      <Header>
        <p style={{ marginBottom: theme.space[3] }}>
          {collectionName ? `${collectionName}’s Collection` : `All Products`}
        </p>
        <Filters
          filters={filters}
          onApply={setFilterValues}
          values={filterValues}
        />
      </Header>
      {sortedResults.length > 0 ? (
        <>
          <p
            style={{
              color: theme.text.light,
              fontSize: theme.fontSizes[1],
              margin: "0px " + theme.space[5],
            }}
          >
            Showing {sortedResults.length} products
          </p>
          <Collections>
            {sortedResults.slice(0, STEP * page).map((product) => {
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
          {sortedResults.length > STEP * page && (
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
          {"No products found"}
        </div>
      )}
    </CollectionPageContainer>
  );
};

export default CollectionPage;
