import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";

import { ArrowLongLeftIcon } from "@assets/icons";

// import FiltersBar from "./components/FiltersBar";
import Collections from "./components/Collections";
import ProfileCard from "./components/ProfileCard";

const ProfilePageContainer = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[5]};
`;

const Header = styled.div`
  height: 84px;
  background-color: ${(props) => props.theme.bg.primary};
  padding: ${(props) => props.theme.space[3]};
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <ArrowLongLeftIcon
          width="24px"
          onClick={() => navigate(-1)}
          className="cursor-pointer text-white"
        />
      </Header>
      <ProfilePageContainer>
        <ProfileCard />
        <Divider className="my-4" />
        {/* <FiltersBar /> */}
        <Collections />
      </ProfilePageContainer>
    </>
  );
};

export default ProfilePage;
