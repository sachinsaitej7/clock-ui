import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";

// images
import { ReactComponent as TruckIcon } from "../../assets/common/truck.svg";
import KurthiMain from "../../assets/home/kurthi-main-2.svg";
import { ReactComponent as MoneyTick } from "../../assets/home/money-tick.svg";
import { ReactComponent as Receipt } from "../../assets/home/receipt-2.svg";

import { fetchBrands, fetchProducts } from "../../apis/home-page";
import BrandCarousal from "../../shared-components/BrandCarousal";
import CollectionCarousal from "../../shared-components/CollectionCarousal";
import CollectionSlider from "./collection-slider";
import Spinner from "../../shared-components/Spinner";
import { SAREE_COLLECTION, KURTHI_COLLECTION } from "./constants";

import { Button, Divider } from "antd";
import CategoryCarousal from "../../shared-components/CategoryCarousal/index";

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
  justify-content: space-between;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => props.theme.space[5] + " " + props.theme.space[8]};
  min-height: 56px;
  .message-box {
    display: flex;
    align-items: center;
    justify-content: start;
    p {
      font-size: ${(props) => props.theme.fontSizes[1]};
      line-height: 16px;
    }
    svg {
      width: ${(props) => props.theme.space[8]};
    }
    p:first-child {
      color: ${(props) => props.theme.text.primary};
      font-weight: ${(props) => props.theme.fontWeights.bold};
    }
    p:last-child {
      color: ${(props) => props.theme.text.light};
    }
  }
`;

const StyledCollections = styled.div`
  background: linear-gradient(0deg, #fff5e7, #fff5e7), #ffffff;
  letter-spacing: 0.02em;
  padding: ${(props) => props.theme.space[7] + " " + props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[0]};
  h4 {
    font-size: ${(props) => props.theme.fontSizes[5]};
    color: #ff8845;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    line-height: 24px;
    margin: inherit;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes[2]};
    line-height: 20px;
    color: ${(props) => props.theme.text.dark};
    opacity: 0.5;
  }
`;

const StyledCategories = styled.div`
  padding: ${(props) => props.theme.space[7] + " " + props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[0]};

  p {
    font-size: ${(props) => props.theme.fontSizes[0]};
    line-height: 14px;
    color: ${(props) => props.theme.text.dark};
    letter-spacing: 0.02em;
    font-weight: ${(props) => props.theme.fontWeights.bold};
    opacity: 0.5;
  }
  h4 {
    margin-top: ${(props) => props.theme.space[7]};
    margin-bottom: 0px;
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const StyledBrands = styled.div`
  padding: ${(props) => props.theme.space[7] + " " + props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[0]};
`;

const SareeContainer = styled.div`
  padding: ${(props) => "0px " + props.theme.space[5]};
  letter-spacing: 0.02em;
  h3 {
    font-size: ${(props) => props.theme.fontSizes[6]};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 20px;
    color: ${(props) => props.theme.text.dark};
    opacity: 0.5;
  }
`;

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[8]};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius[1]};
  background-color: ${(props) =>
    props.color || props.theme.bg[props.type || "default"]};
  padding: ${(props) => props.theme.space[3] + " " + props.theme.space[8]};
  height: 34px;
  span {
    color: ${(props) =>
      props.textColor ||
      props.theme.text[props.type === "primary" ? "white" : "primary"]};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 20px;
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.color || props.theme.colors.primary};
    background-color: ${(props) =>
      props.color || props.theme.bg[props.type || "default"]};
  }
`;

const StyledImg = styled.img`
  width: 100%;
`;

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isLoading: brandsLoading, data: brandsData } = useQuery(
    "brands",
    fetchBrands
  );

  const { isLoading: productsLoading } = useQuery("products", fetchProducts);

  if (brandsLoading || productsLoading) return <Spinner />;

  return (
    <HomePageContainer>
      <StyledNotification>
        <p>Free & Fast Delivery in 60 minutes!</p>
      </StyledNotification>
      <CollectionSlider />
      <StyledDeliveryLocation
        backgroundColor={theme.bg.secondary}
        color={theme.text.dark}
      >
        <div style={{ marginRight: theme.space[5] }}>
          <TruckIcon />
        </div>
        <p
          style={{
            lineHeight: "16px",
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          Currently delivering products to{" "}
          <span
            style={{
              color: theme.text.primary,
            }}
          >
            Ashok Nagar, KK Nagar, Nesapakkam & Ramapuram.
          </span>
        </p>
      </StyledDeliveryLocation>
      <StyledDeliveryLocation
        backgroundColor={theme.bg.white}
        color={theme.text.dark}
      >
        <div className="message-box">
          <div style={{ marginRight: theme.space[1] }}>
            <MoneyTick />
          </div>
          <div>
            <p>Cash On Delivery</p>
            <p>Available</p>
          </div>
        </div>
        <div className="message-box">
          <div style={{ marginRight: theme.space[1] }}>
            <Receipt />
          </div>
          <div>
            <p>Easy Return </p>
            <p>Sameday</p>
          </div>
        </div>
      </StyledDeliveryLocation>
      <StyledCollections>
        <CollectionCarousal
          data={SAREE_COLLECTION}
          Header={
            <>
              <h4>Featured Collections</h4>
              <p>just for you</p>
            </>
          }
          onClick={(type) => navigate("/products?feature=" + type)}
        />
        <CollectionCarousal
          data={KURTHI_COLLECTION}
          Header={
            <>
              <h4>Ethnics For All Occasions</h4>
              <p>A Collection of Trending Ethnicwears</p>
            </>
          }
          onClick={(id) => navigate("/products?category=" + id)}
        />
      </StyledCollections>
      <div>
        <div style={{ padding: "0px " + theme.space[5] }}>
          <Divider
            style={{ borderTopColor: theme.colors.black }}
            orientation={"left"}
            orientationMargin={"0"}
          >
            <p
              style={{
                fontWeight: theme.fontWeights.bold,
                fontSize: theme.fontSizes[0],
                letterSpacing: "0.02em",
              }}
            >
              TRENDING NOW
            </p>
          </Divider>
        </div>
        <SareeContainer key={0}>
          <StyledImg
            src={KurthiMain}
            style={{ width: "100%", height: "100%", maxHeight: "720px" }}
          ></StyledImg>
          <div>
            <h3
              style={{
                marginTop: theme.space[4],
                marginBottom: theme.space[2],
              }}
            >
              Cotton Kurta Sets
            </h3>
            <p>All Day Workwear</p>
            <StyledButton
              type="primary"
              onClick={() => navigate("/products?category=14")}
            >
              Shop Now
            </StyledButton>
          </div>
        </SareeContainer>
      </div>
      {/* <StyledCategories>
        <p>MORE TO EXPLORE</p>
        <CategoryCarousal
          data={brandsData?.data.data}
          Header={<h4>For Women</h4>}
        />
        <CategoryCarousal
          data={brandsData?.data.data}
          Header={<h4>For Men</h4>}
        />
      </StyledCategories> */}
      <StyledBrands>
        <BrandCarousal
          data={brandsData?.data.data}
          isLoading={brandsLoading}
          onClick={(brandId) => () => navigate(`/products?brand=${brandId}`)}
        />
      </StyledBrands>
    </HomePageContainer>
  );
};

export default HomePage;
