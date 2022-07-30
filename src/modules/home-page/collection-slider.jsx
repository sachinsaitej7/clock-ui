import React from "react";
import styled, { useTheme } from "styled-components";
import { Carousel, Button } from "antd";
import { useNavigate } from "react-router-dom";

// images
import LandingImage from "../../assets/home/wardrobe.jpg";
// import BakerImage from "../../assets/home/baker.jpg";
// import F1Image from "../../assets/home/f1.jpg";
import PrideImage from "../../assets/home/pride.jpg";
import SareeImage from "../../assets/home/saree-main.svg";

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
  > .slick-dots li button {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background: #d9d9d9;
  }
  > .slick-dots li.slick-active button {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background: ${(props) => props.theme.colors.primary};
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  padding: 0px;
  div {
    .button-container {
      position: absolute;
      top: 55%;
      left: 20%;
      @media (min-width: 426px) {
        top: 55%;
        left: 35%;
      }
    }
  }
`;

const SareeContainer = styled.div`
  padding: ${(props) => props.theme.space[5]};
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

const TextContainer = styled.div`
  background: linear-gradient(90.46deg, #eaeceb -2.84%, #e6e8e7 102.98%);
  padding: ${(props) => props.theme.space[5]};
  padding-top: ${(props) => props.theme.space[9]};
  text-align: center;
  p {
    font-size: ${(props) => props.theme.fontSizes[4]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 24px;
    color: ${(props) => props.theme.text.black};
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

const CollectionSlider = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <StyledCarousel autoPlay>
      <SareeContainer key={0}>
        <StyledImg
          src={SareeImage}
          style={{ width: "100%", height: "100%", maxHeight: "720px" }}
        ></StyledImg>
        <div>
          <h3
            style={{ marginTop: theme.space[4], marginBottom: theme.space[2] }}
          >
            Kanjeevaram Silk
          </h3>
          <p>premium saree collection</p>
          <StyledButton
            type="primary"
            onClick={() => navigate("/products?category=12")}
          >
            Shop Now
          </StyledButton>
        </div>
      </SareeContainer>
      <StyledImageContainer key={1}>
        <TextContainer style={{ paddingBottom: theme.space[8] }}>
          <p>Delivering Your Favourite Fashion Products From Store To Door!</p>
          <StyledButton type="primary" onClick={() => navigate("/products")}>
            See what’s New
          </StyledButton>
        </TextContainer>
        <div>
          <StyledImg
            src={LandingImage}
            style={{ height: "100%", maxHeight: "720px" }}
          ></StyledImg>
        </div>
      </StyledImageContainer>
      {/* <StyledImageContainer key={2}>
        <div style={{ position: "relative" }}>
          <StyledImg src={BakerImage} style={{ height: "500px" }}></StyledImg>
          <div style={{ position: "absolute", top: "60%", left: "35%" }}>
            <StyledButton
              type="primary"
              color="#75443B"
              onClick={() => navigate("/products")}
            >
              Explore
            </StyledButton>
          </div>
        </div>
      </StyledImageContainer> */}
      <StyledImageContainer key={3}>
        <div style={{ position: "relative" }}>
          <StyledImg
            src={PrideImage}
            style={{ height: "100%", maxHeight: "720px" }}
          ></StyledImg>
          <div className="button-container">
            <StyledButton
              type="primary"
              color="#EED135"
              onClick={() => navigate("/products?category=7&type=pride")}
              textColor={theme.text.dark}
            >
              Explore Products
            </StyledButton>
          </div>
        </div>
      </StyledImageContainer>
      {/* <StyledImageContainer key={4}>
        <div>
          <StyledImg src={F1Image} style={{ height: "500px" }}></StyledImg>
        </div>
      </StyledImageContainer> */}
    </StyledCarousel>
  );
};

export default CollectionSlider;
