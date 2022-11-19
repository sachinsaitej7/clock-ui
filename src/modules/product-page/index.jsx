import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import styled, { useTheme } from "styled-components";

import { VariantTag } from "../../shared-components/atoms";
import { Button, Divider, Collapse } from "antd";

import Store from "../../store";

import NotificationAPI from "../../shared-components/NotificationAPI";
import ProductCarousal from "../../shared-components/ProductCarousal";
import CollectionPreview from "../../shared-components/CollectionPreview";
import TrustTags from "../../shared-components/TrustTags";
import Spinner from "../../shared-components/Spinner";
import PincodeChecker from "../../shared-components/PincodeChecker/index";

//images
import { ReactComponent as MouseSquare } from "../../assets/product/mouse-square.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/product/arrow-down.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/product/arrow-up.svg";
import { ReactComponent as ArrowLongLeft } from "../../assets/common/arrow-long-left.svg";
import { ReactComponent as ArrowLeftOnSquare } from "../../assets/common/arrow-up-on-square.svg";

import { getShareData, handleShare } from "./utils";
import { useProduct, useProductImages, useProductVariants } from "./hooks";

const { CartContext } = Store;
const { Panel } = Collapse;

const Container = styled.div`
  padding: ${(props) => props.theme.space[5]};

  .divider {
    margin: ${(props) => props.theme.space[7]} 0px;
    border-top: 1px solid #292929;
    opacity: 0.12;
  }

  .top-icon {
    cursor: pointer;
    width: 24px;
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
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [productData, productLoading, ...rest] = useProduct(id);
  const [productImages] = useProductImages(id);
  const [productVariants] = useProductVariants(id);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const { addItem, items } = useContext(CartContext);

  useEffect(() => {
    if (!productVariants) return;
    if (productVariants.length === 0) return setSelectedVariant(null);

    const defaultVariant = productVariants[0];
    setSelectedVariant(defaultVariant);
    setColor(defaultVariant.color?.name);
    setSize(defaultVariant.size?.values);
  }, [productVariants]);

  useEffect(() => {
    if (productVariants?.length > 0) {
      const variant = productVariants.find((variant) => {
        let found = true;
        if (color) found = found && variant.color?.name === color;
        if (size) found = found && variant.size?.values === size;
        return found;
      });
      setSelectedVariant(variant);
    }
  }, [color, size]);

  const colorVariant = productVariants?.reduce(
    (acc, variant) => {
      if (variant.color) acc["values"].add(variant.color.name);
      return acc;
    },
    { name: "Color", values: new Set() }
  );

  const sizeVariant = productVariants?.reduce(
    (acc, variant) => {
      acc["name"] = variant.size?.name;
      if (variant.size) acc["values"].add(variant.size.values);
      return acc;
    },
    { values: new Set() }
  );

  const { brand = {}, name = "", price } = selectedVariant || productData || {};
  const products = [];

  const addToCart = () => {
    if (!selectedVariant) return;
    !items.find((item) => item.id === selectedVariant.id)
      ? addItem({
          ...selectedVariant,
          quantity: 1,
        })
      : navigate("/cart");
  };

  if (productLoading) return <Spinner />;
  if (!productData)
    return (
      <div
        style={{
          padding: theme.space[5],
          display: "flex",
          justifyContent: "center",
        }}
      >
        Product not found
      </div>
    );
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 0px " + theme.space[4],
        }}
      >
        <ArrowLongLeft onClick={() => navigate(-1)} className="top-icon" />
        <ArrowLeftOnSquare
          className="top-icon"
          onClick={() =>
            handleShare(getShareData(name, productImages), (text) => {
              NotificationAPI({
                type: "success",
                message: text,
                title: "Share",
                placement: "top",
              });
            })
          }
        />
      </div>
      <ProductCarousal images={productImages} />
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
              Rs. {price.currentPrice || "NA"}
            </span>
          </p>
          <p style={{ color: theme.text.light, fontSize: theme.fontSizes[1] }}>
            (inclusive of all taxes)
          </p>
        </div>
        {!isEmpty(colorVariant?.values) && (
          <VariantContainer>
            <p>Available Colors</p>
            <Variants>
              {Array.from(colorVariant.values).map((variant) => (
                <VariantTag
                  key={variant}
                  title={variant}
                  active={selectedVariant?.color?.name === variant}
                  onClick={() => setColor(variant)}
                />
              ))}
            </Variants>
          </VariantContainer>
        )}
        {!isEmpty(sizeVariant?.values) && (
          <VariantContainer>
            <p>Available Sizes</p>
            <Variants>
              {Array.from(sizeVariant.values).map((variant) => (
                <VariantTag
                  key={variant}
                  title={variant}
                  active={selectedVariant?.size?.values === variant}
                  onClick={() => setSize(variant)}
                />
              ))}
            </Variants>
          </VariantContainer>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StyledButton disabled={!selectedVariant} onClick={addToCart}>
            {items.find((item) => item.id === selectedVariant?.id)
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
                  __html: productData.descriptionHtml || "NA",
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
                  navigate(`/product-page/${productId}`)}
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
