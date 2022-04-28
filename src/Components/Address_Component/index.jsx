import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

import radioOn from "../../assets/png/AddressComponent/radio-button-on.png";
import radioOff from "../../assets/png/AddressComponent/radio-button-off.png";
export default class AddressComponent extends Component {
  constructor(props) {
    super(props);
    // isthisDeliveryAddressPage is the page in #3 in figma. If the variable state is true then only edit button is visible
    this.state = { checked: false, defaultAddress: false };
  }
  render() {
    const { addressDetails, whichPage } = this.props;
    const { name, line1, line2, phoneNo, isActive } = addressDetails;
    return (
      <div className="arrayCont">
        <div
          className="singleComp"
          onClick={() => this.props.triggerRadio(phoneNo)}
        >
          <div className="container">
            {whichPage !== "savedAddress" ? (
              <>
                {isActive ? (
                  <img src={radioOn} alt="error" className="radio" />
                ) : (
                  <img src={radioOff} alt="error" className="radio" />
                )}
              </>
            ) : null}
            <div className="addressText">
              <b>{name}</b>
              <br />
              {line1}
              <br />
              {line2}
              <br />
              {phoneNo}
              <br />
            </div>
            <div className="buttonSpan">
              {whichPage === "savedAddress" ? (
                <button className="edit">Edit</button>
              ) : null}
              {whichPage === "savedAddress" ? (
                <button className="defaultBtn">Set as default</button>
              ) : null}
              {whichPage === "savedAddress" ? (
                <button className="delete">Delete</button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddressComponent.propTypes = {
  addressDetails: PropTypes.object.isRequired,
  triggerRadio: PropTypes.func,
  whichPage: PropTypes.bool.isRequired,
};

// Array of Objects

// const addressDetails = [
//   {
//     name: "Anbarasan",
//     line1: "10, Venkateshwara 1st Street, Ramapuram, Valasaravakkam",
//     line2: "Chennai, Tamilnadu, 600 087",
//     phoneNo: "1234567890",
//     isActive : false,
//   },
//   {
//     name: "Anbarasan",
//     line1: "10, Venkateshwara 1st Street, Ramapuram, Valasaravakkam",
//     line2: "Chennai, Tamilnadu, 600 087",
//     phoneNo: "1236567890",
//     isActive : false,
//   },
// ];

// declare this state variable in the jsx file your are using it
// stateAddressDetails : addressDetails,

// {this.state.stateAddressDetails.map((addressDetails, index) => (
//   <AddressComponent
//     key={index}
//     addressDetails={addressDetails}
//     triggerRadio = {this.setdefAddress}
//     whichPage = "deliveryAddress"
//   />

// ))}

// ))}
