import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import moment from "moment";
import { Typography } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "@firebase-app";
import { useProductsByProfileId, useUserProfile } from "./hooks";
import { PageContainer } from "@seller/styled-components";
import Spinner from "@seller/shared-components/Spinner";
import { CalendarDaysIcon } from "@assets/icons";
import { ReactComponent as Add } from "@seller/assets/common/plus-circle-filled.svg";
import AddNew from "./add-new";
import Products from "./products";
import {
  StyledStickyFloater,
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
    color: ${(props) => props.theme.text.light};
    margin: ${(props) => props.theme.space[2]} 0px;
    span {
      color: ${(props) => props.theme.text.dark};
      font-weight: ${(props) => props.theme.fontWeights.semibold};
      display: inline-block;
      margin: 0px ${(props) => props.theme.space[1]};
    }
  }
  .name {
    h5 {
      margin: ${(props) => props.theme.space[4]} 0px;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = getFirebase();
  const [user] = useAuthState(auth);
  const [profile, profileLoading] = useUserProfile(user.uid);
  const [products, productLoading] = useProductsByProfileId(user.uid);
  const [addNew, setAddNew] = React.useState(false);

  useEffect(() => {
    if (!profileLoading && !profile?.status) navigate("/seller/onboarding");
  }, [navigate, profile, profileLoading, user]);

  if (profileLoading || productLoading)
    return (
      <StyledContainer>
        <Spinner />
      </StyledContainer>
    );

  if (addNew) return <AddNew profile={profile} setAddNew={setAddNew} />;

  if (!profile) return null;

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
            <img src={profile.logo} alt="logo"></img>
            <div className="name">
              <Typography.Title level={5}>{profile.name}</Typography.Title>
            </div>
            <p>
              <span>
                {profile.followers?.count > 0 ? profile.followers?.count : 0}
              </span>{" "}
              followers
              <span
                style={{
                  margin: `0px ${theme.space[3]}`,
                  width: "4px",
                  height: "4px",
                  background: "#D9D9D9",
                  borderRadius: "50%",
                  verticalAlign: "middle",
                }}
              ></span>
              <span>{products.length || 0}</span> listed products
            </p>
            <p>{profile.description || "No Description"}</p>
            <div
              style={{
                color: theme.text.light,
                fontSize: theme.fontSizes[2],
                display: "flex",
                alignContent: "center",
              }}
            >
              <CalendarDaysIcon width="14px" />
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
      <StyledStickyFloater>
        <Add
          style={{ color: theme.colors.primary }}
          onClick={() => setAddNew(true)}
        />
      </StyledStickyFloater>
    </StyledContainer>
  );
};

export default HomePage;
