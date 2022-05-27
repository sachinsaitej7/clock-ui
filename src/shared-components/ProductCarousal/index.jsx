import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

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

const ProductCarousal = ({ images=[]}) => {
  return (
    <Container>
      <Carousel nextIcon={<ArrowLeft />} prevIcon={<ArrowRight />}>
        {images.map((image, index) => {
          return (
            <Carousel.Item key={image.id}>
              <Image
                src={image.image}
                alt={`slide number ${index}`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default ProductCarousal;
