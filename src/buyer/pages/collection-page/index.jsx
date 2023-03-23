import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ArrowLongLeftIcon } from "@assets/icons";

import FiltersBar from "./components/FiltersBar";
import Collections from "./components/Collections";

import { useCollectionName } from "./hooks";

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
  const collectionName = useCollectionName();

  return (
    <CollectionPageContainer>
      <Header>
        <div className="flex items-center mb-4">
          <ArrowLongLeftIcon
            width="24px"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        </div>
        <p className="my-2">
          {collectionName ? `${collectionName}’s Collection` : `All Products`}
        </p>
      </Header>
      <FiltersBar />
      <Collections />
    </CollectionPageContainer>
  );
};

export default CollectionPage;
