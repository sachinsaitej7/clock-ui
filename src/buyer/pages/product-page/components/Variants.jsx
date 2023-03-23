import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import styled, { useTheme } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Skeleton, Divider, Typography, App } from "antd";

import { useProductVariants } from "../hooks";
import { useProductContext } from "../store/ProductProvider";

const OneSizeTag = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.borderRadius[1]};
  color: ${({ theme }) => theme.text.dark};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 120%;
  height: 28px;
`;

const OtherTags = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  line-height: 120%;
  height: 28px;
  width: 28px;
  &.active {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const Variants = () => {
  const theme = useTheme();
  const { message } = App.useApp();
  const [searchParams] = useSearchParams();
  const [productVariants, loading] = useProductVariants(searchParams.get("id"));
  const { variant, setVariant } = useProductContext();

  useEffect(() => {
    if (productVariants?.length > 0) {
      setVariant(productVariants[0]);
    }
  }, [productVariants]);

  if (loading)
    return (
      <>
        <h5 style={{ color: theme.text.light }}>Available Sizes</h5>
        <Skeleton.Avatar active className="m-2" shape="square" />
        <Skeleton.Avatar active className="m-2" shape="square" />
        <Divider className="my-4 border-t-8 w-[120%] -ml-[10%]" />
      </>
    );

  if (isEmpty(productVariants)) return null;

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h5 style={{ color: theme.text.light }}>Available Sizes</h5>
          <Typography.Text
            className="text-primary font-semibold cursor-pointer"
            onClick={() => message.info("Coming soon...")}
          >
            Size Guide
          </Typography.Text>
        </div>
        <div className="flex items-center justify-start my-2">
          {productVariants.map((v) => {
            const { values } = v.size || {};
            if (values === "One Size") {
              return (
                <OneSizeTag
                  key={v.id}
                  className="flex items-center justify-center p-2 mr-2"
                >
                  <p>{values}</p>
                </OneSizeTag>
              );
            } else {
              return (
                <OtherTags
                  key={v.id}
                  className={`flex items-center justify-center p-2 mr-2 ${
                    variant?.id === v.id ? "active" : ""
                  }`}
                  onClick={() => setVariant(v)}
                >
                  <p>{values}</p>
                </OtherTags>
              );
            }
          })}
        </div>
      </div>
      <Divider className="my-4 border-t-8 w-[120%] -ml-[10%]" />
    </>
  );
};

export default Variants;
