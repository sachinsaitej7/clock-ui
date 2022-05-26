import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";

import { Button } from "antd";

// images
import LandingImage from "../../assets/home/wardrobe.jpg";
import { ReactComponent as TruckIcon } from "../../assets/common/truck.svg";

import { fetchBrands, fetchProducts } from "../../apis/home-page";
import BrandCarousal from "../../shared-components/BrandCarousal";
import CollectionPreview from "../../shared-components/CollectionPreview";
import Spinner from "../../shared-components/Spinner";

const HomePageContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
`;

const StyledImageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  padding: 0px;
`;

const TextContainer = styled.div`
  background: linear-gradient(90.46deg, #eaeceb -2.84%, #e6e8e7 102.98%);
  padding: ${(props) => props.theme.space[5]};
  padding-top: ${(props) => props.theme.space[9]};
  p {
    font-size: ${(props) => props.theme.fontSizes[4]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 24px;
    color: ${(props) => props.theme.text.black};
  }
`;

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[7]};
  color: ${(props) => props.theme.text.white};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius[1]};
  font-size: ${(props) => props.theme.fontSizes[3]};
  line-height: 24px;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[4]}`};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  span {
    color: ${(props) =>
      props.theme.text[props.type === "primary" ? "white" : "primary"]};
    font-size: ${(props) => props.theme.fontSizes[4]};
    line-height: 20px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
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
      <StyledImageContainer>
        <TextContainer>
          <p>Delivering Your Favourite Fashion Products From Store To Door!</p>
          <StyledButton type="primary" onClick={() => navigate("/products")}>Explore Products</StyledButton>
        </TextContainer>
        <div>
          <StyledImg src={LandingImage}></StyledImg>
        </div>
      </StyledImageContainer>
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
