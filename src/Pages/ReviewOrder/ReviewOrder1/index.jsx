import React from "react";
import "./style.scss";
import logo from "../../../assets/svg/TopBar/Logo-Full.svg";
import Img1 from "../../../assets/svg/Progress1tick.svg";
import Img2 from "../../../assets/svg/Progress2col.svg";
import Img3 from "../../../assets/svg/Progress3.svg";
import line from "../../../assets/svg/Line 18.svg";
import DAFooter from "../../../components/Delivery Adress Footer";
import Seperator from "../../../assets/png/separator.png";
import separator from "../../../utils/numberWithCommas";
import Info from "../../../assets/svg/info.svg";
import ReviewAddressComponent from "../../../components/ReviewOrderAddress";
import ReviewOrderCard from "../ReviewOrderCard";
import ReviewOrderCardImage from "../../../assets/png/ReviewOrderCard.png";
import { useState } from "react";
import Vector from "../../../assets/svg/Vector.svg";

const ReviewOrder1 = () => {
  // Card Data
  let reviewOrderCardData = [
    {
      id: 0,
      icon: ReviewOrderCardImage,
      title: "MAX Stonewashed Slim Fit Denim Shirt",
      available: "In stock",
      colour: "Blue",
      size: "Large",
      Rstag: "₹ ",
      price: 1499.0,
    },
    {
      id: 1,
      icon: ReviewOrderCardImage,
      title: "MAX Stonewashed Slim Fit Denim Shirt",
      available: "In stock",
      colour: "Blue",
      size: "Large",
      Rstag: "₹ ",
      price: 1499.0,
    },
    {
      id: 2,
      icon: ReviewOrderCardImage,
      title: "MAX Stonewashed Slim Fit Denim Shirt",
      available: "In stock",
      colour: "Blue",
      size: "Large",
      Rstag: "₹ ",
      price: 1499.0,
    },
    {
      id: 3,
      icon: ReviewOrderCardImage,
      title: "MAX Stonewashed Slim Fit Denim Shirt",
      available: "In stock",
      colour: "Blue",
      size: "Large",
      Rstag: "₹ ",
      price: 1499.0,
    },
  ];

  // Card and quantity state
  const [quantity, setquantity] = useState({});
  const [list, setList] = React.useState(reviewOrderCardData);

  //Address Data
  const addressDetails = {
    name: "Anbarasan",
    line1: "10, Venkateshwara 1st Street, Ramapuram, Valasaravakkam",
    line2: "Chennai, Tamilnadu, 600 087",
    phoneNo: "1234567890",
    isInActive: false,
  };
  //Deleting  card
  const showOverlay = (ID) => {
    setList(list.filter((item) => item.id !== ID));
  };

  let amount = 0,
    count = 0,
    discount = 0,
    total = 0,
    delivery = 0;
  // changining amount and quantity for each increment and decrement
  list.forEach((item) => {
    amount += item.price * (quantity[item.id] || 1);
    count += quantity[item.id] || 1;
  });
  amount = amount.toFixed(2);
  const handleQuantity = (id, value) =>
    setquantity({ ...quantity, [id]: value });
  total = amount - discount + delivery;

  return (
    <div className="revieworder1">
      <div className="logo">
        <img src={logo} alt="Error" />
      </div>
      <img className="line" src={Seperator} />
      <text className="txt1">Review Your Order</text>
      {/* 1,2 and 3 order */}
      <div className="disp1">
        <img src={Img1} className="img1" />
        <img src={line} className="lin1" />
        <img src={Img2} className="img2" />
        <img src={line} className="lin2" />
        <img src={Img3} className="img3" />
      </div>
      <img className="line3" src={Seperator} />
      <div className="txt2">
        By placing your Order, you agree to Clock’s{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#666666;",
          }}
        >
          Privacy Policy
        </span>{" "}
        and
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#666666;",
          }}
        >
          {" "}
          Terms and Conditions
        </span>
      </div>
      <div className="firstcont">
        <div className="pinbox">
          {" "}
          <span className="txt3">Delivery Addresses</span>{" "}
          <img src={Info} className="qmark" /> <button>Change</button>
        </div>
        <div className="addressbox">
          <ReviewAddressComponent addressDetails={addressDetails} />
        </div>
      </div>
      <div className="Summary">
        <b className="b1">Summary</b>
        <div className="Headings">
          <li>Subtotal({count} items)</li>
          <li>Discount</li>
          <li> Delivery Charges</li>{" "}
        </div>
        <div className="values">
          <li>
            {" "}
            <b>₹{separator(amount)}</b>
          </li>
          <li>
            <b>-₹{separator(discount.toFixed(2))}</b>
          </li>
          <li>
            <b>
              {delivery === 0 ? (
                <div style={{ color: "green" }}>Free</div>
              ) : (
                <div>₹separator(delivery)</div>
              )}
            </b>
          </li>
        </div>

        <img className="linesum" src={Seperator} />
        {/* \\total calculation display */}
        <div className="totalamount">
          <text className="total">Total</text>{" "}
        </div>
        <div className="litotal">
          {" "}
          <li>
            <b>₹{total.toFixed(2)}</b>{" "}
          </li>{" "}
        </div>
      </div>
      <button className="butt1">Place Your Order</button>{" "}
      <div className="deliverytime">
        <img src={Vector} />
        <text> Delivery by 4 pm to 8 pm Today </text>
      </div>
      <div className="secondcont">
        <div className="pinbox">
          {" "}
          <span className="txt3">04 Items from Max Lifestyle,VR Mall</span>{" "}
          <img src={Info} className="qmark" /> <button>Change</button>
        </div>
        <div className="cards">
          {" "}
          {list.map((cardData, index) => (
            <ReviewOrderCard
              key={index}
              data={cardData}
              setQuantity={handleQuantity}
              triggerDelete={showOverlay}
            />
          ))}
        </div>
      </div>
      <img className="line2" src={Seperator} />
      <div className="foot">
        {" "}
        <DAFooter />
      </div>
    </div>
  );
};

export default ReviewOrder1;
