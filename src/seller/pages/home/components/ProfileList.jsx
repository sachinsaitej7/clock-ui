import React, { useState } from "react";
import moment from "moment";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Avatar, List } from "antd";

import { CalendarDaysIcon } from "@assets/icons";
import { Drawer } from "@seller/components";
import {
  useGetUserFollowersByProfile,
  useGetUserFollowersByUser,
} from "../hooks";

const UserList = ({ dataSource, loading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <List
      style={{ padding: theme.space[4] }}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          onClick={() =>
            navigate(
              `/profile-page/${item.name}?id=${item.id}`
            )
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.logo} size={54} />}
            title={<p className='font-bold'>{item.name}</p>}
            description={
              <div
                style={{
                  color: theme.text.light,
                  fontSize: theme.fontSizes[2],
                }}
                className='flex items-center'
              >
                <CalendarDaysIcon width='14px' />
                <span className='ml-1'>{`From ${moment(
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
  const [userFollowing, loading] = useGetUserFollowersByUser();
  return <UserList dataSource={userFollowing} loading={loading} />;
};

const FollowersListContent = () => {
  const [userFollowers, loading] = useGetUserFollowersByProfile();
  return <UserList dataSource={userFollowers} loading={loading} />;
};

const ProfilesList = ({ profile }) => {
  const [mode, setMode] = useState(null);

  return (
    <div>
      <p>
        <span
          className='text-primary cursor-pointer'
          onClick={() => setMode("follower")}
        >
          <strong className='mr-1 text-black'>
            {profile.followers?.count > 0 ? profile.followers?.count : 0}
          </strong>
          followers
        </span>
        <span className='mx-2 inline-block align-middle w-1 h-1 bg-[#D9D9D9] rounded-full'></span>
        <span
          className='text-primary cursor-pointer'
          onClick={() => setMode("following")}
        >
          following
        </span>
      </p>
      <Drawer
        open={mode !== null}
        placement='bottom'
        onClose={() => setMode(null)}
        title={mode === "follower" ? "Followers List" : "Following List"}
        closable={false}
        height='auto'
      >
        {mode === "following" ? (
          <FollowingListContent />
        ) : (
          <FollowersListContent />
        )}
      </Drawer>
    </div>
  );
};

export default ProfilesList;
