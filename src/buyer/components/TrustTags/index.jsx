import React from "react";
import styled from "styled-components";

//images
import { CheckBadgeIcon, ReceiptIcon } from "@assets/icons";
import { TruckIcon } from "@buyer/assets/icons";

const Container = styled.div``;

const Tag = styled.p`
  margin: ${(props) => props.theme.space[5]} 0px;
  font-size: ${(props) => props.theme.fontSizes[1]};
  line-height: 120%;
  color: ${(props) => props.theme.text.light};
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 20px;
    height: 20px;
    margin-right: ${(props) => props.theme.space[2]};
  }
`;

const TrustTags = () => {
  return (
    <Container>
      <Tag>
        <CheckBadgeIcon />
        Original Products
      </Tag>
      <Tag>
        <TruckIcon />
        Order before 5 PM for same day delivery
      </Tag>
      <Tag>
        <ReceiptIcon />
        Free Delivery On All Orders
      </Tag>
    </Container>
  );
};

export default TrustTags;
