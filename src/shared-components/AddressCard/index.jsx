import React from "react";
import styled from "styled-components";
import { Radio } from "antd";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.notClickable ? "1fr" : "0.1fr 0.9fr"};
  padding: ${(props) => props.theme.space[5]};
  /* padding-bottom: ${(props) => props.theme.space[3]}; */
  background-color: ${(props) =>
    props.active ? props.theme.bg.secondary : props.theme.bg.default};
  cursor: pointer;

  .ant-radio-checked .ant-radio-inner {
    border-color: ${(props) => props.theme.colors.primary};
    ::after {
      background-color: ${(props) => props.theme.bg.primary};
    }
  }

  .right-container {
    p {
      margin: ${(props) => props.theme.space[3]} 0;
    }
    not(: last-child) {
      margin-bottom: ${(props) => props.theme.space[0]};
    }
  }
`;

const AddressCard = ({
  active = false,
  notClickable = false,
  address = {},
  onClick = () => {},
}) => {

  const handleClick = () => {
    if (!notClickable) onClick(address);
  };

  return (
    <Container
      active={active}
      notClickable={notClickable}
      onClick={handleClick}
    >
      {notClickable ? null : (
        <div>
          <Radio checked={active}></Radio>
        </div>
      )}

      <div className="right-container">
        <h6>{address.name}</h6>
        <p>{address.address}</p>
        <p> {`${address.city}, ${address.state}, ${address.pincode}`}</p>
        <p>{address.mobileNo}</p>
      </div>
    </Container>
  );
};

export default AddressCard;
