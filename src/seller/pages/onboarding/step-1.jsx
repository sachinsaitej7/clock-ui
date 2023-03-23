import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Typography, App } from "antd";

import { useOnboardingContext, useProfileContext } from "./context";

import {
  StyledInput,
  StyledStickyContainer,
  StyledButton,
} from "@seller/styled-components";
import { Container } from "./styled";
import UploadImages from "@seller/shared-components/UploadImages";

const Step1 = () => {
  const theme = useTheme();
  const { message } = App.useApp();
  const { nextStep } = useOnboardingContext();
  const { addUserProfile } = useProfileContext();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const createNewProfile = async () => {
    if (!name || !logo) {
      message.error("Please enter your profile name and logo.");
      return;
    }
    setLoading(true);
    try {
      await addUserProfile({ name, logo, description });
      nextStep();
    } catch (error) {
      console.log(error);
      message.error("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  const handleUploadImages = (images) => {
    if (images.length === 0) return;
    const logo = images[0].response?.downloadURL;
    setLogo(logo);
  };

  return (
    <>
      <Container>
        <Typography.Title level={3}>
          Add your Profile name and logo
        </Typography.Title>
        <Typography.Title level={5} style={{ opacity: 0.8 }}>
          Your Profile Name*
        </Typography.Title>
        <StyledInput
          type="text"
          placeholder="Please enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Typography.Title level={5} style={{ opacity: 0.8 }} className="my-4">
          Description
        </Typography.Title>
        <StyledInput
          type="text"
          placeholder="Please enter your status"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div style={{ marginTop: theme.space[8] }}>
          <Typography.Title level={5} style={{ opacity: 0.8 }}>
            Your Logo*
          </Typography.Title>
          <UploadImages limit={1} onSuccess={handleUploadImages} />
        </div>
      </Container>
      <StyledStickyContainer>
        <StyledButton
          onClick={createNewProfile}
          style={{
            margin: "0px",
          }}
          loading={loading}
        >
          Proceed to next step
        </StyledButton>
      </StyledStickyContainer>
    </>
  );
};

export default Step1;
