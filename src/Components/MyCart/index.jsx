import React from "react";
import { useContext } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import MCProductCard from "./MCProductCard";
// import MyCartTop from "./MyCartTop";
import ShopLocation from "./ShopLocation";
// import Line2 from "../../assets/png/Line 2.png";
import separator from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";
// import MCProductImage from "../../assets/png/your-orders/productImage.png";
import { CartContext } from "../../CartContext";
import { Divider } from "@mui/material";

const MyCart = () => {
  const { items, removeItem, changeQuantity } = useContext(CartContext);
  // const mcCardData = [
  //   {
  //     id: 0,
  //     icon: MCProductImage,
  //     title: "MAX Stonewashed Slim Fit Denim Shirt",
  //     available: "In stock",
  //     description: "Blue, L",
  //     price1: "₹ ",
  //     price: 1499.0,
  //   },
  //   {
  //     id: 1,
  //     icon: MCProductImage,
  //     title: "MAX Stonewashed Slim Fit Denim Shirt",
  //     available: "In stock",
  //     description: "Blue, L",
  //     price1: "₹ ",
  //     price: 1499.0,
  //   },
  //   {
  //     id: 2,
  //     icon: MCProductImage,
  //     title: "MAX Stonewashed Slim Fit Denim Shirt",
  //     available: "In stock",
  //     description: "Blue, L",
  //     price1: "₹ ",
  //     price: 1499.0,
  //   },
  //   {
  //     id: 3,
  //     icon: MCProductImage,
  //     title: "MAX Stonewashed Slim Fit Denim Shirt",
  //     available: "In stock",
  //     description: "Blue, L",
  //     price1: "₹ ",
  //     price: 1499.0,
  //   },
  // ];
  const UserData = {
    description: "Products from ",
    link: "Max Lifestyle, VR Mall",
  };
  let a = 0;
  items.forEach((item) => {
    if (item.price) {
      a += item.price * (item.quantity || 1);
    }
  });

  return (
    <div className="MyCartProperties">
      <div className="mclink">
        <ShopLocation inputs={UserData} />
      </div>
      <div className="mccards">
        {" "}
        {items.map((cardData, index) => (
          <MCProductCard
            key={cardData.id + index}
            data={cardData}
            setQuantity={changeQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>
      <div>
        <Divider />
      </div>
      <div className="bottom-bar">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="subtotal">Sub-Total</div>
          <div className="totalcost">
            <b>₹ {separator(a)}</b>
          </div>
        </div>

        <div className="buttons">
          <Link to={"/my-cart"}>
            <button
              className="buttonbox"
              style={{
                background: "#015850",
                color: "#ffffff",
              }}
            >
              CHECK OUT
            </button>
          </Link>
          {/* <Link to={"/my-cart"}> */}
            {/* <button
              className="buttonbox"
              style={{
                background: "#FFFFFF",
              }}
            >
              CHECK OUT
            </button> */}
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

ShopLocation.propTypes = {
  inputs: PropTypes.object.isRequired,
};

export default MyCart;
