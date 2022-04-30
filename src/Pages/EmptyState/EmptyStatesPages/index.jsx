import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import qmark from "../../../assets/png/question-mark-circle.png";
import EmptyWishlistImage from "../../../assets/png/EmptyStates/Wishlist.png";
import EmptyOrderImage from "../../../assets/png/EmptyStates/Order.png";
import EmptyAddressImage from "../../../assets/png/EmptyStates/Address.png";
import AddressComponent from "../../../Components/Address_Component";

import upArrow from "../../../assets/png/arrow-ios-up.png";
import discountImage from "../../../assets/svg/Icon/NotificationBar/discount_green.svg";
import SearchBar from "../../../Components/Search/index";
import ReturnItemPopup from "../../../Components/Popups/Return";
import { Link } from "react-router-dom";
import UpdateProfile from "../../../Components/UpdateProfile";

const addressDetails = [
  {
    name: "Anbarasan",
    line1: "10, Venkateshwara 1st Street, Ramapuram, Valasaravakkam",
    line2: "Chennai, Tamilnadu, 600 087",
    phoneNo: "1234567890",
    isActive: false,
  },
  {
    name: "Anbarasan",
    line1: "10, Venkateshwara 1st Street, Ramapuram, Valasaravakkam",
    line2: "Chennai, Tamilnadu, 600 087",
    phoneNo: "1236567890",
    isActive: false,
  },
];
class EmptyStatesPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeState: "profile",
      showReturnItemsPopup: true,
      storesVisible: false,
      isWishlistPageEmpty: true,
      isOrdersPageEmpty: true,
      isAddressPageEmpty: false,
      isCouponsPageEmpty: true,
      isCardsPageEmpty: true,
      isProfilePageEmpty: true,
      stateAddressDetails: addressDetails,
      yourProfile: {
        fullName: props.fullName,
        phoneNumber: "1234567890",
        emailId: props.emailId,
        gender: props.gender,
      },
    };
  }
  render() {
    return (
      <div className="wishlist">
        <div className="table">
          <div className="row">
            <div
              className={
                this.state.activeState == "order" ? "active" : "items1"
              }
            >
              <a href="#" onClick={this.changeStatetoOrder}>
                Your Orders
              </a>
            </div>
            <div
              className={
                this.state.activeState == "wishlist" ? "active" : "items2"
              }
            >
              <a href="#" onClick={this.changeStatetoWishlist}>
                Your Wishlist
              </a>
            </div>
            <div
              className={
                this.state.activeState == "coupons" ? "active" : "items3"
              }
            >
              <a href="#" onClick={this.changeStatetoCoupons}>
                Coupons
              </a>
            </div>
            <div
              className={
                this.state.activeState == "address" ? "active" : "items4"
              }
            >
              <a href="#" onClick={this.changeStatetoAddress}>
                Saved Addresses
              </a>
            </div>
            <div
              className={
                this.state.activeState == "savedcards" ? "active" : "items5"
              }
            >
              <a href="#">
                Saved Cards <img src={qmark} />
              </a>
            </div>
            <div
              className={
                this.state.activeState == "profile" ? "active" : "items6"
              }
            >
              <a href="#" onClick={this.changeStatetoProfile}>
                Profile
              </a>
            </div>
          </div>
        </div>
        {this.state.activeState == "wishlist" &&
        this.state.isWishlistPageEmpty === true ? (
          <>
            <div>
              <div className="navbar">
                <div className="header">
                  <div className="text">Your Wishlist</div>

                  <SearchBar className="search" />
                </div>
                <div className="line"></div>
              </div>
              <div className="functionalPart">
                <div className="emptyImage">
                  <img src={EmptyWishlistImage} alt="error" className="Image" />
                </div>
                <div className="descrect">
                  <text className="desc">Your wishlist is empty</text>
                </div>
                <div className="button">
                  <div className="rectangle">
                    <text className="buttonText">Continue Shopping</text>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
        {this.state.activeState == "order" &&
        this.state.isOrdersPageEmpty === true ? (
          <>
            <div>
              <div className="navbar">
                <div className="header">
                  <div className="text">Your Orders</div>

                  <SearchBar className="search" />
                </div>
                <div className="line"></div>
              </div>
              <div className="functionalPart">
                <div className="emptyImage">
                  <img src={EmptyOrderImage} alt="error" className="Image" />
                </div>
                <div className="descrect">
                  <text className="desc">No orders to show</text>
                </div>
                <Link>
                  <div className="button">
                    <div className="rectangle">
                      <text className="buttonText">Continue Shopping</text>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {this.state.showReturnItemsPopup ? (
              <>
                <ReturnItemPopup triggerClose={this.showPopup} />
              </>
            ) : null}
          </>
        ) : null}
        {this.state.activeState == "address" ? (
          <div>
            {this.state.isAddressPageEmpty ? (
              <div>
                <div className="navbar">
                  <div className="header">
                    <div className="text">Saved Adresses()</div>
                  </div>
                  <div className="line"></div>
                </div>
                <div className="functionalPart">
                  <div className="emptyImage">
                    <img
                      src={EmptyAddressImage}
                      alt="error"
                      className="Image"
                    />
                  </div>
                  <div className="descrect">
                    <text className="desc">No saved Adresses found</text>
                  </div>
                  <div className="button">
                    <div className="rectangle">
                      <text className="buttonText">Continue Shopping</text>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="navbar">
                    <div className="header">
                      <div className="text">
                        Saved Adresses({addressDetails.length})
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="savedAddress">
                    {this.state.stateAddressDetails.map(
                      (addressDetails, index) => (
                        <AddressComponent
                          key={index}
                          addressDetails={addressDetails}
                          triggerRadio={this.setdefAddress}
                          whichPage="savedAddress"
                        />
                      )
                    )}{" "}
                  </div>
                  <div className="newAddress">
                    <div className="text">Add New Address</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {this.state.activeState == "coupons" &&
        this.state.isCouponsPageEmpty === true ? (
          <div>
            <div className="navbar">
              <div className="header">
                <div className="text">Saved Adresses</div>
                <SearchBar className="search" />
              </div>
            </div>
            <div className="moreDet">
              <div className="span">
                <div className="pic">
                  <img src={discountImage} alt="error" />
                </div>
                <div className="offerText">
                  <text>Clock&lsquo;s Best deal</text>
                </div>
              </div>
              <div className="title">
                Avail the 6% Discount on all products on in-store purchase
              </div>
              <div className="line"></div>

              <div className="body1">
                <text>
                  1. Purchase your products on the mentioned store below
                  <br />
                </text>
                <text>
                  2. Scan the Clocks QR code in the billing Counter
                  <br />
                </text>
                <text>
                  3. A webpage will open contains the Coupon code
                  <br />
                </text>
                <text>
                  4. Share that code when billing
                  <br />
                </text>
                <text>
                  5. 6% discount will be added to your billing
                  <br />
                </text>
              </div>
              <div className="line"></div>
              <button className="dropdown" onClick={this.revealStores}>
                <div className="span"></div>
                <text>Stores</text>
                <img src={upArrow} alt="error" className="imgArrow" />
              </button>
              {this.state.storesVisible ? (
                <>
                  <div className="body2">
                    <text>
                      1. Adidas
                      <br />
                    </text>
                    <text>
                      2. Puma
                      <br />
                    </text>
                    <text>
                      3. Max Lifestyle
                      <br />
                    </text>
                    <text>
                      4. Allen solly
                      <br />
                    </text>
                    <text>
                      5. Basics
                      <br />
                    </text>
                    <text>
                      6. Nike
                      <br />
                    </text>
                    <text>
                      7. Peter England
                      <br />
                    </text>
                    <text>
                      8. Trends
                      <br />
                    </text>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
        {this.state.activeState == "profile" &&
          this.state.isProfilePageEmpty === true ? (
                    <UpdateProfile/>)
        : null}
          {/* <>
            <div className="navbar">
              <div className="header">
                <div className="text">Your Profile</div>
                <SearchBar className="search" />
              </div>
              <div className="line"></div>
            </div>
            <div>
              <form className="contactUsForm">
                <div className="inputLabelSet">
                  <label className="label">
                    Full Name
                    <br />
                    <input
                      type="text"
                      name="fullName"
                      className="field"
                      value={this.state.yourProfile.fullName}
                      onChange={this.handlefullNameChanged.bind(this)}
                    />
                  </label>
                </div>
                <div className="inputLabelSet">
                  <label className="label">
                    Phone Number
                    <br />
                    <input
                      type="text"
                      name="phoneNum"
                      className="field"
                      value={this.state.yourProfile.phoneNumber}
                      readOnly
                    />
                  </label>
                </div>
                <div className="inputLabelSet">
                  <label className="label">
                    Email Address
                    <br />
                    <input
                      type="text"
                      name="emailId"
                      className="field"
                      value={this.state.yourProfile.emailId}
                      onChange={this.handleEmailChanged.bind(this)}
                    />
                  </label>
                </div>
                <p className="selectName">Gender</p>
                <div className="customSelect">
                  <select
                    className="styledSelect"
                    value={this.state.yourProfile.gender}
                    onChange={this.handleGenderChanged.bind(this)}
                  >
                    <option>choose</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>
                </div>
              </form>
            </div>
            <button
              className="updateButton"
              onClick={this.handleButtonClicked.bind(this)}
            >
              update changes
            </button>
          </> */}
      </div>
    );
  }

  changeStatetoOrder = () => {
    this.setState({ activeState: "order" });
  };
  changeStatetoWishlist = () => {
    this.setState({ activeState: "wishlist" });
  };
  changeStatetoProfile = () => {
    this.setState({ activeState: "profile" });
  };
  changeStatetoAddress = () => {
    this.setState({ activeState: "address" });
  };
  changeStatetoCoupons = () => {
    this.setState({ activeState: "coupons" });
  };
  showPopup = () => {
    this.setState((prevState) => ({
      showReturnItemsPopup: !prevState.showReturnItemsPopup,
    }));
  };
  revealStores = () => {
    this.setState((prevState) => ({
      storesVisible: !prevState.storesVisible,
    }));
  };
  setdefAddress = (phoneN) => {
    this.setState({
      stateAddressDetails: addressDetails.map((addressDetail) => {
        return {
          ...addressDetail,
          isActive: addressDetail.phoneNo === phoneN ? true : false,
        };
      }),
    });
  };
  handlefullNameChanged = (event) => {
    var yourProfile = this.state.yourProfile;
    var modifiedValue = event.target.value;
    yourProfile.fullName = modifiedValue;
    this.setState({
      yourProfile: yourProfile,
    });
  };
  handlePhoneNumChanged = (event) => {
    // Extract the current value of the customer from state
    var yourProfile = this.state.yourProfile;
    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    yourProfile.phoneNumber = modifiedValue;
    // Update the state object
    this.setState({
      yourProfile: yourProfile,
    });
  };
  handleEmailChanged = (event) => {
    var yourProfile = this.state.yourProfile;
    var modifiedValue = event.target.value;
    yourProfile.emailId = modifiedValue;
    this.setState({
      yourProfile: yourProfile,
    });
  };
  handleGenderChanged = (event) => {
    var yourProfile = this.state.yourProfile;
    var modifiedValue = event.target.value;
    yourProfile.gender = modifiedValue;
    this.setState({
      yourProfile: yourProfile,
    });
  };
  handleButtonClicked() {
    console.log(this.state.yourProfile);
  }
}
EmptyStatesPages.propTypes = {
  triggerWishlist: PropTypes.func,
  fullName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};


export default EmptyStatesPages;
