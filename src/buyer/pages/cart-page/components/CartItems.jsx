import React, { useEffect } from "react";
import isEqual from "lodash/isEqual";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";

import { useCartContext } from "@buyer/store";
import { ProductCardReview } from "@buyer/components";

import { useProductVariant } from "../hooks";

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const { removeItem, changeQuantity, updateItem } = useCartContext();

  const [productVariant, loading] = useProductVariant(item.id, {
    initialValue: item,
  });

  useEffect(() => {
    if (loading) return;
    const newItem = { ...productVariant };
    if (item.quantity) newItem.quantity = item.quantity;
    if (!isEqual(item, newItem)) updateItem(newItem);
  }, [productVariant]);

  if (!productVariant) return null;

  return (
    <ProductCardReview
      {...productVariant}
      quantity={item.quantity}
      removeItem={removeItem}
      changeQuantity={changeQuantity}
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
          <div key={item.id}>
            <CartItem item={item} />
            <Divider className="my-4" />
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
