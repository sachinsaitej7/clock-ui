import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { toast } from "react-toastify";
import { Divider, Button, Input, Form, Typography } from "antd";

import ProgressBar from "../../shared-components/ProgressBar";


const Container = styled.div`
  width: 100%;
  .divider {
    border-top: 1px solid rgba(41, 41, 41, 0.12);
    margin: ${(props) => props.theme.space[5]} 0px;
  }
  .address {
    font-size: ${(props) => props.theme.fontSizes[2]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 18px;
    letter-spacing: 0.01612em;
  }
`;

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
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
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

const ITEMS = [
  {
    title: "Add New Address",
  },
  {
    title: "Review Order",
  },
  {
    title: "Success",
  },
];

const NewAddressPage = ({ onSubmit }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const onFinish = (newAddress) => {
    console.log(newAddress);
    const { landMark, city, state, pincode, mobileNo="", email="" } = newAddress;
    const payload = {
      name: newAddress.fname + " " + newAddress.lname,
      address: newAddress.address1 + " " + newAddress.address2,
      landMark,
      city,
      pincode,
      state,
      mobileNo,
      email,
    };
    onSubmit(payload).then(
      () => {
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error(error.message);
      }
    );
  };

  return (
    <Container>
      <div style={{ padding: theme.space[3] + " " + theme.space[5] }}>
        <ProgressBar items={ITEMS} currentStep={1} />
      </div>

      <div style={{ padding: theme.space[0] + " " + theme.space[5] }}>
        <Divider className="divider" />
        <p className="address">Shipping Address</p>
      </div>

      <div style={{ padding: theme.space[5] }}>
        <StyledForm
          onFinish={onFinish}
          name="newAddress"
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="fname"
            rules={[
              {
                required: true,
                message: "Please input your First name!",
              },
            ]}
          >
            <StyledInput placeholder="First Name *" />
          </Form.Item>
          <Form.Item
            name="lname"
            rules={[
              {
                required: true,
                message: "Please input your Last name!",
              },
            ]}
          >
            <StyledInput placeholder="Last Name *" />
          </Form.Item>
          <Form.Item
            name="address1"
            rules={[
              {
                required: true,
                message: "Please input your Street Address!",
              },
            ]}
          >
            <StyledInput
              style={{ marginBottom: theme.space[0] }}
              placeholder="Street Address *"
            />
          </Form.Item>
          <Text>Ex: No.12, Mount Road</Text>
          <Form.Item
            name="address2"
            rules={[
              {
                required: false,
                message: "Please input your Street Address!",
              },
            ]}
          >
            <StyledInput
              style={{ marginBottom: theme.space[0] }}
              placeholder="Apartment Number & Name "
            />
          </Form.Item>
          <Text>Ex: B612, Presidium</Text>
          <Form.Item
            name="landMark"
            rules={[
              {
                required: true,
                message: "Please input your Area/Landmark!",
              },
            ]}
          >
            <StyledInput placeholder="Area *" />
          </Form.Item>
          <Form.Item
            name="pincode"
            rules={[
              {
                required: true,
                message: "Please input your Pincode!",
              },
            ]}
          >
            <StyledInput placeholder="Pincode *" />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your City!",
              },
            ]}
          >
            <StyledInput placeholder="City *" />
          </Form.Item>
          <Form.Item
            name="state"
            rules={[
              {
                required: true,
                message: "Please input your State!",
              },
            ]}
          >
            <StyledInput placeholder="State *" />
          </Form.Item>
          <p style={{ padding: theme.space[2] + " " + theme.space[4] }}>
            Country:{" "}
            <span style={{ fontWeight: theme.fontWeights.semibold }}>
              India
            </span>
          </p>
          <Divider className="divider" />
          <p className="address" style={{ marginBottom: theme.space[5] }}>
            Contact Information
          </p>
          <Form.Item name="mobileNo">
            <StyledInput placeholder="Mobile Number" />
          </Form.Item>
          <Form.Item name="email">
            <StyledInput placeholder="Email ID" />
          </Form.Item>
          <StyledButton htmlType="submit" loading={loading}>Save New Address</StyledButton>
        </StyledForm>
      </div>
    </Container>
  );
};

export default NewAddressPage;
