import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import isEmpty from "lodash/isEmpty";
import styled, { useTheme } from "styled-components";

import { VariantTag } from "../../shared-components/atoms";
import { Button, Divider, Collapse } from "antd";

import Store from "../../store";
import { fetchProduct } from "../../apis/product-page";
import { fetchProducts } from "../../apis/home-page";

import ProductCarousal from "../../shared-components/ProductCarousal";
import CollectionPreview from "../../shared-components/CollectionPreview";
import TrustTags from "../../shared-components/TrustTags";
import Spinner from "../../shared-components/Spinner";
import PincodeChecker from "../../shared-components/PincodeChecker/index";

//images
import { ReactComponent as MouseSquare } from "../../assets/product/mouse-square.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/product/arrow-down.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/product/arrow-up.svg";

import { generatePrice, checkItemInList } from "./utils";

const { CartContext } = Store;
const { Panel } = Collapse;

const Container = styled.div`
  padding: ${(props) => props.theme.space[5]};
  .divider {
    margin: ${(props) => props.theme.space[7]} 0px;
    border-top: 1px solid #292929;
    opacity: 0.12;
  }
  .product-details {
    h6 {
      font-size: ${(props) => props.theme.fontSizes[3]};
      font-weight: ${(props) => props.theme.fontWeights.bold};
      line-height: 20px;
      padding: ${(props) => props.theme.space[2]} 0px;
      margin: ${(props) => props.theme.space[0]};
      color: ${(props) => props.theme.text.primary};
    }
    .ant-collapse-header {
      padding: ${(props) => props.theme.space[0]};
    }
    .ant-collapse-content-box {
      padding: ${(props) => props.theme.space[5]} 0px;
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
  font-size: ${(props) => props.theme.fontSizes[3]};
  color: ${(props) => props.theme.text.dark};
  line-height: 20px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
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

const StoreContainer = styled.div`
  h5 {
    color: ${(props) => props.theme.colors.primary};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 20px;
    margin: ${(props) => props.theme.space[0]};
  }
  p {
    color: ${(props) => props.theme.text.light};
    font-size: ${(props) => props.theme.fontSizes[1]};
    margin-top: ${(props) => props.theme.space[3]};
  }
  svg {
    margin-right: ${(props) => props.theme.space[4]};
    width: ${(props) => props.theme.space[6]};
  }
`;

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[4]}`};
  width: 49%;
  height: 34px;
  vertical-align: middle;
  span {
    color: ${(props) =>
      props.theme.text[props.type === "primary" ? "white" : "primary"]};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 20px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
  }
  &.ant-btn[disabled] {
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
    border-color: ${(props) => props.theme.colors.primary};
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
    price_head,
  } = product || {};

  const checkVariant = (variant_id) => {
    return price_head.find((price) => {
      return price.price_line.find(
        (product) => variant_id === product.variant_id
      );
    });
  };

  const colorVariants = useMemo(
    () => {
      const colorVariant = attribute_types?.find(
        (variantType) => variantType.variant_type_name === "Colour"
      );
      if (!colorVariant) return {};
      colorVariant.variant = colorVariant.variant.filter((item) =>
        checkVariant(item.variant_id)
      );
      return colorVariant;
    },
    [attribute_types, price_head]
  );


  const sizeVariants = useMemo(() => {
    const sizeVariant = attribute_types?.find((variantType) =>
      variantType.variant_type_name.includes("Size")
    );
    if (!sizeVariant) return {};
    sizeVariant.variant = sizeVariant.variant.filter((item) =>
      checkVariant(item.variant_id)
    );
    return sizeVariant;
  }, [attribute_types, price_head]);

  useEffect(() => {
    if (!isEmpty(product)) {
      setColor(
        isEmpty(colorVariants) ? colorVariants : colorVariants.variant[0] || {}
      );
      setSize(isEmpty(sizeVariants) ? sizeVariants : sizeVariants.variant[0] || {});
    }
  }, [isLoading, product, setSize, setColor, sizeVariants, colorVariants]);

  const { price, discount, mrp } = generatePrice(
    color,
    size,
    product?.price_head
  );

  const addToCart = () => {
    !checkItemInList(items, { color, size, id })
      ? addItem({
          ...product,
          price,
          selectedColorVariant: color,
          selectedSizeVariant: size,
          discount,
          quantity: 1,
          mrp,
        })
      : navigate("/cart");
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
              fontWeight: theme.fontWeights.normal,
              fontSize: theme.fontSizes[3],
              lineHeight: "20px",
              letterSpacing: "0.01612em",
              color: theme.text.light,
              marginBottom: theme.space[1],
            }}
          >
            {name}
          </h6>
        </div>
        <div style={{ margin: `${theme.space[5]} 0px ` }}>
          <p style={{ fontSize: theme.fontSizes[3], lineHeight: "20px" }}>
            <span style={{ fontSize: theme.fontSizes[2], lineHeight: "18px" }}>
              MRP:{" "}
            </span>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StyledButton
            disabled={!price}
            onClick={addToCart}
          >
            {checkItemInList(items, { color, size, id })
              ? "Go to Cart"
              : "Add to Cart"}
          </StyledButton>
          <StyledButton
            type="primary"
            disabled={!price}
            onClick={() => {
              addToCart();
              navigate("/cart");
            }}
          >
            Buy Now
          </StyledButton>
        </div>
        <Divider className="divider" />
        <PincodeChecker />
        <Divider className="divider" />
        <StoreContainer>
          <h5>
            <MouseSquare />
            Store Details
          </h5>
          <p>Max store, Forum Vijaya Mall, Vadapalani, Chennai, TN</p>
        </StoreContainer>
        <Divider className="divider" />
        <div className="product-details">
          <Collapse
            expandIconPosition="end"
            ghost
            bordered={false}
            expandIcon={({ isActive }) => {
              if (isActive) return <ArrowUpIcon />;
              return <ArrowDownIcon />;
            }}
          >
            <Panel header={<h6>Product Details:</h6>} key="1">
              <p
                dangerouslySetInnerHTML={{
                  __html: product.description || "NA",
                }}
              ></p>
            </Panel>
          </Collapse>
        </div>
        <Divider className="divider" />
        {!isEmpty(products) && (
          <>
            <div style={{ marginTop: theme.space[7] }}>
              <CollectionPreview
                header={
                  <h6
                    style={{
                      padding: theme.space[5] + " 0px",
                      fontWeight: theme.fontWeights.bold,
                    }}
                  >
                    You May Also Like
                  </h6>
                }
                products={products.data.data}
                onClick={() => navigate("/products")}
                itemClick={(productId) => () =>
                  navigate(`/products/${productId}`)}
              />
            </div>
            <Divider className="divider" />
          </>
        )}

        <TrustTags />
      </div>
    </Container>
  );
};

export default ProductPage;
