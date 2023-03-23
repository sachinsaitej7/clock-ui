import React from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSearchBox, useInstantSearch } from "react-instantsearch-hooks-web";
import { Skeleton } from "antd";

import { ProductCard } from "@buyer/components";
import {
  CollectionGrid,
  CollectionGridSkeleton,
} from "@buyer/styled-components";

import { useHitsData } from "../store/SearchProvider";

const Collections = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { hits: products, isLastPage, showMore, results } = useHitsData();
  const { query } = useSearchBox();
  const { status } = useInstantSearch();
  const isLoading = status === "loading";
  const isStalled = status === "stalled";
  const isError = status === "error";

  if (!query) return null;

  if ((isLoading || isStalled) && results.nbHits === 0)
    return <CollectionGridSkeleton />;

  if (isError && !isStalled)
    return (
      <p className="text-light my-2 min-h-20 text-center">
        Something went wrong. Please try again.
      </p>
    );

  if (results.nbHits === 0 && !isStalled)
    return (
      <p className="text-light my-2 min-h-20 text-center">
        No products found with this{" "}
        <strong className="text-primary">{query}</strong>
      </p>
    );

  return (
    <div>
      <p
        style={{
          color: theme.text.light,
          fontSize: theme.fontSizes[1],
          margin: theme.space[3] + " 0px",
        }}
      >
        Showing {results.nbHits} products
      </p>
      <CollectionGrid
        dataLength={products.length}
        next={showMore}
        hasMore={!isLastPage}
        loader={
          <>
            <Skeleton.Image active style={{ width: 160, height: 232 }} />
            <Skeleton.Image active style={{ width: 160, height: 232 }} />
          </>
        }
      >
        {products.map((product, index) => {
          return (
            <ProductCard
              key={product.id + "-" + index}
              {...product}
              onClick={() =>
                navigate(`/product-page/${product.slug}?id=${product.id}`)
              }
            />
          );
        })}
      </CollectionGrid>
    </div>
  );
};

export default Collections;
