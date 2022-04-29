import React, { useState } from "react";
import NumberInput from "../../Components/NumberInput";
import OTPInput from "../../Components/OTPInput";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "./style.scss";

SendOtp.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export function SendOtp(props) {
  const { onChange } = props;
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="loginsignup">
      <text className="txt1"> Login or SignUp</text>
      <div>
        {" "}
        <text className="txt2"> Purchase in malls straight from your Home</text>
      </div>
      <div className="mn"> Mobile Number</div>
      <div className="numinput">
        <NumberInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="agreelinks">
        By proceeding, you agree to{" "}
        <Link to={"./privacy"} style={{ textDecoration: "none" }}>
          <span style={{ color: "blue", cursor: "pointer" }}>
            Privacy policy
          </span>{" "}
        </Link>
        and{" "}
        <Link to={"./tnc"} style={{ textDecoration: "none" }}>
          <span style={{ color: "blue", cursor: "pointer" }}>
            Terms & Conditions{" "}
          </span>
        </Link>
      </div>
      <button
        id="sign-in-button"
        className="gbutton"
        onClick={() => onChange(phoneNumber)}
      >
        <text>Continue</text>
      </button>
      <div>
        {" "}
        <text className="txt3">Need Help?</text>{" "}
      </div>
    </div>
  );
}

VerifyOtp.propTypes = {
  onChange: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  changeToEmailLogin: PropTypes.func.isRequired,
};

export function VerifyOtp(props) {
  const { onChange, phoneNumber, changeToEmailLogin } = props;
  const [otp, setOtp] = useState("");

  return (
    <div className="otp2">
      <text className="txt1"> Please enter OTP</text>
      <div>
        <text className="txt2">
          {" "}
          {`Verification code sent to +91 ${phoneNumber}`}
        </text>
      </div>

      <div className="sininput">
        <OTPInput value={otp} onChange={setOtp} />
      </div>
      {/* <div className="restxt">
        {" "}
        Resend OTP in <b style={{ color: "black" }}>30s</b>
      </div> */}
      <button className="gbutton" onClick={() => onChange(otp)}>
        <text>Login</text>
      </button>
      <div className="otpli">
        Trouble Verifying?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={changeToEmailLogin}
        >
          Login with Password
        </span>
      </div>
    </div>
  );
}

LoginWithEmail.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export function LoginWithEmail(props) {
  const { onChange } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    onChange(email, password);
  };
  return (
    <div className="login">
      <text className="txt1"> Login</text>
      <div>
        <text className="txt2"> Login with email and password</text>
      </div>
      <form>
        <div className="inputing">
          <label>Email</label>{" "}
          <div>
            {" "}
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="inputing">
          <label>Password</label>{" "}
          <div>
            {" "}
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>{" "}
        </div>
        <button className="gbutton" onClick={handleChange}>
          <text>Login</text>
        </button>
      </form>
      {/* <div className="fptxt" onClick={this.changeStatetoReset}>
          Forgot Password?
        </div> */}

      <div>
        <text className="txt3">Need Help?</text>
      </div>
    </div>
  );
}

CompleteProfile.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export function CompleteProfile(props) {
  const { onChange, user={} } = props;
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email ||"");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword || !email || !name)
      return toast.warning("Please fill all the fields");
    if (password === confirmPassword) {
      onChange(name, email, password);
    } else {
      toast.error("Password and Confirm Password do not match");
    }
  };
  return (
    <div className="logincontentcompletesignup">
      <div className="completesignup">
        <text className="txt1"> Please complete Sign up!</text>
        <div>
          <text className="txt2">
            {" "}
            {`Complete the below details to ${
              user.name ? "Update" : "create"
            } your account`}
          </text>
        </div>
        <form>
          <div className="inputing">
            <label>
              Full Name<b style={{ color: "red" }}>*</b>
            </label>{" "}
            <div>
              {" "}
              <input
                type="text"
                placeholder="Enter  your  Full  Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="inputing">
            <label>Email address</label>{" "}
            <div>
              {" "}
              <input
                type="email"
                placeholder="Enter  your  email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>{" "}
          </div>
          <div className="inputing">
            <label>
              Create Password<b style={{ color: "red" }}>*</b>
            </label>{" "}
            <div>
              <input
                type="password"
                placeholder="Enter  your  password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="inputing" style={{ marginTop: "10px" }}>
            <label>
              Confirm Password<b style={{ color: "red" }}>*</b>
            </label>{" "}
            <div>
              <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="txt3">
            Password contains atleast 8 letters, One alphabet, One Number, One
            symbol
          </div>
          <div className="agreelinks">
            By proceeding, you agree to{" "}
            <Link to={"privacy"} style={{ textDecoration: "none" }}>
              <span style={{ color: "blue", cursor: "pointer" }}>
                Privacy policy
              </span>{" "}
            </Link>
            and{" "}
            <Link to={"/tnc"} style={{ textDecoration: "none" }}>
              <span style={{ color: "blue", cursor: "pointer" }}>
                Terms & Conditions{" "}
              </span>
            </Link>
          </div>
          <button className="gbutton" onClick={handleCreateAccount}>
            <text>Create your Account</text>
          </button>
        </form>
      </div>
    </div>
  );
}
