import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  CollectionGrid3ColSkeleton,
} from "@buyer/styled-components";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { useGetPaginatedProducts } from "@buyer/pages/home-page/hooks";

const Collections = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${(props) => props.theme.space[3]};
  align-content: center;
  align-items: center;
  gap: ${(props) => props.theme.space[3]};
  overflow: auto;
  @media (min-width: 330px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${(props) => props.theme.space[3]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ProductsImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius[1]}};
`;

const AllPosts = () => {
  const navigate = useNavigate();
  const { query } = useSearchBox();
  const {
    products,
    isLastPage,
    isEmptyPage,
    productsLoading,
    snapshot,
    lastSnapshot,
    setLastSnapshot,
  } = useGetPaginatedProducts();

  if (query || isEmptyPage) return null;

  if (productsLoading && !lastSnapshot) return <CollectionGrid3ColSkeleton />;

  const handleClick = ({ slug, id }) => {
    navigate(`/product-page/${slug}?id=${id}`);
  };

  return (
    <div>
      <div className='m-2'>
        <h3 className='text-l font-semibold'>From our community</h3>
        <text className='text-sm text-gray-500'>Recent posts</text>
      </div>
      <Collections
        className='pb-4'
        dataLength={products.length}
        next={() => setLastSnapshot(snapshot)}
        hasMore={!isLastPage}
        loader={CollectionGrid3ColSkeleton}
      >
        {products.map((product, index) => {
          return (
            <ProductsImage
              src={product.thumbnail}
              alt={product.name || "product"}
              key={product.id}
              onClick={() => handleClick(product)}
            />
          );
        })}
      </Collections>
    </div>
  );
};

export default AllPosts;
