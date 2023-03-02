import React from "react";
import { Card } from "antd";
import styled from "styled-components";

const CardContainer = styled(Card)`
  flex: 1 0 104px;
  overflow: hidden;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  height: 120px;
  width: 140px;
  padding: ${(props) => props.theme.space[5] + " " + props.theme.space[4]};
  background-color: ${(props) => props.theme.bg.default};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.borderRadius[1]};
  margin: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => `${props.theme.space[0]}`};
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-card-body {
    padding: 0px;
  }

  img {
    width: 117px;
    height: 65px;
  }

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
`;

const BrandCard = ({ name, image, noTitle, onClick }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
      onClick={onClick}
    >
      <CardContainer>
        <img src={image} alt={name} />
      </CardContainer>
    </div>
  );
};

export default BrandCard;
