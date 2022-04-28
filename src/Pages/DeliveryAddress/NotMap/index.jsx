import React, { Component } from "react";
import { PropTypes } from "prop-types";
import NotificationBar from "../../../Components/NotificationBar";
import Logo from "../../../assets/png/Logo Full (WBG).png";
import "./style.scss";
import DeliveryAddress from "../Map";
class NotMap extends Component {
  render() {
    return (
      <div className="flexHorizontal1">
        <div className="notMap">
          <div className="logo">
            <img src={Logo} alt="" />
            <div className="sepLine"></div>
          </div>
          <div className="notLogin">
            <text className="bold">Please select your delivery Address</text>
            <text className="grey">
              To serve you better and on time, please choose your location or
              pin your location in map
            </text>
            <input
              className="inactive"
              placeholder="Enter your location here"
            ></input>
          </div>
          <div className="loginDiv">
            <div className="seppLine"></div>
            <div className="buttonLogin">LOGIN/SIGNUP</div>

            <text className="browse">
              or &nbsp;
              <text className="blue">browse Products</text>
            </text>
          </div>
        </div>
        <div className="flexVertical1">
          <div>
            <DeliveryAddress />
          </div>
          <NotificationBar notificationBarData="Get 6% Discount on all Products on in-store Purchase" />
        </div>
      </div>
    );
  }
}

NotMap.propTypes = {
  children: PropTypes.object.isRequired,
};
export default NotMap;
