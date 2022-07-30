import React from "react";
import styled, { useTheme } from "styled-components";
import Saree1 from "../../assets/home/saree-1.svg";
import Saree2 from "../../assets/home/saree-2.svg";

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  position: relative;
  padding: ${(props) => props.theme.space[5] + " 0px"};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CollectionCard = ({ name, image, index }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        marginRight: theme.space[4],
        borderRadius: "4px",
        textAlign: "center",
      }}
    >
      <img
        width="150px"
        height="200px"
        src={!!index ? Saree1 : Saree2}
        alt="Saree1"
      ></img>
      <p
        style={{
          lineHeight: "18px",
          margin: theme.space[2] + " 0px",
          color: theme.text.dark,
          opacity: 1,
        }}
      >
        {name}
      </p>
    </div>
  );
};

const CollectionCarousal = ({
  Header = null,
  data = [],
  onClick = () => {},
}) => {
  return (
    <div>
      {Header}
      <CardsContainer>
        {data.map((card, index) => {
          return (
            <CollectionCard
              {...card}
              index={index}
              key={card.id}
              onClick={() => onClick(card.id)}
            />
          );
        })}
      </CardsContainer>
    </div>
  );
};

export default CollectionCarousal;
