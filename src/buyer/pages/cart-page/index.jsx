import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, App } from "antd";
import styled from "styled-components";

import { ArrowLongLeftIcon } from "@assets/icons";
import { useAuth } from "@app/store";
import { useCartContext, useLoginContext } from "@buyer/store";
import { StyledStickyContainer } from "@buyer/styled-components";

import CartItems from "./components/CartItems";

import { getSummaryData, formatCurrency } from "@buyer/utils";

const Container = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[5]}};
`;

const StyledButton = styled(Button)`
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 42px;

  span {
    font-size: ${(props) => props.theme.fontSizes[3]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const CartPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { items } = useCartContext();
  const { handleLoginModal } = useLoginContext();
  const [user] = useAuth();
  const { total } = getSummaryData(items);

  const onClick = () => {
    const outOfStock = items.find((item) => !item.status);
    if (outOfStock) {
      message.warning("Some items are out of stock");
      return;
    }
    if (!user) {
      handleLoginModal(() => navigate("/review-order"));
    } else navigate("/review-order");
  };

  return (
    <Container>
      <div className="flex items-center mb-2">
        <ArrowLongLeftIcon
          width="24px"
          onClick={() => navigate(-1)}
          className="cursor-pointer mr-2"
        />
        <p className="text-base font-semibold">Cart ({items.length})</p>
      </div>
      <CartItems />
      <div className="h-28"></div>
      <StyledStickyContainer>
        <div className="flex justify-between items-center mb-2">
          <p className="text-base font-semibold">Total Cart Value</p>
          <p className="text-base font-semibold">{formatCurrency(total)}</p>
        </div>
        <StyledButton
          type="primary"
          disabled={items.length === 0}
          onClick={onClick}
          className="bg-primary my-1 w-full"
        >
          Proceed to checkout
        </StyledButton>
        <Button
          type="text"
          onClick={() => navigate("/")}
          className="text-primary h-8 text-base font-semibold w-full"
        >
          Continue Shopping
        </Button>
      </StyledStickyContainer>
    </Container>
  );
};

export default CartPage;
