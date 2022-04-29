import React, { Component } from "react";
import "./style.scss";
import Img1 from "../../../assets/svg/Progress1col.svg";
import Img2 from "../../../assets/svg/Progress2.svg";
import Img3 from "../../../assets/svg/Progress3.svg";
import line from "../../../assets/svg/Line 18.svg";
import PropTypes from "prop-types";
import Seperator from "../../../assets/png/separator.png";

import { CartContext } from "../../../CartContext";
import { Link } from "react-router-dom";
import DeliveryAddressComponent from "../../../Components/AddressComponentDelivery";
import withRouter from "../../../Hoc/WithRouter";
import { toast } from "react-toastify";

class EU extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setActiveAddress = (addressId) => {
    const { address } = this.props;
    const { setActiveAddress } = this.context;
    const activeAddress = address.find((item) => item.id === addressId);
    if (activeAddress) setActiveAddress(activeAddress);
  };

  handleClick = () => {
    const { navigate } = this.props;
    const { activeAddress } = this.context;
    if (!activeAddress) {
      toast.error("Please select an address");
      return;
    }
    navigate("/review-order");
  };

  render() {
    const { address } = this.props;
    const { activeAddress } = this.context;
    return (
      <div className="existing-user">
        <img className="line" src={Seperator} />
        <div className="disp1">
          <div style={{ width: "30%" }}>
            <text className="txt1">Select Delivery Address</text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={Img1} className="img1" />
            <img src={line} className="lin1" />
            <img src={Img2} className="img2" />
            <img src={line} className="lin2" />
            <img src={Img3} className="img3" />
          </div>
        </div>

        <img className="line3" src={Seperator} />
        <div className="txt2">
          As of now, we offer delivery within a five-kilometer (5km) radius of
          the Mall. If your location does not fall within the 5km radius, you
          can pick up the products from the stores nearby with 5% Off
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div className="container">
            {address.map((addressDetails) => (
              <DeliveryAddressComponent
                key={addressDetails.id}
                addressDetails={addressDetails}
                isActive={
                  activeAddress && activeAddress.id === addressDetails.id
                }
                triggerRadio={this.setActiveAddress}
              />
            ))}
          </div>

          <button onClick={this.handleClick} className="butt1">
            Continue
          </button>
        </div>

        <div style={{ marginTop: "1%" }}>
          <Link to="/add-new-address" style={{ textDecoration: "none" }}>
            <button className="butt2" style={{ border: "1px solid black" }}>
              Add New Address
            </button>
          </Link>
        </div>
        <img className="line2" src={Seperator} />
      </div>
    );
  }
}

EU.contextType = CartContext;
EU.propTypes = {
  address: PropTypes.arrayOf(PropTypes.object),
  navigate: PropTypes.func,
};

export default withRouter(EU);
