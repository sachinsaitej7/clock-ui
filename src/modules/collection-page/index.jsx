import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Button } from "antd";

//images
import { ReactComponent as FilterIcon } from "../../assets/collection-page/filter.svg";

import { fetchProducts } from "../../apis/home-page";
import BrandCarousal from "../../shared-components/BrandCarousal";
import ProductCard from "../../shared-components/ProductCard";
import Spinner from "../../shared-components/Spinner";

import {
  getUniqueBrands,
  getParams,
  getQueryString,
  getCollectionName,
} from "./utils";

const CollectionPageContainer = styled.div`
  width: 100%;
  padding-bottom: ${(props) => props.theme.space[5]};
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
`;

const Collections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${(props) => props.theme.space[3]};
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

const CollectionPage = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { isLoading: productsLoading, data: productsData } = useQuery(
    ["products", getQueryString(params)],
    () => fetchProducts(params)
  );

  const collectionName = getCollectionName(
    searchParams,
    productsData?.data.data
  );

  const brands = getUniqueBrands(productsData?.data.data);
  if(productsLoading) return <Spinner />;
  return (
    <CollectionPageContainer>
      <Header>
        <p>
          {collectionName ? `${collectionName}’s Collection`: `All Products`}
          <span style={{ fontSize: theme.fontSizes[2] }}>{`(${
            productsData?.data.data?.length || 0
          })`}</span>
        </p>
        <div>
          <FilterIcon />
        </div>
      </Header>
      <div>
        <BrandCarousal noTitle variant="medium" data={brands} />
        <div
          style={{
            background:
              "linear-gradient(90.25deg, #015850 -4.74%, #076754 49.71%, #8EC2B4 102.73%)",
            height: "40px",
            marginTop: "-34px",
          }}
        ></div>
      </div>
      <Collections>
        {productsData?.data.data?.slice(0, STEP * page).map((product) => {
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
      {productsData?.data.data?.length > STEP * page && (
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
    </CollectionPageContainer>
  );
};

export default CollectionPage;
