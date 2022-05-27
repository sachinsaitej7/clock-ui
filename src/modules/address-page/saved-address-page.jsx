import React from "react";
import styled, { useTheme } from "styled-components";
import ProgressBar from "../../shared-components/ProgressBar";
import { Divider, Button } from "antd";

import TrustTags from "../../shared-components/TrustTags";
import AddressCard from "../../shared-components/AddressCard";

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

const ITEMS = [
  {
    title: "Select Delivery Address",
  },
  {
    title: "Review Order",
  },
  {
    title: "Success",
  },
];

const SaveAddressPage = ({
  address,
  activeAddress,
  setActiveAddress,
  setSearchParams,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <div style={{ padding: theme.space[3] + " " + theme.space[5] }}>
        <ProgressBar items={ITEMS} currentStep={1} />
      </div>

      <div style={{ padding: theme.space[3] + " " + theme.space[5] }}>
        <Divider className="divider" />
        <p className="address">Saved Address</p>
      </div>
      {address.map((item) => {
        return (
          <AddressCard
            key={item.id}
            address={item}
            active={item.id === activeAddress?.id}
            onClick={setActiveAddress}
          />
        );
      })}
      <div style={{ padding: theme.space[5] }}>
        <StyledButton onClick={() => setSearchParams({ new: true })}>
          Add New Address
        </StyledButton>
        <Divider className="divider" />
        <StyledButton
          type="primary"
          onClick={onClick}
          disabled={!activeAddress}
        >
          Continue
        </StyledButton>
        <TrustTags />
      </div>
    </Container>
  );
};

export default SaveAddressPage;
