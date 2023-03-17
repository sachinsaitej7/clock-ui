import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import ProgressBar from "../../shared-components/ProgressBar";
import { Divider, Button } from "antd";

import Store from "../../store";

import TrustTags from "../../shared-components/TrustTags";
import AddressCard from "../../shared-components/AddressCard";
import ProductCardReview from "../../shared-components/ProductCardReview";
import SummaryCard from "../../shared-components/SummaryCard";

//images
import logo from "../../assets/common/logo-full.svg";

import { usePayload } from "./hooks";
import { fetchRazorpayOrder } from "../../apis/review-order";
import { useMutation } from "react-query";

const Container = styled.div`
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
`;

const StyledButton = styled(Button)`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  margin-bottom: ${(props) => props.theme.space[5]};
  margin-top: ${(props) => props.theme.space[5]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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

const ITEMS = [
  {
    title: "Select Delivery Address",
  },
  {
    title: "Review Order",
  },
  {
    title: "Success",
  },
];

const { AuthContext, CartContext } = Store;
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const ReviewPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [pincodeData, setPincodeData] = useState();
  const [cod, setCod] = useState(false);

  const { activeAddress, user, updateOrder, fetchPincodeData } =
    useContext(AuthContext);

  const { items, removeItem, removeAllItems, changeQuantity } =
    useContext(CartContext);

  const payload = usePayload(items, user, activeAddress);

  const mutation = useMutation((p) => fetchRazorpayOrder(p));

  const { data: razarpayData, isLoading } = mutation;
  const { order_id, razorpay_order } = razarpayData?.data.data || {};

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
    activeAddress &&
      fetchPincodeData(activeAddress.pincode).then((data) => {
        setPincodeData(data);
      });
  }, []);

  const handleCodOrder = useCallback(async () => {
    const razorpay_payment_id = "1";
    const razorpay_signature = "COD";
    const payload = {
      razorpay_payment_id,
      razorpay_signature,
      amount_paid: 0,
      status: "cod",
      amount_due: razorpay_order.amount,
    };
    try {
      await updateOrder(order_id, payload, items);
      navigate("/order/" + order_id);
      removeAllItems();
    } catch (error) {
      console.log(error);
    }
  }, [order_id, razorpay_order, navigate, removeAllItems, updateOrder]);

  const handleRazorpayResponse = useCallback(
    async (response) => {
      const razorpay_payment_id = response.razorpay_payment_id;
      const razorpay_signature = response.razorpay_signature;
      const payload = {
        razorpay_payment_id,
        razorpay_signature,
        amount_paid: razorpay_order.amount,
        status: "payment received",
        amount_due: 0,
      };
      try {
        await updateOrder(order_id, payload, items);
        navigate("/order/" + order_id);
        removeAllItems();
      } catch (error) {
        console.log(error);
      }
    },
    [order_id, razorpay_order, navigate, removeAllItems, updateOrder]
  );

  useEffect(() => {
    if (razorpay_order && order_id) {
      const options = {
        key: "rzp_live_wKoj3DjB4pqEY2",
        currency: razorpay_order.currency,
        amount: razorpay_order.amount,
        name: "AARAM NETWORKS PRIVATE LIMITED",
        description: "Order ID: " + order_id,
        image: logo,
        order_id: razorpay_order.id,
        handler: handleRazorpayResponse,
        prefill: {
          name: user.displayName,
          email: user.email,
          contact: user.phoneNumber,
        },
      };
      if (!cod) {
        if (window.Razorpay) {
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      } else {
        handleCodOrder();
      }
    }
  }, [razorpay_order, user, order_id, handleRazorpayResponse]);

  return (
    <Container>
      <div style={{ padding: theme.space[3] + " " + theme.space[5] }}>
        <ProgressBar items={ITEMS} currentStep={2} />
      </div>

      <div style={{ padding: theme.space[3] + " " + theme.space[5] }}>
        <Divider className="divider" />
        <p className="address">Delivery Address</p>
      </div>
      <AddressCard notClickable address={activeAddress} />
      <div style={{ padding: theme.space[5], paddingTop: theme.space[0] }}>
        <Divider className="divider" />
        <p style={{ paddingBottom: theme.space[5] }} className="address">
          Products - {items.length} item
        </p>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: theme.space[5] }}>
            <ProductCardReview
              {...item}
              removeItem={removeItem}
              changeQuantity={changeQuantity}
              onClick={() =>
                navigate(`/product-page/${item.slug}?id=${item.id}`)
              }
            />
          </div>
        ))}

        <SummaryCard items={items} />

        <StyledButton
          type="primary"
          loading={!cod && isLoading}
          disabled={items.length === 0}
          onClick={() => mutation.mutate(payload)}
        >
          Proceed To Payment
        </StyledButton>
        {pincodeData?.cod && (
          <StyledButton
            type="default"
            loading={isLoading}
            disabled={items.length === 0}
            onClick={() => {
              setCod(true);
              mutation.mutate(payload);
            }}
          >
            Cash on delivery
          </StyledButton>
        )}
        <TrustTags />
      </div>
    </Container>
  );
};

export default ReviewPage;
