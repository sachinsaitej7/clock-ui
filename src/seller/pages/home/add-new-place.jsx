import React, { useState, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Typography , App} from "antd";

//images
import { CloseOutlined } from "@ant-design/icons";

import {
  addProduct,
  useGetUserLocation,
} from "./hooks";

import {
  PageContainer,
  StyledInput,
  StyledButton,
  StyledStickyContainer,
} from "@seller/styled-components";

import UploadImages from "@seller/components/UploadImages";


const TopBarContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-width: 768px;
  height: 50px;
  background-color: ${(props) => props.theme.bg.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  margin-bottom: ${(props) => props.theme.space[8]};
  position: sticky;
  min-height: 100vh;
  max-width: 768px;
  background-color: ${(props) => props.theme.bg.dark};
  animation: slide-up 0.5s ease-in-out;
  z-index: 100;
  top: 0;
  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const StyledCard = styled.div`
  padding: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.bg.default};
  margin-bottom: ${(props) => props.theme.space[3]};
  h4 {
    margin: ${(props) =>
      props.theme.space[0] +
      " " +
      props.theme.space[0] +
      " " +
      props.theme.space[3]};
    font-size: ${(props) => props.theme.fontSizes[3]};
  }
  .no-margin {
    margin: ${(props) => props.theme.space[0]};
  }
`;

export default function AddNewPlace({ profile, setAddPlace }) {
  const theme = useTheme();
  const { message } = App.useApp();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const descriptionRef = useRef(null);

  const [location] = useGetUserLocation();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const productData = {
      description:
        descriptionRef.current.resizableTextArea.textArea.value || "",
      images,
      createdBy: profile.id,
      profileData: profile,
      listingType: "lister",
      location,
    };
    if (!images?.length || !location || !descriptionRef.current?.resizableTextArea.textArea.value) {
      message.error('Please fill all the fields');
      setLoading(false);
      return;
    }
    try {
      const id = await addProduct(productData, 'place');
      message.success("Post added successfully");
      setAddPlace(false);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong, please try again later");
    }
    setLoading(false);
  };

  const handleProductImages = (images=[]) => {
    const imagesUrls = images
      .filter((i) => i.response)
      .map((image) => image.response.downloadURL);
    setImages(imagesUrls);
  };


  return (
    <StyledContainer>
      <TopBarContainer>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Add new post
        </Typography.Title>
        <CloseOutlined onClick={() => setAddPlace(false)} />
      </TopBarContainer>
      <StyledCard>
        <Typography.Title level={4}>
          Images * ({images?.length || 0}/4)
        </Typography.Title>
        <UploadImages
          limit={4}
          onSuccess={handleProductImages}
          capture='environment'
        />
        <Typography.Text style={{ color: "#8C8C8C" }}>
          Add some cool pictures of this post!
        </Typography.Text>
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Write a caption *</Typography.Title>
        <StyledInput.TextArea
          type='text'
          placeholder='What’s interesting here...'
          ref={descriptionRef}
          autoSize={{ minRows: 8, maxRows: 100 }}
        />
      </StyledCard>
      <StyledStickyContainer
        style={{
          marginBottom: theme.space[0],
        }}
      >
        <StyledButton
          loading={loading}
          onClick={handleAddProduct}
          type='primary'
          className='w-full mt-0 bg-primary'
        >
          Share
        </StyledButton>
      </StyledStickyContainer>
    </StyledContainer>
  );
}
