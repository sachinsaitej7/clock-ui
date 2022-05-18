import React, { Component } from "react";
import "./style.scss";
import DocumentViewer from "./DocumentViewer";

const StatePathMap = {
  terms: "./ClockTnC.pdf",
  privacy: "./ClockPrivacyPolicy.pdf",
  return: "./ReturnRefund&Shipping.pdf",
  contact: "./ContactInformation.pdf",
};

class TnCPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeState: "terms",
      path: StatePathMap.terms,
    };
  }

  handleClick = (state) => {
    this.setState({ activeState: state });
    this.setState({ path: StatePathMap[state] });
  };

  render() {
    return (
      <div className="page-container">
        <div className="left-container">
          <div
            className={`left-item ${
              this.state.activeState === "terms" ? "active" : ""
            }`}
            onClick={() => this.handleClick("terms")}
          >
            <p>Terms and Conditions</p>
          </div>
          <div
            className={`left-item ${
              this.state.activeState === "privacy" ? "active" : ""
            }`}
            onClick={() => this.handleClick("privacy")}
          >
            <p>Privacy Policy</p>
          </div>
          <div
            className={`left-item ${
              this.state.activeState === "return" ? "active" : ""
            }`}
            onClick={() => this.handleClick("return")}
          >
            <p>Return & Shipping Policy</p>
          </div>
          <div
            className={`left-item ${
              this.state.activeState === "contact" ? "active" : ""
            }`}
            onClick={() => this.handleClick("contact")}
          >
            <p>Contact Us</p>
          </div>
        </div>
        <div className="right-container">
          <DocumentViewer path={this.state.path} />
        </div>
      </div>
    );
  }
}

TnCPages.propTypes = {};

export default TnCPages;
