import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import styled, { useTheme } from "styled-components";
import { Collapse, Card, Divider } from "antd";

import { useCartContext } from "@buyer/store";
import { AddressCard, SummaryCard } from "@buyer/components";
import { StyledStickyContainer } from "@buyer/styled-components";

import CartItems from "../OrderSummary/CartItems";
import PaymentCard from "./PaymentCard";
import { useSummaryContext } from "../../store/SummaryProvider";
import {
  usePincodeCheck,
  useRazorpay,
  useGetOrderData,
  usePaymentMethod,
} from "../../hooks";
import { StyledButton } from "../../styled";

const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const StyledPanel = styled(Panel)`
  .ant-collapse-header {
    padding: 0 !important;
  };
`;

const CollapseHeader = ({ items }) => (
  <div>
    <h2 className='text-base'>Order Summary</h2>
    <p className='my-1 text-gray-400'>{items.length} products</p>
  </div>
);

const Payment = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { items, removeAllItems } = useCartContext();
  const { address } = useSummaryContext();
  const [pincodeData, pincodeLoading] = usePincodeCheck(address?.pincode);
  const { createRazorpayOrder, loading, order } = useRazorpay();
  const [orderData, orderDataLoading] = useGetOrderData(order?.orderId);
  const [, updateLoading] = usePaymentMethod(order?.orderId);

  useEffect(() => {
    if (!orderData) return;
    if (["order_placed", "payment_received"].includes(orderData.status)) {
      navigate("/order/" + orderData.id);
      removeAllItems();
    }
  }, [orderData]);

  if (!address) return null;

  return (
    <div>
      <Card bodyStyle={{ padding: theme.space[5] }}>
        <StyledCollapse
          expandIconPosition='end'
          bordered={false}
          className='bg-white'
        >
          <StyledPanel
            header={<CollapseHeader items={items} />}
            key='1'
            style={{ padding: theme.space[0] }}
          >
            <CartItems />
          </StyledPanel>
        </StyledCollapse>
        <Divider className='my-2' />
        <AddressCard address={address} active />
        <Divider className='my-4' />
        <SummaryCard items={items} />
      </Card>
      <PaymentCard />
      <StyledStickyContainer>
        <StyledButton
          type='primary'
          disabled={!address || isEmpty(pincodeData)}
          onClick={() => createRazorpayOrder()}
          className='bg-primary my-1 w-full'
          loading={
            loading || pincodeLoading || orderDataLoading || updateLoading
          }
        >
          Place an order
        </StyledButton>
      </StyledStickyContainer>
    </div>
  );
};

export default Payment;
