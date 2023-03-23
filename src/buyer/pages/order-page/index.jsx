import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Divider, Button } from "antd";

import { Spinner } from "@app/components";
import { ProductCardReview, SummaryCard, AddressCard } from "@buyer/components";
import { useGetOrderData, useGetOrderItems } from "./hooks";

const Container = styled.div`
  padding: ${(props) => `${props.theme.space[3]}  ${props.theme.space[5]}`};
  width: 100%;
  .divider {
    border-top: 1px solid rgba(41, 41, 41, 0.12);
    margin: ${(props) => props.theme.space[5]} 0px;
  }
  .address {
    font-size: ${(props) => props.theme.fontSizes[2]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 18px;
    letter-spacing: 0.01612em;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes[1]};
    margin-bottom: ${(props) => props.theme.space[3]};
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  margin-top: ${(props) => props.theme.space[5]};
  height: 40px;
  span {
    color: ${(props) =>
      props.theme.text[props.type === "primary" ? "white" : "primary"]};
    font-size: ${(props) => props.theme.fontSizes[4]};
    line-height: 20px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
  }
`;

const OrderPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderData, loading] = useGetOrderData(orderId);
  const [orderItems, itemsLoading] = useGetOrderItems(orderId);

  if (loading || itemsLoading) return <Spinner />;

  return (
    <Container>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h6
          style={{
            color: theme.text.primary,
            marginTop: theme.space[3],
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          Your Order is Confirmed!
        </h6>
        <p style={{ fontSize: theme.fontSizes[1] }}>
          Thanks for shopping with us! You will receive an order confirmation
          mail to your registered mail address.
        </p>
        <StyledButton type='primary' onClick={() => navigate("/")}>
          Continue Shopping
        </StyledButton>
      </div>
      <Divider className='divider' />
      <p>Order Number</p>
      <p style={{ color: theme.colors.primary }}>#100-64892631-7264528</p>
      <p style={{ marginTop: theme.space[5] }}>Delivery Date</p>
      <p
        style={{ marginBottom: theme.space[5], fontSize: theme.fontSizes[2] }}
        className='address'
      >
        {orderData?.address.deliveryDate +
          ", " +
          orderData?.address.deliveryTime || "Updating soon"}
      </p>
      <p style={{ marginBottom: theme.space[0] }}>
        Payment Type: {orderData.paymentType.toUpperCase()}
      </p>

      <p style={{ marginBottom: theme.space[0] }}>Shipping To</p>
      <AddressCard address={orderData.address} active />
      <SummaryCard items={orderItems} />
      {orderItems.map((item) => (
        <div key={item.id} style={{ margin: theme.space[5] + " 0px" }}>
          <ProductCardReview.NonEditable
            {...item}
            onClick={() => navigate(`/product-page/${item.slug}?id=${item.id}`)}
          />
        </div>
      ))}

      <StyledButton>View Orders</StyledButton>
      <Divider className='divider' />
      <div
        style={{
          textAlign: "center",
          padding: theme.space[3],
        }}
      >
        <h6>Contact Us?</h6>
        <p>
          Feel free to{" "}
          <span
            style={{
              color: theme.colors.primary,
              fontWeight: theme.fontWeights.medium,
              textDecoration: "underline",
            }}
            onClick={() => navigate("/tnc?tab=4")}
          >
            Contact us
          </span>{" "}
          with any questions regarding your purchase
        </p>
      </div>
    </Container>
  );
};

export default OrderPage;
