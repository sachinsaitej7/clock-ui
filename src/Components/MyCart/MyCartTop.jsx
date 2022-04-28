import React, { Component } from "react";
import "./MyCartTop.scss";
import Close from "../../assets/png/close.png";

class MyCartTop extends Component {
  render() {
    return (
      <div className="mctop">
        <text>My Cart</text>
        <img src={Close} />
      </div>
    );
  }
}

export default MyCartTop;
