import React, { Component } from "react";
import "./style.scss";
import buttonImg from "../../assets/png/AddtoCartButton/shopping-cart.png";

class AddtoCartButton extends Component {
  render() {
    return (
      <div className="addtoCart">
        <div className="image">
          <img src={buttonImg} alt="Error" />
        </div>
        <div className="text">
          <text> Add to Cart</text>
        </div>
      </div>
    );
  }
}

export default AddtoCartButton;
