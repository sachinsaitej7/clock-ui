import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Input, Button } from "antd";
import isEmpty from "lodash/isEmpty";

//images
import {
  CheckBadgeIcon,
  ReceiptIcon,
  ExclamationCircleIcon,
} from "@assets/icons";
import { TruckIcon } from "@buyer/assets/icons";

import { usePincodeCheck } from "../hooks";

const StyledInput = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius[1]};
  margin: ${(props) => props.theme.space[3]} 0px;
  &.ant-input-affix-wrapper {
    padding: ${(props) => props.theme.space[3]}
      ${(props) => props.theme.space[4]};
  }
  :focus,
  :active,
  &:hover,
  .ant-input-affix-wrapper:hover {
    outline: none;
  }
`;

const CheckTag = styled(Button)`
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  line-height: 120%;

  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  height: ${(props) => props.theme.space[7]};
`;

const TextContainer = styled.div`
  font-size: ${(props) => props.theme.fontSizes[1]};
  line-height: 16px;
  padding: ${(props) => props.theme.space[2]} 0px;

  p.not-found {
    color: #f69246;
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }

  svg {
    width: 24px;
    height: 24px;
    display: inline-block;
    padding: ${(props) => props.theme.space[1]};
    margin-right: ${(props) => props.theme.space[2]};
  }
`;

const PincodeTextContainer = ({ data }) => {
  const theme = useTheme();

  if (isEmpty(data))
    return (
      <TextContainer>
        <p className="not-found">
          <ExclamationCircleIcon />
          We do not deliver to this location yet
        </p>
      </TextContainer>
    );
  const pincodeData = data[0];

  return (
    <TextContainer>
      {pincodeData["delivery time"] && (
        <p>
          <TruckIcon />
          Get this product{" "}
          <span
            style={{
              color: theme.colors.primary,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            {pincodeData["delivery time"] > 240
              ? `Same day`
              : pincodeData["delivery time"] > 60
              ? `${Math.ceil(pincodeData["delivery time"] / 60)} hours, `
              : `${pincodeData["delivery time"]} minutes`}
          </span>{" "}
          if ordered before 5 PM
        </p>
      )}
      {pincodeData.cod && (
        <p>
          <CheckBadgeIcon />
          Eligible for{" "}
          <span
            style={{
              color: theme.colors.primary,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            Cash on Delivery
          </span>
        </p>
      )}
      {pincodeData["free delivery"] && (
        <p>
          <ReceiptIcon />
          Free Delivery On All Orders
        </p>
      )}
    </TextContainer>
  );
};

const PincodeChecker = () => {
  const theme = useTheme();
  const inputRef = useRef(null);
  const [pincode, setPincode] = useState(+localStorage.getItem("pincode"));
  const [data, loading] = usePincodeCheck(pincode);

  const handleClick = () => {
    const pincode = +inputRef.current?.input.value;
    pincode && setPincode(pincode);
  };

  useEffect(() => {
    return () => {
      !isEmpty(data) && localStorage.setItem("pincode", pincode);
    };
  }, []);

  return (
    <div>
      <div>
        <label
          style={{
            fontSize: theme.fontSizes[2],
            color: theme.text.dark,
          }}
          className="my-4"
        >
          Delivery Options
        </label>
        <StyledInput
          suffix={
            <CheckTag
              type="primary"
              className="bg-primary"
              onClick={handleClick}
              loading={loading}
            >
              Check
            </CheckTag>
          }
          placeholder="Enter your PIN code"
          defaultValue={pincode}
          type="number"
          ref={inputRef}
          maxLength={6}
        />
      </div>
      {pincode && !loading ? (
        <PincodeTextContainer data={data} />
      ) : (
        <p className="text-xs">
          Please enter your PIN code to check delivery options
        </p>
      )}
    </div>
  );
};

export default PincodeChecker;
