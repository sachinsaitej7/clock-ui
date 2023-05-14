import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import moment from "moment";
import { Typography, App } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "@firebase-app";
import {
  useProductsByProfileId,
  useUserProfile,
  useGetUserLocation,
} from "./hooks";
import { PageContainer } from "@seller/styled-components";
import { Spinner } from "@components";
import { CalendarDaysIcon } from "@assets/icons";
import AddNew from "./add-new";
import AddNewPlace from "./add-new-place";
import Products from "./products";

import { AddDescription, ProfilesList, FloatButton } from "./components";
import {
  ProfileNameContainer,
} from "@seller/styled-components";

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
`;

const StyledNameContainer = styled(ProfileNameContainer)`
  display: block;
  padding: ${(props) => props.theme.space[5]};
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-top: -48px;
    border: 2px solid ${(props) => props.theme.bg.primary};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes[2]};
    margin: ${(props) => props.theme.space[2]} 0px;
  }
  .name {
    margin: ${(props) => props.theme.space[3]} 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const HomePage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = getFirebase();
  const [user] = useAuthState(auth);
  const [profile, profileLoading] = useUserProfile(user.uid);
  const [, productLoading] = useProductsByProfileId(user.uid);
  const [addNew, setAddNew] = React.useState(false);
  const [addNewPlace, setAddPlace] = React.useState(false);
  const [, , locationError] = useGetUserLocation();

  const handleAddNew = (type) => {
    if (locationError)
      return message.error("Please allow location access and refresh the page");
    type === 'product' && setAddNew(true);
    type === 'place' && setAddPlace(true);
  };

  useEffect(() => {
    if (!profileLoading && !profile?.status) navigate("/seller/onboarding");
  }, [navigate, profile, profileLoading, user]);

  if (profileLoading || productLoading)
    return (
      <StyledContainer>
        <Spinner />
      </StyledContainer>
    );
  if (!profile) return null;

  if (addNew) return <AddNew profile={profile} setAddNew={setAddNew} />;
  if (addNewPlace)
    return <AddNewPlace profile={profile} setAddPlace={setAddPlace} />;

  return (
    <StyledContainer>
      <div>
        <div>
          <div
            style={{
              height: "84px",
              backgroundColor: theme.bg.primary,
            }}
          ></div>
          <StyledNameContainer>
            <img src={profile.logo} alt='logo'></img>
            <div className='name'>
              <Typography.Title level={5}>{profile.name}</Typography.Title>
              <Typography.Text type='secondary'>
                {profile.userName ? `@${profile.userName}` : ""}
              </Typography.Text>
            </div>
            <ProfilesList profile={profile} />
            <AddDescription profile={profile} />
            <div
              style={{
                color: theme.text.light,
                fontSize: theme.fontSizes[2],
                display: "flex",
                alignContent: "center",
              }}
            >
              <CalendarDaysIcon width='14px' />
              <span
                style={{ marginLeft: theme.space[3] }}
              >{`Seller since ${moment(profile.createdAt.toDate()).format(
                "MMMM YYYY"
              )}`}</span>
            </div>
          </StyledNameContainer>
        </div>
        <Products />
      </div>
      <FloatButton handleAddNew={handleAddNew} />
    </StyledContainer>
  );
};

export default HomePage;
