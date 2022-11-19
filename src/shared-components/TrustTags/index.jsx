import React from "react";
import styled from "styled-components";

//images
import { ReactComponent as VerifyIcon } from "../../assets/product/verify.svg";
import { ReactComponent as ReceiptIcon } from "../../assets/product/receipt.svg";
import { ReactComponent as TruckIcon } from "../../assets/product/truck-fast.svg";

const Container = styled.div``;

const Tag = styled.p`
  margin: ${(props) => props.theme.space[5]} 0px !important;
  font-size: ${(props) => props.theme.fontSizes[1]};
  line-height: 16px;
  color: ${(props) => props.theme.text.light};

  svg {
    width: 20px;
    height: 20px;
    margin-right: ${(props) => props.theme.space[2]};
  }
`;

const TrustTags = (props) => {
  return (
    <Container>
      <Tag>
        <VerifyIcon />
        Original Products
      </Tag>
      <Tag>
        <TruckIcon />
        Order before 5 PM for same day delivery
      </Tag>
      <Tag>
        <ReceiptIcon /> Free Delivery On All Orders
      </Tag>
    </Container>
  );
};

export default TrustTags;
