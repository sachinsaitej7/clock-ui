import React from "react";
import styled from "styled-components";
import { Carousel, Image } from "antd";

import { ReactComponent as ArrowLeft } from "../../assets/common/arrow-right-bg.svg";
import { ReactComponent as ArrowRight } from "../../assets/common/arrow-left-bg.svg";

const Container = styled.div`
  /* padding: ${(props) => props.theme.space[5]}; */
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

  .ant-image{
    width: 100%;
  }

  .ant-image-img {
    width: 100%;
    max-height: 495px;
  }
`;

const ProductCarousal = ({ images = [] }) => {
  return (
    <Container>
      <StyledCarousel
        nextArrow={<ArrowLeft />}
        prevArrow={<ArrowRight />}
        arrows={true}
      >
        {images
          .filter((image) => image.url)
          .map((image, index) => {
            return (
              <Image
                key={image.url}
                src={image.url}
                alt={`slide number ${index}`}
              />
            );
          })}
      </StyledCarousel>
    </Container>
  );
};

export default ProductCarousal;
