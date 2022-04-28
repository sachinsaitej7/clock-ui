import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";
export default class ReviewAddressComponent extends Component {
  constructor(props) {
    super(props);
    // isthisDeliveryAddressPage is the page in #3 in figma. If the variable state is true then only edit button is visible
    this.state = { checked: false, defaultAddress: false };
  }
  render() {
    const { addressDetails, isInActive } = this.props;
    const { name, address, city, state, pincode, email, mobileNo } =
      addressDetails;
    const line2 = address + ", " + city + ", " + state + ", " + pincode;
    const line1 = email + ", " + mobileNo;

        return (
          <div className="arrayCont">
            {/* class Name based on delivery availabe or not  */}
            <div className={isInActive ? "singleComp" : "singleComp1"}>
              <div className="container">
                {isInActive ? (
                  <text className="redmess">
                    {
                      "Currently, we’re not delivering to this location, please change your delivery address or pay now and pick up from the Store "
                    }
                  </text>
                ) : null}
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
              </div>
            </div>
          </div>
        );
  }
}
ReviewAddressComponent.propTypes = {
  addressDetails: PropTypes.object.isRequired,
  triggerRadio: PropTypes.func,
  isInActive: PropTypes.bool.isRequired,
};
