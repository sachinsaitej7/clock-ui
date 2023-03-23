import React from "react";
import { useTheme } from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Avatar, List, Drawer } from "antd";
import moment from "moment";

import { CalendarDaysIcon } from "@assets/icons";
import {
  useGetUserFollowersByProfile,
  useGetUserFollowersByUser,
} from "../hooks";

const UserList = ({ dataSource, loading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <List
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          onClick={() =>
            navigate(
              `/profile-page/${item.profileData.name}?id=${item.profileData.id}`
            )
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.profileData.logo} size={54} />}
            title={<p className='font-bold'>{item.profileData.name}</p>}
            description={
              <div
                style={{
                  color: theme.text.light,
                  fontSize: theme.fontSizes[2],
                }}
                className='flex items-center'
              >
                <CalendarDaysIcon width='14px' />
                <span className='ml-1'>{`Following from ${moment(
                  item.createdAt.toDate()
                ).format("MMMM YYYY")}`}</span>
              </div>
            }
          />
        </List.Item>
      )}
      loading={loading}
    />
  );
};

const FollowingListContent = () => {
  const [searchParams] = useSearchParams();
  const [userFollowing, loading] = useGetUserFollowersByUser(
    searchParams.get("id")
  );
  return <UserList dataSource={userFollowing} loading={loading} />;
};

const FollowersListContent = () => {
  const [searchParams] = useSearchParams();
  const [userFollowers, loading] = useGetUserFollowersByProfile(
    searchParams.get("id")
  );

  return <UserList dataSource={userFollowers} loading={loading} />;
};

const ProfilesList = ({ mode, setMode }) => {
  const theme = useTheme();

  return (
    <Drawer
      open={mode !== null}
      placement='bottom'
      onClose={() => setMode(null)}
      title={mode === "followers" ? "Followers List" : "Following List"}
      closable={false}
      bodyStyle={{
        padding: theme.space[5],
      }}
    >
      {mode === "following" ? (
        <FollowingListContent />
      ) : (
        <FollowersListContent />
      )}
    </Drawer>
  );
};

export default ProfilesList;
