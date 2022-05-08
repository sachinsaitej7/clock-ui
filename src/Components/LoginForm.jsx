import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
// import OTPInput from "./OTPInput";
import LoginPages from "../Pages/LoginPage";

export function BasicButtons({ title, handleAction }) {
  return (
    <Button id="sign-in-button" variant="contained" onClick={handleAction}>
      {title}
    </Button>
  );
}

BasicButtons.propTypes = {
  title: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default function BasicTextFields() {
  return (
    <LoginPages/>
    // <div>
    //   <div className="heading-container">
    //     <h3>{title} Form</h3>
    //   </div>

    //   <Box
    //     component="form"
    //     sx={{
    //       "& > :not(style)": { m: 1, width: "25ch" },
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <TextField
    //       id="email"
    //       type="email"
    //       label="Enter the Email"
    //       variant="outlined"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <TextField
    //       id="password"
    //       label="Enter the Password"
    //       variant="outlined"
    //       type="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </Box>
    //   <BasicButtons title={title} handleAction={handleAction} />
    //   <BasicButtons title="OTP" handleAction={() => handleOtp()} />
    //   <OTPInput />
    // </div>
  );
}

BasicTextFields.propTypes = {
  title: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleOtp: PropTypes.func,
};
