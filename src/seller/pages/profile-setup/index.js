import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Typography, Input, App } from "antd";

import { StyledStickyContainer, StyledButton } from "@seller/styled-components";
import { UploadImages } from "@seller/components";
import { SellerBackgroundHalf } from "@seller/assets/images/profile-setup";

import { useAddUserProfile, useCheckUserName } from "./hooks";

const Masonry = styled.div`
  height: 25vh;
  max-height: 250px;
  background-image: url(${SellerBackgroundHalf});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ProfileSetup = () => {
  const { message } = App.useApp();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const [userNameCheck, userCheckLoading, error] = useCheckUserName(userName);
  const [addUserProfile, loading, errorCreation] = useAddUserProfile();

  useEffect(() => {
    if (errorCreation) {
      message.error("Profile Creation failed. Please try again later.");
    }
  }, [errorCreation, message]);

  const handleAddUserProfile = async () => {
    if (!name || !userName) {
      message.error("Please enter your profile name and username.");
      return;
    }
    if (!userName || userNameCheck || userCheckLoading || error) return;
    await addUserProfile({ name, profileImage, userName });
    navigate("/seller");
  };

  const handleUploadImages = (images) => {
    if (!images?.length) return;
    const logo = images[0].response?.downloadURL;
    setProfileImage(logo);
  };

  return (
    <div className='p-4 pt-0'>
      <div className='text-center'>
        <Masonry className='mb-4'></Masonry>
        <h1 className='text-xl font-semibold'>Setup your Public Profile</h1>
        <p className='text-sm text-gray-400'>
          Add your name, profile picture and your user ID using which people
          will identify you on the app
        </p>
      </div>
      <div className='mt-4'>
        <Input
          placeholder='Full Name*'
          className='mb-4 h-10'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='username *'
          className='h-10'
          prefix='@'
          onBlur={(e) => setUserName(e.target.value)}
          status={userNameCheck || error ? "error" : "success"}
        />
        {userNameCheck && (
          <p className='text-xs text-red-500'>
            username already found. try different
          </p>
        )}
        {userName && !userNameCheck && (
          <p className='text-xs text-green-500'>username available</p>
        )}
        <div className='my-4 mt-8'>
          <Typography.Title level={5}>Your Profile Picture</Typography.Title>
          <UploadImages limit={1} onSuccess={handleUploadImages} />
        </div>
      </div>
      <StyledStickyContainer>
        <StyledButton
          type='primary'
          onClick={handleAddUserProfile}
          className='w-full bg-primary'
          loading={loading}
          disabled={!!userNameCheck || !!error}
        >
          Continue
        </StyledButton>
      </StyledStickyContainer>
    </div>
  );
};

export default ProfileSetup;
