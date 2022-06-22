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

const DescriptionCard = ({ title, price }) => {
  const theme = useTheme();
  return (
    <>
      <p style={{ color: theme.text.dark }}>{title}</p>
      <p
        style={{ fontWeight: theme.fontWeights.bold, color: theme.text.black }}
      >
        Rs.{price}
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
    line-height: ${(props) => (props.variant === "small" ? "18px" : "21px")};
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
              color: theme.text.light,
              fontSize:
                variant === "small" ? theme.fontSizes[0] : theme.fontSizes[1],
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
