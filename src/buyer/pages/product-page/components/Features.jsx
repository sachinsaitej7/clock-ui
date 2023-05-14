import React from "react";
import styled from "styled-components";
import { TruckIcon } from "@buyer/assets/icons";
import { CheckBadgeIcon, ArrowPathIcon } from "@assets/icons";

const Container = styled.div`
  text-align: center;
  p {
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 120%;
    color: ${(props) => props.theme.text.dark};
  }
`;

const Features = ({ type }) => {
  if (type === "place") return null;
  return (
    <Container className='flex items-center justify-around text-primary'>
      <div className='flex flex-col items-center'>
        <TruckIcon width='32px' />
        <p className='my-2'>Free delivery on all orders</p>
      </div>
      <div className='flex flex-col items-center'>
        <ArrowPathIcon width='32px' />
        <p className='my-2'>7 day return & exchange</p>
      </div>
      <div className='flex flex-col items-center'>
        <CheckBadgeIcon width='32px' />
        <p className='my-2'>100% genuine products</p>
      </div>
    </Container>
  );
};

export default Features;
