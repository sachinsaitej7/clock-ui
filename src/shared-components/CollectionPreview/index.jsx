import React from "react";
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
  startIndex = 0,
  endIndex = 3,
  onClick = () => { },
  itemClick = () => { }
}) => {
  const theme = useTheme();
  return (
    <ProductsContainer backgroundColor={backgroundColor}>
      {header ? header : <Header>Available Products</Header>}
      <div className="products">
        {products.slice(startIndex, endIndex).map((product) => (
          <ProductCard key={product.id} {...product} variant="small" onClick={itemClick(product.id)} />
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
          }}
          onClick={onClick}
        >
          View All{" "}
        </p>
        <ArrowRight width="24px"/>
      </div>
    </ProductsContainer>
  );
};

export default CollectionPreview;
