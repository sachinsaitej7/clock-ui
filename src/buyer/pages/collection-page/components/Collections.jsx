import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Skeleton } from "antd";

import {
  CollectionGrid,
  CollectionGridSkeleton,
} from "@buyer/styled-components";

import { ProductCard } from "@buyer/components";

import { useGetPaginatedProducts } from "../hooks";

const Collections = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    products,
    isLastPage,
    productsLoading,
    snapshot,
    lastSnapshot,
    setLastSnapshot,
  } = useGetPaginatedProducts();

  if (productsLoading && !lastSnapshot) return <CollectionGridSkeleton />;

  if (!products?.length)
    return <div className="text-center h-60 my-4">No products found</div>;

  return (
    <>
      <p
        style={{
          color: theme.text.light,
          fontSize: theme.fontSizes[1],
        }}
        className="my-2"
      >
        Showing {products.length} products
      </p>
      <CollectionGrid
        className="pb-4"
        dataLength={products.length}
        next={() => setLastSnapshot(snapshot)}
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
    </>
  );
};

export default Collections;
