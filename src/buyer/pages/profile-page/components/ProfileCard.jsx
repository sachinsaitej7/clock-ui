import React, { useEffect } from "react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Typography, Skeleton, Avatar, App, Button } from "antd";

import { CalendarDaysIcon } from "@assets/icons";
import ProfilesList from "./ProfilesList";
import { StyledButton } from "../styled";
import {
  useUserProfile,
  useUserFollower,
  useProductsByProfile,
} from "../hooks";

const ProfileImage = ({ loading, logo }) => {
  if (loading) return <Skeleton.Avatar shape="circle" />;
  return (
    <Avatar
      src={logo}
      alt="logo"
      size={64}
      className="-mt-14 border-primary border-2	"
    />
  );
};

const ProfileContainer = styled.div``;

const FollowButton = () => {
  const { message } = App.useApp();
  const [searchParams] = useSearchParams();
  const { isFollowing, addFollow, removeFollow, loading, error } =
    useUserFollower(searchParams.get("id"));

  useEffect(() => {
    if (error) message.error(error.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isFollowing) {
    return (
      <StyledButton
        size="small"
        onClick={() => removeFollow()}
        loading={loading}
        className="font-semibold text-primary"
      >
        Following
      </StyledButton>
    );
  } else {
    return (
      <StyledButton
        type="primary"
        size="small"
        onClick={() => addFollow()}
        loading={loading}
        className="bg-primary font-semibold"
      >
        Follow
      </StyledButton>
    );
  }
};

const ProfileDetails = ({
  name,
  followers,
  productsCount,
  description,
  createdAt,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <ProfilesList open={open} setOpen={setOpen} />
      <div>
        <div className="flex justify-between items-center">
          <Typography.Title
            style={{ marginBottom: 0 }}
            level={4}
            className="mb-0"
          >
            {name}
          </Typography.Title>
          <FollowButton />
        </div>
        <div
          className="flex justify-start items-center my-1"
          style={{
            color: theme.text.light,
            fontSize: theme.fontSizes[1],
            lineHeight: "120%",
          }}
        >
          <p>
            <strong className="text-black">
              {followers?.count > 0 ? followers?.count : 0}
            </strong>{" "}
            <span>followers</span>
          </p>
          <p className="mx-2 w-1 h-1 bg-[#D9D9D9] rounded-full inline-block align-middle"></p>
          <p>
            <strong className="text-black">{productsCount || 0}</strong> listed
            products
          </p>
        </div>
        <p className="my-1">{description || "No Description"}</p>
        <div
          style={{
            color: theme.text.light,
            fontSize: theme.fontSizes[2],
          }}
          className="flex items-center"
        >
          <CalendarDaysIcon width="14px" />
          <span className="ml-1">{`Seller since ${moment(
            createdAt.toDate()
          ).format("MMMM YYYY")}`}</span>
        </div>
        <Button
          size="small"
          className="text-primary mt-1"
          onClick={() => setOpen(true)}
        >
          Other Profiles
        </Button>
      </div>
    </div>
  );
};

const ProfileCard = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [profileData, profileLoading] = useUserProfile(id);
  const [products = []] = useProductsByProfile(id);
  const productsCount = products.length;

  if (profileLoading)
    return (
      <div className="-mt-14">
        <Skeleton.Avatar shape="circle" className="my-4" active size={64} />
        <Skeleton active />
      </div>
    );

  return (
    <ProfileContainer>
      <ProfileImage loading={profileLoading} logo={profileData.logo} />
      <ProfileDetails {...profileData} productsCount={productsCount} />
    </ProfileContainer>
  );
};

export default ProfileCard;
