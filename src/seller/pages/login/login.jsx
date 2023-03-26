import React from "react";
import styled, { useTheme } from "styled-components";
import { Typography } from "antd";

import { SparklesIcon } from "@assets/icons";
import { StyledButton } from "@seller/styled-components";
import { SellerBackground } from "@seller/assets/images/login";

const Container = styled.div``;

const Masonry = styled.div`
  height: 48vh;
  max-height: 400px;
  position: relative;

  background-image: url(${SellerBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Login = ({ handleClick }) => {
  const theme = useTheme();
  return (
    <Container className='pb-12'>
      <Typography.Title
        level={3}
        style={{
          fontWeight: theme.fontWeights.bold,
          color: theme.text.primary,
          fontFamily: "Crimson Pro",
        }}
        className='my-2 font-bold'
      >
        <SparklesIcon width='24px' className='inline' /> Introducing Shop & Sell
      </Typography.Title>
      <Typography.Text
        type='secondary'
        className='text-base my-4 block'
        style={{ color: theme.text.white }}
      >
        Setup your profile and start earning by listing products from our
        partner stores.
      </Typography.Text>
      <Masonry className='my-4'></Masonry>
      <StyledButton
        type='primary'
        onClick={handleClick}
        className='w-full bg-primary mt-4'
      >
        Sign Up & Setup Profile
      </StyledButton>
      <StyledButton
        type='outline'
        onClick={handleClick}
        className='w-full border-primary text-primary bg-transparent my-2'
      >
        Log In
      </StyledButton>
    </Container>
  );
};

export default Login;
