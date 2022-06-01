import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import ProductCard from "../ProductCard";

//images
import { ReactComponent as ArrowRight } from "../../assets/common/arrow-right.svg";

const ProductsContainer = styled.div`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.bg.default};
  margin: ${(props) => props.theme.space[0]};
  .products {
    display: flex;
    justify-content: space-around;
  }
`;

const Header = styled.h6`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[3]};
  text-align: center;
  padding: ${(props) => `${props.theme.space[5]} 0px`};
  margin: ${(props) => `${props.theme.space[0]}`};
`;

const CollectionPreview = ({
  products = [],
  header,
  backgroundColor,
  startIndex,
  endIndex,
  onClick = () => {},
  itemClick = () => {},
}) => {
  const theme = useTheme();
  const [start,] = useState(
    startIndex
      ? startIndex
      : Math.floor(Math.random() * (products.length - 3))
  );

  return (
    <ProductsContainer backgroundColor={backgroundColor}>
      {header ? header : <Header>Available Products</Header>}
      <div className="products">
        {products.slice(start, start+3).map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            variant="small"
            onClick={itemClick(product.id)}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.space[6] + " 0px",
        }}
      >
        <p
          style={{
            color: theme.text.primary,
            fontWeight: theme.fontWeights.semibold,
            marginRight: theme.space[2],
            fontSize: theme.fontSizes[3],
            cursor: "pointer",
          }}
          onClick={onClick}
        >
          View All{" "}
        </p>
        <ArrowRight width="24px" />
      </div>
    </ProductsContainer>
  );
};

export default CollectionPreview;
