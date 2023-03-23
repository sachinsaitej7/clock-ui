import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Carousel, Image, Skeleton } from "antd";

import { useProductImages } from "../hooks";

const StyledCarousel = styled(Carousel)`
  .ant-image {
    width: 100%;
  }

  .ant-image-img {
    width: 100%;
    max-height: 445px;
  }
`;

const ProductCarousal = () => {
  const [searchParams] = useSearchParams();
  const [productImages, loading] = useProductImages(searchParams.get("id"));

  if (loading)
    return <Skeleton.Image active style={{ width: 329, height: 440 }} />;

  return (
    <StyledCarousel autoplay autoplaySpeed={3000}>
      {productImages
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
  );
};

export default ProductCarousal;
