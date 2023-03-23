import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Typography } from "antd";

import { useProfileContext } from "./context";

//images
import { ReactComponent as InfoIcon } from "@seller/assets/common/info-circle.svg";

import {
  StyledStickyContainer,
  StyledButton,
  ProfileNameContainer,
} from "@seller/styled-components";
import { StyledCard, Container } from "./styled";

const Step4 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { profile, updateUserProfile, profileLoading } = useProfileContext();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    try {
      setLoading(true);
      await updateUserProfile({ status: true });
      navigate("/seller");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Typography.Title level={3}>Profile summary</Typography.Title>
        <StyledCard
          title={
            profile && (
              <div>
                <ProfileNameContainer>
                  <img src={profile.logo} alt="logo" width="100px"></img>
                  <Typography.Title
                    level={5}
                    style={{
                      marginTop: theme.space[3],
                      marginLeft: theme.space[3],
                    }}
                  >
                    {profile.name}
                  </Typography.Title>
                </ProfileNameContainer>
              </div>
            )
          }
          style={{ width: "100%" }}
          loading={profileLoading}
        >
          <Typography.Text>{profile?.description}</Typography.Text>
        </StyledCard>
        <Typography.Text
          style={{
            marginTop: theme.space[3],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: theme.fontSizes[1],
            color: theme.text.light,
          }}
        >
          <InfoIcon width="16px" style={{ marginRight: theme.space[2] }} />
          You can always edit these details in settings
        </Typography.Text>
      </Container>
      <StyledStickyContainer>
        <StyledButton
          onClick={handleNext}
          style={{
            margin: "0px",
          }}
          loading={loading || profileLoading}
        >
          Complete Profile Setup
        </StyledButton>
      </StyledStickyContainer>
    </>
  );
};

export default Step4;
