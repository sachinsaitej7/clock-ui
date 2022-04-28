import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import TermsandConditionsPage from "../Terms&ConditonPage/MyPdf";
class TermsandConditionsControl extends Component {
  constructor(props) {
    super(props);
    this.state = { activeState: "terms", showReturnItemsPopup: true };
  }
  render() {
    return (
      <div className="termsAndCond">
        <div className="table">
          <div className="row">
            <div
              className={
                this.state.activeState == "returnPolicy" ? "active" : "items1"
              }
            >
              <a href="#" onClick={this.changeStatetoReturnPolicy}>
                Return Policy
              </a>
            </div>
            <div
              className={
                this.state.activeState == "terms" ? "active" : "items2"
              }
            >
              <a href="#" onClick={this.changeStatetoTerms}>
                Terms and Conditions
              </a>
            </div>
            <div
              className={
                this.state.activeState == "privacyPolicy" ? "active" : "items3"
              }
            >
              <a href="#" onClick={this.changeStatetoPrivacy}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        {this.state.activeState == "terms" ? (
          <>
            <TermsandConditionsPage />
          </>
        ) : null}
=======
        <div className="docs">
        {this.state.activeState == "terms"? <><TermsandConditionsPage /></>:null}
      </div>
>>>>>>> 86cf219029a986389b29381b08f40fc83bec8637
      </div>
    );
  }

  changeStatetoReturnPolicy = () => {
    this.setState({ activeState: "returnPolicy" });
  };
  changeStatetoTerms = () => {
    this.setState({ activeState: "terms" });
  };
  changeStatetoPrivacy = () => {
    this.setState({ activeState: "privacyPolicy" });
  };
}
TermsandConditionsControl.propTypes = {
  Children: PropTypes.func,
};
export default TermsandConditionsControl;
