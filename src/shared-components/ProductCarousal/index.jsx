import React from "react";
import styled from "styled-components";
import { Carousel } from "antd";

import { ReactComponent as ArrowLeft } from "../../assets/common/arrow-right-bg.svg";
import { ReactComponent as ArrowRight } from "../../assets/common/arrow-left-bg.svg";

const Container = styled.div`
  /* padding: ${(props) => props.theme.space[5]}; */
`;

const Image = styled.img`
  width: 380px;
  max-height: 464px;
  @media (min-width: 424px) {
    width: 100%;
    max-height: 500px;
  }
`;

const StyledCarousel = styled(Carousel)`
  .slick-prev {
    left: ${(props) => props.theme.space[3]};
    width: 32px;
    height: 32px;
    z-index: 10;
  }
  .slick-next {
    right: ${(props) => props.theme.space[3]};
    width: 32px;
    height: 32px;
  }
`;

const ProductCarousal = ({ images=[]}) => {
  return (
    <Container>
      <StyledCarousel
        nextArrow={<ArrowLeft />}
        prevArrow={<ArrowRight />}
        arrows={true}
      >
        {images.filter(image => image?.image).map((image, index) => {
          return (
            <Image
              key={image.id}
              src={image.image}
              alt={`slide number ${index}`}
            />
          );
        })}
      </StyledCarousel>
    </Container>
  );
};

export default ProductCarousal;
