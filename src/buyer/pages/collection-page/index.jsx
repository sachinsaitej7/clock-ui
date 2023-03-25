import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ArrowLongLeftIcon } from "@assets/icons";
import { DEFAULT_VALUE } from "@buyer/constants";

import FiltersBar from "./components/FiltersBar";
import Collections from "./components/Collections";

import { useCollectionName, useGetPaginatedProducts } from "./hooks";

const CollectionPageContainer = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[5]};
`;

const Header = styled.div`
  p {
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 120%;
  }
`;

const CollectionPage = () => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);
  const { products } = useGetPaginatedProducts({
    filterValues,
  });
  const collectionName = useCollectionName(products);


  return (
    <CollectionPageContainer>
      <Header>
        <div className='flex items-center mb-4'>
          <ArrowLongLeftIcon
            width='24px'
            onClick={() => navigate(-1)}
            className='cursor-pointer'
          />
        </div>
        <p className='my-2'>
          {collectionName ? `${collectionName}’s Collection` : `All Products`}
        </p>
      </Header>
      <FiltersBar
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      <Collections filterValues={filterValues} />
    </CollectionPageContainer>
  );
};

export default CollectionPage;
