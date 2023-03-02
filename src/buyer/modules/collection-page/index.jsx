import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { processResults } from "../../utils/searchService";

import { generateFilters } from "../../utils";

import { useProductsByParams } from "./hooks";

import Filters from "../../shared-components/Filters";
import ProductCard from "../../shared-components/ProductCard";
import Spinner from "../../shared-components/Spinner";
import { ReactComponent as ArrowLongLeft } from "../../assets/common/arrow-long-left.svg";

import { getParams, getCollectionName } from "./utils";

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

const Collections = styled(InfiniteScroll)`
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

const DEFAULT_VALUE = { sort: ["relevance"] };

const CollectionPage = () => {
  const [lastSnapshot, setLastSnapshot] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const [products, setProducts] = useState([]);
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);
  const [productsData, productsLoading, , snapshot] = useProductsByParams(
    params,
    lastSnapshot
  );

  useEffect(() => {
    if (productsData) setProducts([...products, ...productsData]);
  }, [productsData]);

  if (productsLoading && !lastSnapshot) return <Spinner />;
  if (products.length === 0)
    return (
      <div
        style={{ height: "60vh", textAlign: "center", padding: theme.space[5] }}
      >
        No products found
      </div>
    );

  const collectionName = getCollectionName(searchParams, products);
  const { searchedResults, sortedResults } = processResults(
    products,
    undefined,
    filterValues
  );

  const filters = [] || generateFilters(searchedResults);

  return (
    <CollectionPageContainer>
      <Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 0px " + theme.space[4],
          }}
        >
          <ArrowLongLeft
            width="24px"
            onClick={() => navigate(-1)}
            className="top-icon"
          />
        </div>
        <p style={{ marginBottom: theme.space[0] }}>
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
          <Collections
            dataLength={products.length}
            next={() => setLastSnapshot(snapshot)}
            hasMore={
              !productsLoading &&
              productsData.length > 0 &&
              !products.length < 25
            }
            loader={<Spinner />}
          >
            {sortedResults.map((product, index) => {
              return (
                <ProductCard
                  key={product.id + "-" + index}
                  {...product}
                  variant={window.innerWidth < 330 ? "small" : "large"}
                  onClick={() =>
                    navigate(`/product-page/${product.slug}?id=${product.id}`)
                  }
                />
              );
            })}
          </Collections>
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
