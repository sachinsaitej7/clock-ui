import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Skeleton } from "antd";

import {
  CollectionGrid,
  CollectionGrid3ColSkeleton,
} from "@buyer/styled-components";

import { useGetPaginatedProducts } from "../hooks";

const CollectionGrid3Col = styled(CollectionGrid)`
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 330px) {
    gap: ${(props) => props.theme.space[3]};
  }

  @media (min-width: 430px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductsImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius[1]}};
`;

const Collections = () => {
  const navigate = useNavigate();

  const {
    products,
    isLastPage,
    productsLoading,
    snapshot,
    lastSnapshot,
    setLastSnapshot,
  } = useGetPaginatedProducts();

  if (productsLoading && !lastSnapshot) return <CollectionGrid3ColSkeleton />;

  if (!products?.length)
    return <div className="text-center h-60 my-4">No products found</div>;

  return (
    <CollectionGrid3Col
      className="pb-4"
      dataLength={products.length}
      next={() => setLastSnapshot(snapshot)}
      hasMore={!isLastPage}
      loader={
        <>
          <Skeleton.Image active style={{ width: 110, height: 170 }} />
          <Skeleton.Image active style={{ width: 110, height: 172 }} />
          <Skeleton.Image active style={{ width: 110, height: 170 }} />
        </>
      }
    >
      {products.map((product) => {
        return (
          <ProductsImage
            src={product.thumbnail}
            alt={product.name}
            key={product.id}
            onClick={() =>
              navigate(`/product-page/${product.slug}?id=${product.id}`)
            }
          />
        );
      })}
    </CollectionGrid3Col>
  );
};

export default Collections;
