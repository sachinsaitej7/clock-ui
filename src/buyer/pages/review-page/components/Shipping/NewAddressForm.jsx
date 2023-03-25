import React from "react";
import styled, { useTheme } from "styled-components";
import debounce from "lodash/debounce";

import { Divider, Input, Form, Typography, Checkbox } from "antd";

import { useSummaryContext } from "../../store/SummaryProvider";

const StyledInput = styled(Input)`
  width: 100%;
  border: 1px solid rgba(41, 41, 41, 0.32);
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  font-size: ${(props) => props.theme.fontSizes[3]};
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
`;

const NewAddressPage = () => {
  const theme = useTheme();
  const { setAddress } = useSummaryContext();

  const onValuesChange = debounce((_, allValues) => {
    const address = {
      mobileNo: allValues.mobileNo,
      email: allValues.email || "",
      name: `${allValues.fname || ""} ${allValues.lname || ""}`,
      address: (allValues.address1 || "") + " " + (allValues.address2 || ""),
      landMark: allValues.landMark || "",
      deliveryTime: "Update Later",
      deliveryDate: "Update Later",
      pincode: allValues.pincode,
      city: allValues.city,
      state: allValues.state,
      saveAddress: allValues.saveAddress,
      status: true,
    };

    setAddress(address);
  }, 2000);

  return (
    <StyledForm
      onValuesChange={onValuesChange}
      name='newAddress'
      scrollToFirstError
      layout='vertical'
      validateTrigger='onBlur'
      initialValues={{
        saveAddress: true,
        state: "Tamilnadu",
        city: "Chennai",
      }}
    >
      <Form.Item
        name='mobileNo'
        rules={[
          {
            required: true,
            message: "Please enter mobileNumber!",
          },
        ]}
      >
        <StyledInput placeholder='Mobile Number' />
      </Form.Item>
      <Form.Item name='email'>
        <StyledInput placeholder='Email ID' />
      </Form.Item>
      <div className='text-sm font-semibold my-2'>
        <h2>Address</h2>
      </div>
      <Form.Item
        name='fname'
        rules={[
          {
            required: true,
            message: "Please input your First name!",
          },
        ]}
      >
        <StyledInput placeholder='First Name *' />
      </Form.Item>
      <Form.Item
        name='lname'
        rules={[
          {
            required: true,
            message: "Please input your Last name!",
          },
        ]}
      >
        <StyledInput placeholder='Last Name *' />
      </Form.Item>
      <Form.Item
        name='address1'
        rules={[
          {
            required: true,
            message: "Please input your Street Address!",
          },
        ]}
      >
        <StyledInput
          style={{ marginBottom: theme.space[0] }}
          placeholder='Street Address *'
        />
      </Form.Item>
      <Text>Ex: No.12, Mount Road</Text>
      <Form.Item
        name='address2'
        rules={[
          {
            required: false,
            message: "Please input your Street Address!",
          },
        ]}
      >
        <StyledInput
          style={{ marginBottom: theme.space[0] }}
          placeholder='Apartment, suite, etc. (optional)'
        />
      </Form.Item>
      <Text>Ex: B612, Presidium</Text>
      <Form.Item name='landMark'>
        <StyledInput placeholder='Landmark' />
      </Form.Item>
      <Form.Item
        name='pincode'
        type='number'
        rules={[
          {
            required: true,
            message: "Please input your Pincode!",
          },
        ]}
      >
        <StyledInput placeholder='Pincode *' type='number' />
      </Form.Item>
      <Form.Item
        name='city'
        rules={[
          {
            required: true,
            message: "Please input your City!",
          },
        ]}
      >
        <StyledInput placeholder='City *' />
      </Form.Item>
      <Form.Item
        name='state'
        rules={[
          {
            required: true,
            message: "Please input your State!",
          },
        ]}
      >
        <StyledInput placeholder='State *' />
      </Form.Item>
      <Form.Item name='saveAddress' valuePropName='checked'>
        <Checkbox>Save this address for future use</Checkbox>
      </Form.Item>
      <Divider className='divider' />
    </StyledForm>
  );
};

export default NewAddressPage;
