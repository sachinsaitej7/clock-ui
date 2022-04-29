import React, { Component } from "react";
import "./style.scss";
import Img1 from "../../../assets/svg/Progress1col.svg";
import Img2 from "../../../assets/svg/Progress2.svg";
import Img3 from "../../../assets/svg/Progress3.svg";
import line from "../../../assets/svg/Line 18.svg";
import PropTypes from "prop-types";
import Seperator from "../../../assets/png/separator.png";
import { toast } from "react-toastify";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import withRouter from "../../../Hoc/WithRouter";
import { AuthContext } from "../../../AuthContext";
import { Link } from "react-router-dom";

class NU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pincode: "",
      address: "",
      city: "",
      landMark: "",
      state: "",
      email: "",
      mobileNo: "",
      alternateMobileNo: "",
    };
  }

  handleNameChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      name: modifiedValue,
    });
  };

  handleMobileNoChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      mobileNo: modifiedValue,
    });
  };

  handleEmailChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      email: modifiedValue,
    });
  };

  handlePincodeChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      pincode: modifiedValue,
    });
  };

  handleAddressChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      address: modifiedValue,
    });
  };

  handleTownChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      city: modifiedValue,
    });
  };

  handleStateChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      state: modifiedValue,
    });
  };

  handleLandMarkChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      landmark: modifiedValue,
    });
  };

  handleAlternateMobileNoChange = (event) => {
    var modifiedValue = event.target.value;
    this.setState({
      alternativeMobile: modifiedValue,
    });
  };

  submitDetails() {
    const { user } = this.context;
    const {
      name,
      pincode,
      address,
      city,
      landMark,
      state,
      email,
      mobileNo,
      alternateMobileNo,
    } = this.state;
    if (!name || !address || !city || !state || !pincode || !email || !mobileNo)
      return toast.error("Please fill all the details");

    this.writeUserData({
      uuid: user.id,
      name,
      email,
      pincode,
      address,
      city,
      landMark,
      state,
      mobileNo,
      alternateMobileNo,
    });
  }

  async writeUserData({
    uuid,
    name,
    email,
    pincode,
    address,
    city,
    landMark,
    state,
    mobileNo,
    alternateMobileNo,
  }) {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "delivery-address"), {
        uuid,
        name,
        email,
        pincode,
        address,
        city,
        landMark,
        state,
        mobileNo,
        alternateMobileNo,
      });

      this.props.navigate("/address");

      toast.success("Address Successfully added!!!");
    } catch (e) {

      toast.error("Please login!!!");
    }
  }

  render() {
    const { user } = this.context;
    console.log(user, "new_user");
    return (
      <div className="newuser">
        <img className="line" src={Seperator} />
        <div className="disp1">
          <div style={{ width: "25%" }}>
            <text className="txt1">Delivery Address</text>
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
            {/* <div className="pinbox">
              {" "}
              <span className="txt3">Your Pinned Location</span>{" "}
              <img src={Info} className="qmark" /> <button>CHANGE</button>
            </div> */}

            <form>
              <div className="line1">
                {/* Name */}
                <div className="inputing1">
                  <label>
                    {" "}
                    Name<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <div>
                    {" "}
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.handleNameChange.bind(this)}
                    />
                  </div>
                </div>
                {/* Mobile Number */}
                <div className="inputing2">
                  <label>
                    Mobile Number<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <div>
                    {" "}
                    <input
                      type="number"
                      value={this.state.mobileNo}
                      onChange={this.handleMobileNoChange.bind(this)}
                    />
                  </div>{" "}
                </div>
              </div>
              <div className="line1">
                {/* Email */}
                <div className="inputing1">
                  <label>
                    Email<b style={{ color: "red" }}>*</b>
                  </label>{" "}
                  <div>
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmailChange.bind(this)}
                    />
                  </div>
                </div>
                {/* Pincode */}
                <div className="inputing2c">
                  <label>Pincode</label>{" "}
                  <div>
                    <input
                      type="number"
                      value={this.state.pincode}
                      onChange={this.handlePincodeChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
              {/* Address */}
              <div className="inputing">
                <label>
                  Address<b style={{ color: "red" }}>*</b>
                </label>{" "}
                <div>
                  <textarea
                    value={this.state.address}
                    onChange={this.handleAddressChange.bind(this)}
                  />
                </div>
              </div>
              <div className="line1">
                {/* Town */}
                <div className="inputing1c">
                  <label>Town/City</label>{" "}
                  <div>
                    <input
                      type="text"
                      value={this.state.city}
                      onChange={this.handleTownChange.bind(this)}
                    />
                  </div>
                </div>
                {/* State */}
                <div className="inputing2c">
                  <label>State</label>{" "}
                  <div>
                    <input
                      type="text"
                      value={this.state.state}
                      onChange={this.handleStateChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
              {/* Last two Landmark and alternate mobileno */}
              <div className="linelast">
                <div className="inputing1">
                  <label>Landmark(optional)</label>{" "}
                  <div>
                    <input
                      type="text"
                      placeholder=" Type you Landmark"
                      value={this.state.landMark}
                      onChange={this.handleLandMarkChange.bind(this)}
                    />
                  </div>
                </div>
                <div className="inputing2">
                  <label>Alternate Mobile Number (Optional)</label>{" "}
                  <div>
                    <input
                      type="text"
                      placeholder="Type your Alternate Mobile Number"
                      value={this.state.alternateMobileNo}
                      onChange={this.handleAlternateMobileNoChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {!user.address?.length ? (
            <button className="butt1">Continue</button>
          ) : (
            <Link to="/address" style={{ textDecoration: "none" }}>
              <button className="butt1">Continue</button>
            </Link>
          )}
        </div>

        <div style={{ marginTop: "1%" }}>
          {/* Bindinginput */}
          <button
            className="butt2"
            style={{ border: "1px solid black" }}
            onClick={this.submitDetails.bind(this)}
          >
            Add New Address
          </button>
        </div>
        <img className="line2" src={Seperator} />
      </div>
    );
  }
}

NU.propTypes = {
  navigate: PropTypes.func.isRequired,
};

NU.contextType = AuthContext;

export default withRouter(NU);
