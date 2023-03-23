import React, { useState, useContext, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import { Input, Button } from "antd";

//images
import { ReactComponent as TruckIcon } from "../../assets/product/truck-fast.svg";
import { ReactComponent as Information } from "../../assets/product/information.svg";
import { ReactComponent as ReceiptIcon } from "../../assets/product/receipt.svg";
import { ReactComponent as MoneyTick } from "../../assets/common/money-tick.svg";
import { AuthContext } from "../../../app/store/AuthProvider";

const StyledInput = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius[1]};
  border: 1px solid ${(props) => props.theme.colors.primary};
  &.ant-input-affix-wrapper {
    padding: ${(props) => props.theme.space[3]}
      ${(props) => props.theme.space[4]};
  }
  :focus,
  :active,
  &:hover,
  .ant-input-affix-wrapper:hover {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary} !important;
  }
`;

const CheckTag = styled(Button)`
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  line-height: 16px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.text.white};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  cursor: pointer;
  border: none;
  height: ${(props) => props.theme.space[7]};
  :focus,
  :active,
  :hover {
    outline: none;
    color: ${(props) => props.theme.text.white};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const TextContainer = styled.div`
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 16px;
    padding: ${(props) => props.theme.space[4]} 0px 0px};

    p.not-found {
        color: #F69246;
        font-weight: ${(props) => props.theme.fontWeights.bold};
    }

    svg {
        width: 24px;
        padding: ${(props) => props.theme.space[1]};
        margin-right: ${(props) => props.theme.space[2]};
    }
`;

const PincodeTextContainer = ({ data }) => {
  const theme = useTheme();

  return (
    <TextContainer>
      {data === undefined && (
        <p className="not-found">
          <Information /> We do not deliver to this location yet
        </p>
      )}
      {data?.delivery_time && (
        <p>
          <TruckIcon />
          Get this product in{" "}
          <span
            style={{
              color: theme.colors.primary,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            {data.delivery_time > 240
              ? `one day`
              : data.delivery_time > 60
              ? `${Math.ceil(data.delivery_time / 60)} hours, `
              : `${data.delivery_time} minutes`}
          </span>{" "}
          if ordered before 5 PM
        </p>
      )}
      {data?.cod && (
        <p>
          <MoneyTick />
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
      {data?.free_delivery && (
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
  const [pincode, setPincode] = useState(localStorage.getItem("pincode"));
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { fetchPincodeData } = useContext(AuthContext);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPincodeData(pincode);
      setData(data);
      data
        ? localStorage.setItem("pincode", pincode)
        : localStorage.removeItem("pincode");
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    pincode && handleClick();
  }, []);

  return (
    <div>
      <div>
        <label
          style={{
            fontSize: theme.fontSizes[1],
            color: theme.text.dark,
            marginBottom: theme.space[2],
          }}
        >
          Delivery Options
        </label>
        <StyledInput
          suffix={
            <CheckTag onClick={() => handleClick()} loading={isLoading}>
              Check
            </CheckTag>
          }
          placeholder="Enter your PIN code"
          onChange={(e) => {
            setPincode(e.target.value);
          }}
          type="number"
          value={pincode}
          maxLength={6}
        />
      </div>
      {data === null ? null : <PincodeTextContainer data={data} />}
    </div>
  );
};

PincodeChecker.TextContainer = PincodeTextContainer;

export default PincodeChecker;
