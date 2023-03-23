import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Divider, Skeleton } from "antd";
import { useBrand } from "../hooks";

export const BrandContainer = styled.div`
  margin: ${(props) => props.theme.space[5]} 0px;
  padding: ${(props) => props.theme.space[5]} 0px;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 4px 16px rgba(41, 41, 41, 0.05);
  border: 1px solid rgba(41, 41, 41, 0.12);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  h2 {
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }

  img {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: ${(props) => props.theme.borderRadius[2]};
    margin-bottom: ${(props) => props.theme.space[3]};
  }

  p {
    font-size: ${(props) => props.theme.fontSizes[0]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    margin: ${(props) => props.theme.space[2]};
    opacity: 0.5;
  }

  .ant-divider-horizontal {
    margin: ${(props) => props.theme.space[3]} 0px;
  }
`;

const BrandCard = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [brandData, brandLoading] = useBrand(id);

  if (brandLoading)
    return (
      <div className="flex flex-col items-center my-5">
        <Skeleton.Avatar shape="square" active className="my-4" size={56} />
        <Skeleton active title={null} paragraph={{ rows: 3 }} />
      </div>
    );

  return (
    <BrandContainer className="flex flex-col items-center">
      <img src={brandData?.logo} alt={brandData?.name} />
      <h2 className="my-2">{brandData?.name}</h2>
      <Divider />
      <p>Free delivery by Clock on orders</p>
      <p>1 hour delivery for select locations *</p>
    </BrandContainer>
  );
};

export default BrandCard;
