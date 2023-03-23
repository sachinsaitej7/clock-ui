import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

import { useCartContext } from "@buyer/store";
import { ShoppingCartIcon } from "@buyer/assets/icons";
import { CircleTag } from "@buyer/components";

const CartComponent = () => {
  const theme = useTheme();
  const { items } = useCartContext();
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer absolute" onClick={() => navigate("/cart")}>
      <ShoppingCartIcon width="24" />
      {items.length > 0 && (
        <CircleTag
          active
          style={{
            position: "absolute",
            top: "-10px",
            right: "-5px",
            padding: theme.space[1],
            lineHeight: "12px",
            width: "18px",
            height: "18px",
          }}
          title={items.length}
        />
      )}
    </div>
  );
};

export default CartComponent;
