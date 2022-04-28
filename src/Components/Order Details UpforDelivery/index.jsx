import React, { Component } from "react";
import "./style.scss";

import arrow from "../../assets/png/Your Orders/arrow-left.png";
import productImage from "../../assets/png/Your Orders/productImage.png";

const orderDetails = [
  {
    number: "#100-64892631-7264528",
    status : "Order Picked and in transit",
    date: "10th April, 2021",
    paymentMethod: "Debit Card",
    deliveryAddress: {
      Name: `Anbarasan`,
      numberandStreet: `10, Venkateshwara 1st Street`,
      area: `Ramapuram, Valasaravakkam`,
      cityandPincode: `Chennai - 600 087`,
    },
    subTotal : "6,499",
    discount : "400",
    total : "6,099",
    orderContent: [
      {
        productPic: productImage,
        productName: "MAX Stonewashed Slim Fit Denim Shirt",
        color: "Blue",
        size: "Small",
        storeName: "Max Lifestyle",
        price: "₹ 1,499.00",
      },
      {
        productPic: productImage,
        productName: "MAX Stonewashed Regular Fit Denim Shirt",
        color: "Blue",
        size: "Extra Large",
        storeName: "Max Lifestyle",
        price: "₹ 1,499.00",
      },
      {
        productPic: productImage,
        productName: "MAX Stonewashed Slim Fit Denim Shirt",
        color: "Blue",
        size: "Large",
        storeName: "Max Lifestyle",
        price: "₹ 1,499.00",
      },
      {
        productPic: productImage,
        productName: "MAX Stonewashed Slim Fit Denim Shirt",
        color: "Blue",
        size: "Large",
        storeName: "Max Lifestyle",
        price: "₹ 1,499.00",
      },
    ],
  },
];
class OrderDetails extends Component {
  render() {
    return (
      <div>
        <div className="goBack">
          <img src={arrow} alt="" />
          <text>go back</text>
        </div>
        {orderDetails.map((order, Index) => (
          <div  key={Index}>
            <div className="orderDetails">
              <div className="headingFlex">
                <div className="verticalFLexOrderNum">
                  <text className="title">Order Number</text>
                  <text className="value">{order.number}</text>
                </div>
                <div className="verticalFLexOrderNum">
                  <text className="title">Order Number</text>
                  <text className="greenText">{order.status}</text>
                </div>
                <div className="buttonInvoice">Download Invoice</div>
              </div>
              <div className="deliveryandPaymentDetails">
                <div className="deliveryDetails">
                  <div>
                    <text className="title">Delivery on</text>
                    <text className="greenText">{order.date}</text>
                  </div>
                  <div>
                    <text className="title">Payment Method</text>
                    <text className="value">{order.paymentMethod}</text>
                  </div>
                </div>
                <div className="deliveryAddress">
                  <text className="title">Delivered to</text>
                  <text className="value">
                    {order.deliveryAddress.Name},
                    <br /> {order.deliveryAddress.numberandStreet},
                    <br /> {order.deliveryAddress.area}, <br />
                    {order.deliveryAddress.cityandPincode}
                  </text>
                </div>
                <div className="paymentDetails">
                  <text className="greyText">
                    <text className="left"> Subtotal (4 items)</text>
                    <text className="right">&#x20B9; {order.subTotal}</text>
                  </text>

                  <text className="greyText">
                    <text className="left">Discount</text>
                    <text className="right">&#x20B9;{order.discount}</text>
                  </text>

                  <text className="boldText">
                    <text className="left">Total</text>
                    <text className="right">&#x20B9;{order.total}</text>
                  </text>
                </div>
              </div>
            </div>
            {order.orderContent.map((product, Index) => (
              <div className="produuctDetails" key={Index}>
                <div className="image">
                  <img src={product.productPic} alt="" />
                </div>
                <div className="notImage">
                  <div className="horizontalFlex">
                    <div className="productVerticalFlex">
                      <text className="productName">
                        {product.productName}
                        <br />
                      </text>
                      <text className="colorandSize">
                        <b>Colour: </b>
                        {product.color}
                        <br />
                      </text>
                      <text className="colorandSize">
                        <b>Size: </b>
                        {product.size}
                        <br />
                      </text>
                    </div>
                    <div className="buttonVerticalFlex">
                      <text>Buy Again</text>
                      <br />
                      <text>Return</text>
                      <br />
                      <text>Help?</text>
                      <br />
                    </div>
                  </div>
                  <div className="priceandStoreName">
                    <text className="price">{product.price}</text>
                    <text>
                      Bought from{" "}
                      <text className="storeName">{product.storeName}</text>
                    </text>
                  </div>
                </div>
              </div>
            ))}
         </div>
        ))}
      </div>
    );
  }
}

export default OrderDetails;
