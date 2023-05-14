import React from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../hooks";
import { Button } from "antd";

const StyledButton = styled(Button)`
  box-shadow: none;
  border-radius: 8px;
  height: 42px;

  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[3]};
  line-height: 120%;
`;

const VisitButton = () => {
  const [searchParams] = useSearchParams();
  const [product, loading] = useProduct(searchParams.get("id"));

  if (loading) return <Skeleton active className='my-4' />;
  if (!product?.location) return null;

  const { latitude, longitude } = product.location;
  // open google maps with the location
  const handleVisitStore = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    );
  };
  return (
    <StyledButton
      type='primary'
      className='w-full bg-primary my-2'
      onClick={handleVisitStore}
    >
      Visit Store
    </StyledButton>
  );
};

export default VisitButton;
