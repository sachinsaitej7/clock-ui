import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import minus from "../../assets/png/minus.png";
import plus from "../../assets/png/plus.png";
const SCProductCard = (props) => {
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }
  const { Data } = props;
  const { imageUrl: Image, title, available, description, price } = Data;

  return (
    <div className="scproduct-card">
      <div className="scimage">
        <Image />
      </div>

      <div className="scproductname">
        <text>{title}</text>
      </div>
      <div className="scinstock">
        <text>{available}</text>
      </div>
      <div className="properties">
        <text> {description} </text>
      </div>
      <div className="scpricing">
        <text>{price}</text>
      </div>

      <div className="scquantity">
        <img src={minus} className="item1" onClick={decrementCounter} />
        <div className="count">{counter}</div>
        <img src={plus} className="item2" onClick={incrementCounter} />
      </div>
    </div>
  );
};

SCProductCard.propTypes = {
  Data: PropTypes.object.isRequired,
};
export default SCProductCard;
