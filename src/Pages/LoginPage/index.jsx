import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import Close from "../../assets/svg/close.svg";
import { AuthContext } from "../../Contexts/AuthContext";
import OverlayLoader from "../../Components/OverlayLoader";
import Backdrop from "@mui/material/Backdrop";

import {
  SendOtp,
  VerifyOtp,
  LoginWithEmail,
  CompleteProfile,
} from "./LoginStates";

class LoginPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
    };
  }

  componentDidUpdate() {
    if (this.context.loginState === "LOGGED_IN") {
      this.props.handleClose();
    }
  }

  handleSendOtpChange = (phoneNumber) => {
    const { handleSignInWithPhone } = this.context;
    this.setState({ phoneNumber });
    handleSignInWithPhone(phoneNumber);
  };

  handleChangeToEmailLogin = () => {
    this.context.setLoginState("LOGIN_WITH_EMAIL");
  };

  handleClose = () => {
    // this.context.setLoginState("SEND_OTP");
    this.props.handleClose();
  };

  renderChild = (loginState) => {
    const { verifyOtp, handleSignInWithEmail, updateUserProfile } =
      this.context;
    switch (loginState) {
      case "LOADING":
        return <OverlayLoader />;
      case "SEND_OTP":
        return <SendOtp onChange={this.handleSendOtpChange} />;
      case "VERIFY_OTP":
        return (
          <VerifyOtp
            onChange={verifyOtp}
            phoneNumber={this.state.phoneNumber}
            changeToEmailLogin={this.handleChangeToEmailLogin}
          />
        );
      case "LOGIN_WITH_EMAIL":
        return <LoginWithEmail onChange={handleSignInWithEmail} />;
      case "COMPLETE_PROFILE":
        return <CompleteProfile onChange={updateUserProfile} />;
      default:
        return null;
    }
  };

  render() {
    const { loginState } = this.context;

    return (
      <Backdrop
        sx={{
          opacity: 1,
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <div
          className="logincontentotpnew logincontent logincontentotpexis 
        logincontent1 logincontentreset logincontentcompletesignup"
        >
          <img
            src={Close}
            onClick={this.handleClose}
            className="xButton"
            alt="seperator"
          />
          {this.renderChild(loginState)}
        </div>
      </Backdrop>
    );
  }
}
LoginPages.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
LoginPages.contextType = AuthContext;

export default LoginPages;
