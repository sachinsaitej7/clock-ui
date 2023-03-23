import React, { useContext } from "react";
import styled, { useTheme } from "styled-components";
import { Card, Avatar } from "antd";

import Store from "../../store";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const ProfilePageContainer = styled.div`
  display: flex;
  width: 100%;
  padding: ${(props) => props.theme.space[5]};
`;

const { AuthContext } = Store;

const ProfilePage = () => {
  const theme = useTheme();
  const { handleSignOut } = useContext(AuthContext);
  return (
    <ProfilePageContainer>
      <Card
        title="Profile Page"
        style={{
          height: 400,
          width: "100%",
          borderRadius: theme.borderRadius[2],
        }}
        actions={[<LogoutOutlined onClick={handleSignOut} />]}
      >
        {" "}
        <Card.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title="No Data"
          description="NA"
        />
      </Card>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
