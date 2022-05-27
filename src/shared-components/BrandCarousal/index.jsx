import React from "react";
import styled, { useTheme } from "styled-components";

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

const Header = styled.h5`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[3]};
  margin: ${(props) => `${props.theme.space[5]} 0px`};
`;

const BrandCarousal = ({ noTitle = false, data = [], onClick = () => {} }) => {
  const theme = useTheme();
  return (
    <div style={{ textAlign: "center", padding: `${theme.space[3]} 0px` }}>
      {!noTitle && <Header>Our Brands</Header>}
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
