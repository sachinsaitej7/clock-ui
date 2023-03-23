import React from "react";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "@buyer/store";
import { ProductCardReview } from "@buyer/components";

const { NonEditable } = ProductCardReview;

const CartItem = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;
  return (
    <NonEditable
      {...item}
      onClick={() =>
        navigate(`/product-page/${item.slug}?id=${item.productId}`)
      }
    />
  );
};

const CartItems = () => {
  const { items } = useCartContext();

  return (
    <div className="my-4">
      {items.map((item) => {
        return (
          <div key={item.id} className="mb-4">
            <CartItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
