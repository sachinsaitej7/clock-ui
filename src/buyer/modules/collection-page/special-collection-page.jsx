import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Button, Divider } from "antd";

//images
import { ReactComponent as MuffinIcon } from "../../assets/collection-page/muffin.svg";
import { ReactComponent as F1Icon } from "../../assets/collection-page/f1.svg";
import { ReactComponent as PrideTextIcon } from "../../assets/collection-page/pride-text.svg";
// import BakerCollectionImg from "../../assets/collection-page/baker-collection.svg";
// import F1CollectionImg from "../../assets/collection-page/f1-collection.svg";
// import PrideCollectionImg from "../../assets/collection-page/pride-collection.svg";

import { fetchProducts } from "../../apis/home-page";
import ProductCard from "../../shared-components/ProductCard";
import Spinner from "../../shared-components/Spinner";

import { getParams, getQueryString } from "./utils";

const CollectionPageContainer = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[5]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[5] + " " + props.theme.space[0]};
  p {
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 24px;
  }
`;

const Collections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.space[3]};
  @media (min-width: 330px) {
    gap: ${(props) => props.theme.space[5]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

// const OtherCollections = styled.div`
//   margin-top: ${(props) => props.theme.space[5]};
//   p {
//     font-size: ${(props) => props.theme.fontSizes[2]};
//     font-weight: ${(props) => props.theme.fontWeights.medium};
//     color: ${(props) => props.theme.text.light};
//     margin-bottom: ${(props) => props.theme.space[5]};
//   }
//   img {
//     margin-bottom: ${(props) => props.theme.space[5]};
//     width: 100%;
//   }
// `;

const StyledButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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

const getHeader = (type) => {
  switch (type) {
    case "pride":
      return (
        <Header>
          <p>
            <PrideTextIcon />
          </p>
        </Header>
      );
    case "f1":
      return (
        <Header>
          <p>Formula 1 T-Shirts</p>
          <div>
            <F1Icon />
          </div>
        </Header>
      );
    case "baker":
      return (
        <Header>
          <p>For Home Bakers</p>
          <div>
            <MuffinIcon />
          </div>
        </Header>
      );
    default:
      return null;
  }
};

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

  if (productsLoading) return <Spinner />;
  return (
    <CollectionPageContainer>
      {getHeader(params.type)}
      <Collections>
        {productsData?.data.data?.slice(0, STEP * page).map((product) => {
          return (
            <ProductCard
              key={product.id}
              {...product}
              variant="medium"
              onClick={() =>
                navigate(`/product-page/${product.slug}?id=${product.id}`)
              }
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
      <Divider />
      {/* <OtherCollections>
        <p>Other special categories to choose from</p>
        {params.type !== "f1" && (
          <img src={F1CollectionImg} alt="f1-collection" />
        )}
        {params.type !== "baker" && (
          <img src={BakerCollectionImg} alt="baker-collection" />
        )}
        {params.type !== "pride" && (
          <img src={PrideCollectionImg} alt="pride-collection" />
        )}
      </OtherCollections> */}
    </CollectionPageContainer>
  );
};

export default CollectionPage;
