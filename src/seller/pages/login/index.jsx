import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Typography, App } from "antd";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "@firebase-app";
import { useSendOtp, useVerifyOtp } from "./hooks";
import { PageContainer } from "@seller/styled-components";
import Login from "./login";
import VerifyOtpForm from "./verify-otp-form";
import SendOtpForm from "./send-otp-form";

const StyledContainer = styled(PageContainer)`
  padding-top: ${(props) => props.theme.space[5]};
`;

const LoginPage = () => {
  const theme = useTheme();
  const { auth } = getFirebase();
  const { message } = App.useApp();
  const [user] = useAuthState(auth);
  const [sendOtp, sendOtpData] = useSendOtp();
  const [verifyOtp, verifyOtpData] = useVerifyOtp();
  const { verificationId, phoneNumber } = sendOtpData;
  const [loginMode, setLoginMode] = useState(false);

  const handleResendOtp = async () => {
    try {
      await sendOtp(phoneNumber, true);
      message.success("OTP sent successfully");
    } catch (error) {
      message.error("OTP sending failed");
    }
  };

  if (user !== null) return <Navigate to="/seller" />;

  if (!loginMode)
    return (
      <StyledContainer className='bg-[#252629]'>
        <Login handleClick={() => setLoginMode(true)} />
      </StyledContainer>
    );

  return (
    <StyledContainer>
      {verificationId && (
        <>
          <Typography.Title level={4} style={{ marginTop: theme.space[4] }}>
            Enter OTP to verify
          </Typography.Title>
          <Typography.Paragraph style={{ color: "#8C8C8C" }}>
            Please enter the OTP code that we’ve sent to your registered phone
            number <strong className="text-primary">+91 {phoneNumber}</strong>
          </Typography.Paragraph>
          <VerifyOtpForm
            verifyOtp={verifyOtp}
            resendOtp={handleResendOtp}
            {...verifyOtpData}
            verificationId={verificationId}
          />
        </>
      )}
      <div style={{ display: verificationId ? "none" : null }}>
        <Typography.Title level={4} style={{ marginTop: theme.space[4] }}>
          Enter your phone number
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#8C8C8C" }}>
          You can create a new account or log in if you’re already a user of
          Clock
        </Typography.Paragraph>
        <SendOtpForm sendOtp={sendOtp} {...sendOtpData} />
        <Typography.Text type='secondary'>
          By logging in or signing up, you are agreeing to our Terms of Service
          and Privacy Policy
        </Typography.Text>
      </div>
    </StyledContainer>
  );
};

export default LoginPage;
