import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

import { formatCurrency } from "@buyer/utils";

const { Paragraph, Title } = Typography;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 163px;
  max-height: 308px;
  border-radius: ${(props) => props.theme.borderRadius[1]};

  img {
    width: 100%;
    height: 242px;
    object-fit: cover;
    border-radius: ${(props) => props.theme.borderRadius[1]};
  }
`;

const StyledDescription = styled.div`
  line-height: 120%;

  .brand,
  .price {
    font-size: ${(props) => props.theme.fontSizes[2]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    margin-bottom: ${(props) => props.theme.space[1]};
  }
  .product-name {
    font-size: ${(props) => props.theme.fontSizes[1]};
    color: ${(props) => props.theme.text.light};
    margin-bottom: ${(props) => props.theme.space[1]};
  }
  .price {
    font-size: ${(props) => props.theme.fontSizes[3]};
    margin-bottom: ${(props) => props.theme.space[1]};
  }
`;

const ProductCard = ({
  thumbnail,
  name = "",
  brand,
  price,
  onClick = () => {},
}) => {
  return (
    <StyledContainer onClick={onClick} className='cursor-pointer'>
      <img src={thumbnail} alt={name} />
      <StyledDescription className='my-1'>
        {brand && (
          <Title level={3} className='brand' ellipsis={{ tooltip: brand.name }}>
            {brand.name}
          </Title>
        )}
        <Paragraph className='product-name' ellipsis={{ tooltip: name }}>
          {name}
        </Paragraph>
        {price && (
          <Paragraph className='price'>
            {formatCurrency(price.currentPrice)}
          </Paragraph>
        )}
      </StyledDescription>
    </StyledContainer>
  );
};

export default ProductCard;
