import React from "react";
import styled from "styled-components";

import BrandCard from "../BrandCard";

const CardsContainer = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.white};
  overflow-x: auto;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.h4`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[5]};
  margin: ${(props) => props.theme.space[4] + " 0px 0px"};
  line-height: 24px;
`;

const BrandCarousal = ({ noTitle = false, data = [], onClick = () => {} }) => {
  return (
    <div>
      <Header>Available Brands</Header>
      <CardsContainer>
        {data.map((card) => {
          return (
            <BrandCard
              key={card.id}
              {...card}
              noTitle={noTitle}
              onClick={onClick(card.id)}
            />
          );
        })}
      </CardsContainer>
    </div>
  );
};

export default BrandCarousal;
