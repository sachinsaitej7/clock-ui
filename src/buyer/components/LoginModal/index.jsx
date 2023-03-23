import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Modal, Button, Form, Input, Typography, App } from "antd";

// images
import { XCircleIcon } from "@assets/icons";

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${(props) => props.theme.space[5]};
  height: 40px;
  span {
    font-size: ${(props) => props.theme.fontSizes[4]};
    line-height: 120%;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[5]}`};
  :placeholder-shown {
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 16px;
  }
`;

const Text = styled(Typography.Text)`
  font-size: ${(props) => props.theme.fontSizes[0]};
  line-height: 120%;
  display: block;
  margin-top: -${(props) => props.theme.space[5]};
  margin-bottom: ${(props) => props.theme.space[5]};
`;

const StyledForm = styled(Form)``;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: ${(props) => props.theme.borderRadius[3]};
  }
`;

const LoginModal = ({
  handleClose = () => {},
  sendOtp = () => {},
  verifyOtp = () => {},
  open,
}) => {
  const theme = useTheme();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  async function onSendOtp({ phone }) {
    if (phone.length !== 10)
      return message.error("Invalid mobile number, try again");
    try {
      setLoading(true);
      await sendOtp(phone);
      setStep((p) => p + 1);
    } catch (err) {
      message.error("Otp failed, try again");
    }
    setLoading(false);
  }

  async function onVerifyOtp({ otp }) {
    if (otp.length !== 6) return message.error("Invalid otp, try again");
    try {
      setLoading(true);
      await verifyOtp(otp);
      setStep((p) => p + 1);
    } catch (err) {
      message.error("Otp failed, try again");
    }
    setLoading(false);
  }

  const onSubmit = ({ list }) => {
    if (step === 1) return onSendOtp(list);
    if (step === 2) return onVerifyOtp(list);
  };

  return (
    <StyledModal
      open={open}
      footer={null}
      closeIcon={<XCircleIcon onClick={handleClose} />}
      bodyStyle={{
        paddingTop: theme.space[4],
      }}
      onCancel={handleClose}
      title={<h3 className="text-lg">Login</h3>}
    >
      <StyledForm onFinish={onSubmit} scrollToFirstError layout="vertical">
        <Form.List name="list" className="mb-1">
          {(fields, { add, remove }) => (
            <>
              <Form.Item
                name="phone"
                validateFirst={true}
                validateStatus={step === 2 ? "success" : ""}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Invalid mobile number!",
                    max: 10,
                  },
                ]}
              >
                <StyledInput
                  placeholder="Phone Number"
                  type="number"
                  id="success"
                  prefix={"+91"}
                  contentEditable={step === 1}
                />
              </Form.Item>
              <Text>Promise, we don't spam</Text>
              {step === 2 && (
                <Form.Item
                  name="otp"
                  dependencies={["phone"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input valid otp!",
                      max: 6,
                    },
                  ]}
                >
                  <StyledInput placeholder="Enter 6 digit Code" type="number" />
                </Form.Item>
              )}
              {step === 1 && (
                <Form.Item name="send-otp">
                  <StyledButton
                    // onClick={onSendOtp}
                    id="sign-in-button"
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="bg-primary"
                  >
                    Send Otp
                  </StyledButton>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>

        {step === 2 && (
          <Form.Item>
            <StyledButton
              htmlType="submit"
              loading={loading}
              type="primary"
              className="bg-primary"
            >
              Login
            </StyledButton>
          </Form.Item>
        )}
      </StyledForm>
    </StyledModal>
  );
};

export default LoginModal;
