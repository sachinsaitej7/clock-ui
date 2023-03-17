import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Button } from "antd";
import styled, { useTheme } from "styled-components";

import Store from "../../store";
import ProductCardReview from "../../shared-components/ProductCardReview";
import SummaryCard from "../../shared-components/SummaryCard";
import TrustTags from "../../shared-components/TrustTags";

import { getSummaryData } from "../../utils";
import separator from "../../utils/numberWithCommas";

const Container = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[5]}};
  .header{
    h3{
        font-size: ${(props) => props.theme.fontSizes[4]};
        font-weight: ${(props) => props.theme.fontWeights.medium};
        line-height: 30px;
    }
    p{
        font-size: ${(props) => props.theme.fontSizes[1]};
        line-height: 16px ;
        span{
            font-weight: ${(props) => props.theme.fontWeights.bold};
            font-size: ${(props) => props.theme.fontSizes[4]};
        }
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 40px;
  &.ant-btn:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.bg.primary};
  }
  :hover {
    border-color: ${(props) => props.theme.colors.primary} !important;
    background: ${(props) => props.theme.bg.primary};
  }
  span {
    color: ${(props) => props.theme.text.white};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 24px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const { CartContext, AuthContext } = Store;

const CartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { items, removeItem, changeQuantity } = useContext(CartContext);
  const { user, handleLoginModal } = useContext(AuthContext);
  const { total } = getSummaryData(items);

  const onClick = () => {
    const callback = () => navigate("/address");
    if (!user) {
      handleLoginModal(callback);
    } else navigate("/address");
  };

  return (
    <Container>
      <div className="header">
        <h3>Shopping Cart</h3>
        <p style={{ marginBottom: theme.space[5] }}>
          Total: ({items.length} items): <span>Rs. {separator(total)}</span>
        </p>
        <p>
          Items in your cart are not reserved. Please checkout to confirm your
          purchase.
        </p>
      </div>
      <div style={{ margin: theme.space[5] + " auto " + theme.space[8] }}>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <ProductCardReview
                {...item}
                key={item.id}
                removeItem={removeItem}
                changeQuantity={changeQuantity}
                onClick={() =>
                  navigate(`/product-page/${item.slug}?id=${item.id}`)
                }
              />
              <Divider
                style={{
                  borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
                  margin: theme.space[5] + " 0px",
                }}
              />
            </div>
          );
        })}
      </div>

      <SummaryCard items={items} />
      <StyledButton disabled={items.length === 0} onClick={onClick}>
        Checkout
      </StyledButton>
      <div style={{ margin: theme.space[7] + " 0px" }}>
        <TrustTags />
      </div>
    </Container>
  );
};

export default CartPage;
