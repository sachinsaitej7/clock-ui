import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import isEmpty from "lodash/isEmpty";
import styled, { useTheme } from "styled-components";

import { VariantTag } from "../../shared-components/atoms";
import { Button, Divider } from "antd";

import Store from "../../store";
import { fetchProduct } from "../../apis/product-page";
import { fetchProducts } from "../../apis/home-page";

import ProductCarousal from "../../shared-components/ProductCarousal";
import CollectionPreview from "../../shared-components/CollectionPreview";
import TrustTags from "../../shared-components/TrustTags";
import Spinner from "../../shared-components/Spinner";

import { generatePrice, checkItemInList } from "./utils";

const { CartContext } = Store;

const Container = styled.div`
  padding: ${(props) => props.theme.space[5]};
  .divider {
    margin: ${(props) => props.theme.space[5]} 0px;
    border-top: 1px solid #999999;
  }
  .product-details {
    h6 {
      font-size: ${(props) => props.theme.fontSizes[2]};
      font-weight: ${(props) => props.theme.fontWeights.semibold};
      padding: ${(props) => props.theme.space[2]} 0px;
    }
    &.product-details * {
      font-size: ${(props) => props.theme.fontSizes[1]};
      line-height: 18px;
      letter-spacing: 0.01612em;
      color: #333333;
    }
  }
`;

const VariantContainer = styled.div`
  p {
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 14px;
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }
`;

const Brand = styled.p`
  font-size: ${(props) => props.theme.fontSizes[2]};
  color: ${(props) => props.theme.text.light};
  line-height: 18px;
`;

const Variants = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${(props) => props.theme.space[4] + " 0px"};
  div {
    :not(:last-child) {
      margin-right: ${(props) => props.theme.space[4]};
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  width: 100%;
  height: 40px;
  span {
    color: ${(props) => props.theme.text.white};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 24px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { addItem, items } = useContext(CartContext);
  const navigate = useNavigate();
  const [color, setColor] = useState({});
  const [size, setSize] = useState({});
  const { isLoading, data: productData } = useQuery(["product", id], () =>
    fetchProduct(id)
  );
  const { data: products } = useQuery("products", fetchProducts);
  const product = useMemo(() => productData?.data.data[0], [productData]);
  const {
    brand = {},
    name = "",
    attribute_types,
    product_images,
  } = product || {};

  const colorVariants = useMemo(
    () =>
      attribute_types?.find(
        (variant) => variant.variant_type_name === "Colour"
      ) || {},
    [attribute_types]
  );
  const sizeVariants = useMemo(
    () =>
      attribute_types?.find((variant) =>
        variant.variant_type_name.includes("Size")
      ) || {},
    [attribute_types]
  );

  useEffect(() => {
    if (!isEmpty(product)) {
      setColor(
        isEmpty(colorVariants) ? colorVariants : colorVariants.variant[1]
      );
      setSize(isEmpty(sizeVariants) ? sizeVariants : sizeVariants.variant[1]);
    }
  }, [isLoading, product, setSize, setColor, sizeVariants, colorVariants]);

  const { price, discount, mrp } = generatePrice(
    color,
    size,
    product?.price_head
  );

  const addToCart = () => {
    !checkItemInList(items, { color, size, id }) ?
      addItem({
        ...product,
        price,
        selectedColorVariant: color,
        selectedSizeVariant: size,
        discount,
        quantity: 1,
        mrp,
      }): navigate("/cart");
  };

  if (isLoading) return <Spinner />;
  return (
    <Container>
      <ProductCarousal images={product_images} />
      <div>
        <div style={{ margin: theme.space[5] + " 0px " + theme.space[2] }}>
          <Brand>{brand.name}</Brand>
        </div>
        <div>
          <h6
            style={{
              fontWeight: theme.fontWeights.medium,
              fontSize: theme.fontSizes[4],
              lineHeight: "27px",
              letterSpacing: "0.01612em",
            }}
          >
            {name}
          </h6>
        </div>
        <div style={{ margin: `${theme.space[5]} 0px ` }}>
          <p style={{ fontSize: theme.fontSizes[3], lineHeight: "20px" }}>
            MRP:{" "}
            <span style={{ fontWeight: theme.fontWeights.bold }}>
              Rs. {price || "NA"}
            </span>
          </p>
          <p style={{ color: theme.text.light, fontSize: theme.fontSizes[1] }}>
            (inclusive of all taxes)
          </p>
        </div>
        {!isEmpty(color) && (
          <VariantContainer>
            <p>Available Colors</p>
            <Variants>
              {colorVariants.variant.map((variant) => (
                <VariantTag
                  key={variant.variant_name}
                  title={variant.variant_name}
                  active={color.variant_name === variant.variant_name}
                  onClick={() => setColor({ ...variant })}
                />
              ))}
            </Variants>
          </VariantContainer>
        )}
        {!isEmpty(size) && (
          <VariantContainer>
            <p>Available Sizes</p>
            <Variants>
              {sizeVariants.variant.map((variant) => (
                <VariantTag
                  key={variant.variant_name}
                  title={variant.variant_name}
                  active={size.variant_name === variant.variant_name}
                  onClick={() => setSize({ ...variant })}
                />
              ))}
            </Variants>
          </VariantContainer>
        )}
        <div style={{ display: "flex" }}>
          <StyledButton type="primary" disabled={!price} onClick={addToCart}>
            {" "}
            {checkItemInList(items, { color, size, id })
              ? "Go to Cart"
              : "Add to Cart"}{" "}
          </StyledButton>
        </div>
        <TrustTags />
        <Divider className="divider" />
        <div className="product-details">
          <h6>Product Details:</h6>
          <p
            dangerouslySetInnerHTML={{ __html: product.description || "NA" }}
          ></p>
        </div>

        {!isEmpty(products) && (
          <div style={{ marginTop: theme.space[7] }}>
            <CollectionPreview
              header={
                <h6 style={{ padding: theme.space[5] + " 0px" }}>
                  You May Also Like
                </h6>
              }
              products={products.data.data}
              onClick={() => navigate("/products")}
              itemClick={(productId) => () =>
                navigate(`/products/${productId}`)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductPage;
