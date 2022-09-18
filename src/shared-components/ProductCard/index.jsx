import React from "react";
import styled, { useTheme } from "styled-components";
import { Card } from "antd";
const { Meta } = Card;

const StyledCard = styled(Card)`
  background-color: transparent;
  width: ${(props) => (props.variant === "small" ? "104px" : "164px")};
  height: auto;
  border: none;
  cursor: pointer;
  .ant-card-meta-detail > div:not(:last-child){
    margin-bottom: ${props => props.theme.space[1]} ;
  } 
  .ant-card-body {
    padding: 0px;
  }

  .ant-card-cover img {
    border-radius: ${(props) => props.theme.borderRadius[2]};
    width: ${(props) => (props.variant === "small" ? "104px" : "164px")};
    height: auto;
  }
`;

const ImageContainer = styled.img``;

const DescriptionCard = ({ title, price, variant }) => {
  const theme = useTheme();
  return (
    <>
      <p
        style={{
          color: theme.text.light,
          fontSize: theme.fontSizes[1],
          lineHeight: "16px",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontWeight: theme.fontWeights.bold,
          color: theme.text.black,
          fontSize:
            variant === "small" ? theme.fontSizes[2] : theme.fontSizes[3],
          marginTop: variant === "small" ? theme.space[1] : theme.space[2],
        }}
      >
        Rs.{price}
      </p>
      <p
        style={{
          color: "rgba(0, 182, 75, 1)",
          fontSize: theme.fontSizes[0],
          fontWeight: theme.fontWeights.semibold,
          backgroundColor: "rgba(229, 255, 240, 1)",
          borderRadius: theme.borderRadius[1],
          display: "inline-block",
          padding: theme.space[2] + " " + theme.space[3],
          margin: theme.space[1] + " 0px",
        }}
      >
        IN STOCK
      </p>
    </>
  );
};

const StyledMeta = styled(Meta)`
  margin: ${(props) => props.theme.space[3]} 0px;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: ${(props) =>
      props.variant === "small"
        ? props.theme.fontSizes[1]
        : props.theme.fontSizes[2]};
    line-height: ${(props) => (props.variant === "small" ? "16px" : "18px")};
  }
`;

const ImageCover = ({ imgUrl, variant }) => (
  <ImageContainer src={imgUrl} variant={variant} />
);

const ProductCard = ({
  thumbnail,
  name,
  brand,
  price_head = [],
  variant,
  price,
  onClick = () => {},
}) => {
  let finalPrice = 0;
  if (!price) {
    const { sale_price } = price_head[0] || {};
    finalPrice = sale_price;
  }

  const theme = useTheme();
  return (
    <StyledCard
      cover={<ImageCover imgUrl={thumbnail} variant={variant} />}
      variant={variant}
      onClick={onClick}
    >
      <StyledMeta
        title={
          <p
            style={{
              color: theme.text.dark,
              fontSize:
                variant === "small" ? theme.fontSizes[1] : theme.fontSizes[2],
              fontWeight: theme.fontWeights.bold,
              lineHeight: variant === "small" ? "14px" : "18px",
            }}
          >
            {brand.name}
          </p>
        }
        description={
          <DescriptionCard title={name} price={finalPrice} variant={variant} />
        }
        variant={variant}
      ></StyledMeta>
    </StyledCard>
  );
};

export default ProductCard;
