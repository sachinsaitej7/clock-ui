import React from "react";
import styled from "styled-components";
import Category1 from "../../assets/home/category-1.svg";
import Category2 from "../../assets/home/category-2.svg";

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  position: relative;
  padding: ${(props) => props.theme.space[5] + " 0px"};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledCategoryCard = styled.div`
  margin-right: ${(props) => props.theme.space[4]};
  text-align: center;
  .category-card-image {
    height: 160px;
    width: 118px;
    background-size: cover;
    border-radius: 4px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        rgba(210, 218, 225, 0) 80%,
        rgba(0, 0, 0, 0.85) 99%
      ),
      url(${(props) => props.imageUrl});
    position: relative;
    p {
      color: ${(props) => props.theme.text.white};
      font-size: ${(props) => props.theme.fontSizes[2]};
      font-weight: ${(props) => props.theme.fontWeights.bold};
      letter-spacing: 0.02em;
      line-height: 18px;
      position: absolute;
      bottom: ${(props) => props.theme.space[3]};
      opacity: 1;
      left: 50%;
      transform: translate(-50%, 0%);
    }
  }
`;

const CategoryCard = ({ name, image, index }) => {
  return (
    <StyledCategoryCard imageUrl={!!index ? Category1 : Category2}>
      <div className="category-card-image">
        <p>{name}</p>
      </div>
    </StyledCategoryCard>
  );
};

const CategoryCarousal = ({ Header = null, data = [], onClick = () => {} }) => {
  return (
    <div>
      {Header}
      <CardsContainer>
        {data.map((card, index) => {
          return (
            <CategoryCard
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

export default CategoryCarousal;
