import React from "react";
import OtpInput from "react-otp-input";
import PropTypes from "prop-types";
import "./style.scss";



const OTPInput1 = (props) => {
  const { onChange, value } = props;
  return (
    <div className="otpip">
      <OtpInput
        value={value}
        onChange={(OTP) => onChange(OTP)}
        numInputs={6}
        separator={<span style={{ marginRight: "15px" }}>&nbsp;&nbsp;</span>}
        disabledStyle="true"
        otpType="number"
        inputStyle={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderColor: "#001210;",
          width: "30px",
        }}
        focusStyle={{ borderBottom: "true" }}
      />
    </div>
  );
};

OTPInput1.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default OTPInput1;
