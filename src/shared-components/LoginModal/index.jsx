import React, { useState, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Modal, Button, Form, Input, Typography } from "antd";
import { toast } from "react-toastify";

// images
import { ReactComponent as CCloseIcon } from "../../assets/common/close-circle.svg";

const StyledButton = styled(Button)`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  margin-bottom: ${(props) => props.theme.space[5]};
  height: 40px;
  span {
    color: ${(props) =>
      props.theme.text[props.type === "primary" ? "white" : "primary"]};
    font-size: ${(props) => props.theme.fontSizes[4]};
    line-height: 20px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  border: 1px solid rgba(41, 41, 41, 0.5);
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[5]}`};
  :placeholder-shown {
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 16px;
  }
`;

const Text = styled(Typography.Text)`
  font-size: ${(props) => props.theme.fontSizes[0]};
  line-height: 14px;
  color: rgba(41, 41, 41, 0.5);
  padding: ${(props) =>
    `${props.theme.space[2]} ${props.theme.space[5]} ${props.theme.space[0]}`};
  display: block;
  margin-top: -${(props) => props.theme.space[5]};
  margin-bottom: ${(props) => props.theme.space[5]};
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: ${(props) => props.theme.space[5]};
  }
  .ant-input:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
  .ant-input:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.secondary};
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: ${(props) => props.theme.borderRadius[3]};
  }
`;

const LoginModal = ({
  handleClose = () => {},
  sendOtp = () => {},
  verifyOtp = () => {},
}) => {
  const theme = useTheme();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const onSendOtp = () => {
    setLoading(true);
    const phoneNumber = inputRef.current.input.value;
    console.log(phoneNumber);
    sendOtp(phoneNumber)
      .then(() => {
        setLoading(false);
        setStep(2);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  const onSubmit = ({ list = {} }) => {
    const { otp } = list;
    setLoading(true);
    verifyOtp(otp)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        toast.error("Invalid OTP");
        setLoading(false);
      });
  };

  return (
    <StyledModal
      visible={true}
      footer={null}
      closeIcon={<CCloseIcon onClick={handleClose} />}
      bodyStyle={{
        paddingTop: theme.space[9],
      }}
      onCancel={handleClose}
    >
      <StyledForm onFinish={onSubmit} scrollToFirstError layout="vertical">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              <Form.Item
                name="phone"
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
                  autoFocus={step === 1}
                  type="number"
                  ref={inputRef}
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
                  <StyledInput
                    placeholder="Enter 6 digit Code"
                    type="number"
                    autoFocus={step === 2}
                  />
                </Form.Item>
              )}
              {step === 1 && (
                <Form.Item name="send-otp" showUpdate={true}>
                  <StyledButton
                    onClick={onSendOtp}
                    id="sign-in-button"
                    loading={loading}
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
            <StyledButton htmlType="submit" loading={loading}>
              Login
            </StyledButton>
          </Form.Item>
        )}
      </StyledForm>
    </StyledModal>
  );
};

export default LoginModal;
