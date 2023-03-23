import React from "react";
import { Divider } from "antd";

import { useCartContext } from "@buyer/store";
import { SummaryCard } from "@buyer/components";
import { StyledStickyContainer } from "@buyer/styled-components";
import { getSummaryData, formatCurrency } from "@buyer/utils";

import { useSummaryContext } from "../../store/SummaryProvider";
import { StyledButton } from "../../styled";
import CartItems from "./CartItems";

const OrderSummary = () => {
  const { items } = useCartContext();
  const { total } = getSummaryData(items);
  const { setActiveTab } = useSummaryContext();

  return (
    <div>
      <h1 className="font-semibold text-base">Order Summary</h1>
      <div className="text-s text-gray-500">{items.length} products</div>
      <CartItems />
      <Divider className="my-4" />
      <SummaryCard items={items} />
      <div className="h-20"></div>
      <StyledStickyContainer>
        <div className="flex justify-between items-center mb-2">
          <p className="text-base font-semibold">Final Price</p>
          <p className="text-base font-semibold">{formatCurrency(total)}</p>
        </div>
        <StyledButton
          type="primary"
          disabled={items.length === 0}
          onClick={() => setActiveTab("2")}
          className="bg-primary my-1 w-full"
        >
          Add address details
        </StyledButton>
      </StyledStickyContainer>
    </div>
  );
};

export default OrderSummary;
