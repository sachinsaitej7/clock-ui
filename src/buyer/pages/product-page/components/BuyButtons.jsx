import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { useCartContext } from "@buyer/store";
import { useProductContext } from "../store/ProductProvider";
import VisitButton from "./VisitButton";

const StyledButton = styled(Button)`
  box-shadow: none;
  border-radius: 8px;
  height: 42px;

  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[3]};
  line-height: 120%;
`;

const BuyButtons = ({ type }) => {
  const navigate = useNavigate();
  const { variant } = useProductContext();
  const { addItem, items } = useCartContext();

  const checkItem = items.findIndex((item) => item.id === variant?.id);

  const handleAddToCart = () => {
    if (checkItem === -1) addItem(variant);
    else navigate("/cart");
  };

  const handleBuyNow = () => {
    if (checkItem === -1) addItem(variant);
    navigate("/cart");
  };

  if (type === "place") return <VisitButton />;

  return (
    <div>
      <VisitButton />
      <StyledButton
        className='w-full my-2 text-primary border-primary'
        disabled={!variant}
        onClick={handleAddToCart}
      >
        {checkItem === -1 ? "Add to Cart" : "Go to Cart"}
      </StyledButton>
      <StyledButton
        type='primary'
        className='w-full bg-primary my-2'
        disabled={!variant}
        onClick={handleBuyNow}
      >
        Buy Now
      </StyledButton>
    </div>
  );
};

export default BuyButtons;
