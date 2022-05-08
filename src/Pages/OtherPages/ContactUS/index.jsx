import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";

import PhoneImage from "../../../assets/png/Contact Us/phone.png";
import MailImage from "../../../assets/png/Contact Us/email.png";
import InstaImage from "../../../assets/png/Contact Us/insta.png";
import TwitterImage from "../../../assets/png/Contact Us/twitter.png";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactUs: {
        customerName: props.customerName,
        mobileNo: props.mobileNo,
        eMail: props.eMail,
        subject: props.subject,
        message: props.message,
      },
    };
  }
  render() {
    return (
      <div className="container">
        <div className="title">Contact Us</div>
        <div className="desc">
          Our team loves to hear from you, so if you have questions or comments,
          we&lsquo;re right here and
          <br /> ready to assist in any way we can.
        </div>
        <div className="rightBox">
          <div className="hori">
            <img src={PhoneImage} alt="#" className="phone" />
            <text className="text">+91 89765 43210</text>
          </div>
          <div className="hori">
            <img src={MailImage} alt="#" className="mail" />
            <text className="text" href="">
              info@clock.com
            </text>
          </div>
          <div className="hori">
            <text className="boldText">
              Connect with us
              <br />
            </text>
          </div>
          <div className="hori">
            <a href="https://instagram.com">
              <img src={InstaImage} alt="" className="insta" />
            </a>
            <a href="https://twitter.com/">
              <img src={TwitterImage} alt="" className="twitter" />
            </a>
          </div>
        </div>
        <div>
          <form className="contactUsForm">
            <div className="inputLabelSet">
              <label className="label">
                Name<text className="asterisk">*</text>
                <br />
                <input
                  type="text"
                  value={this.state.contactUs.customerName}
                  className="field"
                  onChange={this.handleNameChange.bind(this)}
                />
              </label>
            </div>
            <div className="inputLabelSet">
              <label className="label">
                Mobile Number<text className="asterisk">*</text>
                <br />
                <input
                  type="text"
                  value={this.state.contactUs.mobileNo}
                  className="field"
                  onChange={this.handleMobileNoChange.bind(this)}
                />
              </label>
            </div>

            <div className="inputLabelSet">
              <label className="label">
                Email<text className="asterisk">*</text>
                <br />
                <input
                  type="text"
                  value={this.state.contactUs.eMail}
                  className="field"
                  onChange={this.handleEmailChange.bind(this)}
                />
              </label>
            </div>
            <div className="inputLabelSet">
              <label className="label">
                Subject
                <br />
                <input
                  type="text"
                  value={this.state.contactUs.subject}
                  className="field"
                  onChange={this.handleSubjectChange.bind(this)}
                />
              </label>
            </div>
            <div className="message">
              <div className="inputLabelSet">
                <label className="label">
                  Message<text className="asterisk">*</text>
                  <br />
                  <textarea
                    type="text"
                    value={this.state.contactUs.message}
                    className="fieldMessage"
                    onChange={this.handleMessageChange.bind(this)}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <button
          className="sendButton"
          type="submit"
          onClick={this.submitDetails.bind(this)}
        >
          Send
        </button>
      </div>
    );
  }
  handleNameChange = (event) => {
    var contactUs = this.state.contactUs;
    var modifiedValue = event.target.value;
    contactUs.customerName = modifiedValue;
    this.setState({
      contactUs: contactUs,
    });
  };

  handleMobileNoChange = (event) => {
    var contactUs = this.state.contactUs;
    var modifiedValue = event.target.value;
    contactUs.mobileNo = modifiedValue;
    this.setState({
      contactUs: contactUs,
    });
  };

  handleEmailChange = (event) => {
    var contactUs = this.state.contactUs;
    var modifiedValue = event.target.value;
    contactUs.eMail = modifiedValue;
    this.setState({
      contactUs: contactUs,
    });
  };

  handleMessageChange = (event) => {
    var contactUs = this.state.contactUs;
    var modifiedValue = event.target.value;
    contactUs.message = modifiedValue;
    this.setState({
      contactUs: contactUs,
    });
  };

  handleSubjectChange = (event) => {
    var contactUs = this.state.contactUs;
    var modifiedValue = event.target.value;
    contactUs.subject = modifiedValue;
    this.setState({
      contactUs: contactUs,
    });
  };

  submitDetails() {
    window.alert("Thank you for contact us. We will soon get back to you.");
  }
}
ContactUs.propTypes = {
  customerName: PropTypes.string.isRequired,
  mobileNo: PropTypes.string.isRequired,
  eMail: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
