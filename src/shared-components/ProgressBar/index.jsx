import React from "react";
import styled from "styled-components";
import { Divider } from "antd";
import { CircleTag } from "../atoms";

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  max-width: 156px;
  min-width: 100px;
  border-top: 2px solid
    ${(props) => (props.active ? props.theme.colors.primary : "#292929")};
  opacity: ${(props) => (props.active ? 1 : 0.12)};
`;

const Title = styled.p`
  max-width: 100px;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[1]};
  line-height: 18px;
  margin-left: ${(props) => props.step * 40}% !important;
`;

const ProgressBar = ({ currentStep = 1, items = [] }) => {
  const currentItem = items[currentStep - 1] || "";
  return (
    <>
      <FlexBox>
        {items.map((item, index) => {
          return (
            <>
              <CircleTag
                key={index}
                title={index + 1}
                active={currentStep >= index + 1}
              />
              {index !== items.length - 1 && (
                <StyledDivider active={currentStep > index + 1} />
              )}
            </>
          );
        })}
      </FlexBox>
      {currentItem && (
        <FlexBox>
          <Title step={currentStep - 1}>{currentItem.title}</Title>
        </FlexBox>
      )}
    </>
  );
};

export default ProgressBar;
