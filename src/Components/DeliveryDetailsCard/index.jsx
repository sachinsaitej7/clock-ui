import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Seperator from "../../assets/png/separator.png";
import separator from "../../utils/numberWithCommas";

export default class DeliveryCard extends Component {
  render() {
    const { deliveryDetails, orderData } = this.props;
    const {
      name,
      address,
      city,
      pincode,
      state,
    } = deliveryDetails;

    const { id, amount: subtotal, discount = 0, amount: total, items } = orderData;
    const count = items.length;
    const line1 = address + ", " + city + ", " + state + ", " + pincode;


    return (
      <div className="deliverycard">
        <text className="deliveryonlabel">Delivery in</text>
        <text className="deliveryon">24 hrs</text>
        <text className="ordernolabel">Order Number</text>
        <text className="orderno">{id}</text>
        <text className="shippdet">Shipping on</text>
        <text className="name">{name}</text>
        <text className="addr">{line1}</text>
        <div className="Headings">
          <li>Subtotal({count} items)</li>
          <li>Discount</li>
        </div>
        <div className="values">
          <li> ₹{separator((subtotal/100).toFixed(2))}</li>
          <li>-₹{separator((discount/100).toFixed(2))}</li>
        </div>

        <img className="linesum" src={Seperator} />
        {/* \\total calculation display */}

        <text className="total">Total</text>
        <div className="litotal">
          {" "}
          <li>
            <b>₹{(total/100).toFixed(2)}</b>{" "}
          </li>{" "}
        </div>
        <button className="viewmanage">View or MAnage Orders</button>
      </div>
    );
  }
}
DeliveryCard.propTypes = {
  deliveryDetails: PropTypes.object.isRequired,
  orderData: PropTypes.object.isRequired,
};
