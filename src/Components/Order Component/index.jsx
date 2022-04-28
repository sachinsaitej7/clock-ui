import React, { Component } from "react";
import "./style.scss";

import downArrow from "../../assets/png/Your Orders/arrow-left.png";
const deliveredOrderDetails = [
  {
    dateandTime: "12 June 2021 at 06:46 PM",
    number: "#100-64892631-7264528",
    totalPrice: "₹ 4,499.00",
    noOfProducts: "4",
    buttonClicked: false,
  },
  {
    dateandTime: "12 June 2021 at 06:46 PM",
    number: "#100-64893631-7264528",
    totalPrice: "₹ 4,499.00",
    noOfProducts: "4",
    buttonClicked: false,
  },
];
class OrderComponent extends Component {
  render() {
    return (
      <div className="">
        {deliveredOrderDetails.map((orders, Index) => (
          <div className="orderComponent" key={Index}>
            <div className="orderDetails">
              <table>
                <td>
                  <th>Order Date</th>
                  <tr className="dateandTime">{orders.dateandTime}</tr>
                </td>
                <td>
                  <th>Order Number</th>
                  <tr className="orderNo">{orders.number}</tr>
                </td>
                <td>
                  <th>No. of products</th>
                  <tr className="noofProducts">{orders.noOfProducts}</tr>
                </td>
                <td>
                  <th>Total</th>
                  <tr className="totalPrice">{orders.totalPrice}</tr>
                </td>
              </table>
            </div>
            <div
              className="orderDetailsButton"
              
            >
              <button>Show Order Details</button>
              <br />
              <div className="downArrow">
                <img src={downArrow} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default OrderComponent;
