import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

import radioOn from "../../assets/png/AddressComponent/radio-button-on.png";
import radioOff from "../../assets/png/AddressComponent/radio-button-off.png";

export default class DeliveryAddressComponent extends Component {
  constructor(props) {
    super(props);
    // isthisDeliveryAddressPage is the page in #3 in figma. If the variable state is true then only edit button is visible
    this.state = { checked: false, defaultAddress: false };
  }

  render() {
    //getting values from component
    const { addressDetails, isActive } = this.props;
    const { name, address, city, state, pincode, email, mobileNo, id } =
      addressDetails;
    const line2 = address + ", " + city + ", " + state + ", " + pincode;
    const line1 = email + ", " + mobileNo;

    return (
      <div className="arrayCont">
        {/* Changes color based on state clicked or not */}
        <div
          className={isActive ? "singleComp1" : "singleComp"}
          onClick={() => this.props.triggerRadio(id)}
        >
          <div className="container">
            {/* radio button on or off */}
            <>
              {isActive ? (
                <img src={radioOn} alt="error" className="radio" />
              ) : (
                <img src={radioOff} alt="error" className="radio" />
              )}
            </>

            <div className="addressText">
              <b>{name}</b>
              <br />
              {line1}
              <br />
              {line2}
              <br />
              {mobileNo}
              <br />
            </div>
            {/* Showing edit based on if it is clicked or not */}
            <div className="buttonSpan">
              {isActive ? <button className="edit">Edit</button> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DeliveryAddressComponent.propTypes = {
  addressDetails: PropTypes.object.isRequired,
  triggerRadio: PropTypes.func,
  isActive: PropTypes.bool,
};
