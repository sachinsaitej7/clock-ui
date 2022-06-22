import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";

// images
import { ReactComponent as TruckIcon } from "../../assets/common/truck.svg";

import { fetchBrands, fetchProducts } from "../../apis/home-page";
import BrandCarousal from "../../shared-components/BrandCarousal";
import CollectionSlider from "./collection-slider";
import CollectionPreview from "../../shared-components/CollectionPreview";
import Spinner from "../../shared-components/Spinner";

const HomePageContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
`;

const StyledNotification = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.text.white};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  text-align: center;
  line-height: 16px;
`;

const StyledDeliveryLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => props.theme.space[4] + " " + props.theme.space[7]};
  min-height: 56px;
`;

const StyledTruckIcon = styled(TruckIcon)`
  transform: scale(1.2);
`;

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isLoading: brandsLoading, data: brandsData } = useQuery(
    "brands",
    fetchBrands
  );

  const { isLoading: productsLoading, data: productsData } = useQuery(
    "products",
    fetchProducts
  );

  if(brandsLoading || productsLoading) return <Spinner />;

  return (
    <HomePageContainer>
      <StyledNotification>
        <p>Delivery Within 24 Hours After Placing The Order</p>
      </StyledNotification>
      <CollectionSlider />
      <StyledDeliveryLocation
        backgroundColor={theme.bg.secondary}
        color={theme.text.dark}
      >
        <div width={"40px"} style={{ marginRight: theme.space[5] }}>
          <StyledTruckIcon />
        </div>
        <p style={{ lineHeight: "18px", fontSize: theme.fontSizes[2] }}>
          Currently delivering products to{" "}
          <span
            style={{
              color: theme.text.primary,
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            Ashok Nagar, KK Nagar & Ramapuram.
          </span>
        </p>
      </StyledDeliveryLocation>
      <div style={{ padding: "0px " + theme.space[2] }}>
        <BrandCarousal
          data={brandsData?.data.data}
          isLoading={brandsLoading}
          onClick={(brandId) => () => navigate(`/products?brand=${brandId}`)}
        />
      </div>
      <div style={{ marginTop: theme.space[7] }}>
        <CollectionPreview
          products={productsData?.data.data}
          itemClick={(productId) => () => navigate(`/products/${productId}`)}
          backgroundColor={theme.bg.secondary}
          isLoading={productsLoading}
          onClick={() => navigate("/products")}
        />
      </div>
    </HomePageContainer>
  );
};

export default HomePage;
