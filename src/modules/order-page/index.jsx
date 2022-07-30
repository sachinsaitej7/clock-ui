import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Divider, Button } from "antd";

import Store from "../../store";

import ProductCardReview from "../../shared-components/ProductCardReview";
import SummaryCard from "../../shared-components/SummaryCard";
import AddressCard from "../../shared-components/AddressCard";
import { getTodayDate } from "./utils";
import Spinner from "../../shared-components/Spinner";

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
const { AuthContext } = Store;

const OrderPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { fetchOrderData } = useContext(AuthContext);

  const [orderData, setOrderData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const { items = [] } = orderData || {};

  useEffect(() => {
    fetchOrderData(orderId)
      .then(({ deliveryAddress, orderData }) => {
        setOrderData(orderData);
        setDeliveryAddress(deliveryAddress);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [orderId, fetchOrderData]);

  if (loading) return <Spinner />;

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
        <StyledButton type="primary" onClick={() => navigate("/")}>
          Continue Shopping
        </StyledButton>
      </div>
      <Divider className="divider" />
      <p>Order Number</p>
      <p style={{ color: theme.colors.primary }}>#100-64892631-7264528</p>
      <p style={{ marginTop: theme.space[5] }}>Delivery Date</p>
      <p
        style={{ marginBottom: theme.space[5], fontSize: theme.fontSizes[2] }}
        className="address"
      >
        {getTodayDate()}
      </p>
      <p style={{ marginBottom: theme.space[0] }}>Shipping To</p>
      <AddressCard notClickable address={deliveryAddress} />
      <SummaryCard items={items} />
      {items.map((item) => (
        <div key={item.id} style={{ margin: theme.space[5] + " 0px" }}>
          <ProductCardReview
            {...item}
            nonEditable
            onClick={() => navigate(`/products/${item.id}`)}
          />
        </div>
      ))}

      <StyledButton>View Orders</StyledButton>
      <Divider className="divider" />
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
