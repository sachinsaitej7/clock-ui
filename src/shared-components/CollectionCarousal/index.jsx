import React from "react";
import styled, { useTheme } from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  position: relative;
  padding: ${(props) => props.theme.space[5] + " 0px"};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CollectionCard = ({ name, image, onClick }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        marginRight: theme.space[4],
        borderRadius: theme.borderRadius[1],
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        style={{ borderRadius: theme.borderRadius[1] }}
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
