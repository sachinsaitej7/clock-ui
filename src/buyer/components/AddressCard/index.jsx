import React from "react";
import styled, { useTheme } from "styled-components";
import { Radio, Card } from "antd";

const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.active ? props.theme.bg.secondary : props.theme.bg.default};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const AddressCard = ({ active = false, address = {}, onClick = () => {} }) => {
  const theme = useTheme();
  return (
    <StyledCard
      className="w-full cursor-pointer my-4"
      active={active}
      onClick={() => onClick(address)}
      title={address.name}
      extra={<Radio checked={active} onChange={() => onClick(address)}></Radio>}
      bodyStyle={{
        padding: theme.space[5],
      }}
      headStyle={{
        padding: theme.space[5],
      }}
    >
      <div className="right-container">
        <p>{address.address}</p>
        <p> {`${address.city}, ${address.state}, ${address.pincode}`}</p>
        <p>{address.mobileNo}</p>
      </div>
    </StyledCard>
  );
};

export default AddressCard;
