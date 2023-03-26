import React from "react";
import { Typography } from "antd";

import { useOnboardingContext } from "./context";
import { StyledButton, StyledStickyContainer } from "@seller/styled-components";

const Step0 = () => {
  const { nextStep } = useOnboardingContext();

  return (
    <>
      <Typography.Title level={3} className='text-center'>
        Let’s start by setting up your profile
      </Typography.Title>
      <StyledStickyContainer>
        <StyledButton onClick={nextStep} className='m-0'>
          Setup Profile
        </StyledButton>
      </StyledStickyContainer>
    </>
  );
};

export default Step0;
