import React from "react";
import { useTheme } from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Avatar, List, Drawer } from "antd";
import moment from "moment";

import { CalendarDaysIcon } from "@assets/icons";
import { useGetUserFollowersByUser } from "../hooks";

const ProfilesList = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [userFollowers, loading] = useGetUserFollowersByUser(
    searchParams.get("id")
  );

  return (
    <Drawer
      open={open}
      placement="bottom"
      onClose={() => setOpen(false)}
      title="Following List"
      closable={false}
    >
      <List
        dataSource={userFollowers}
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
              title={<p className="font-bold">{item.profileData.name}</p>}
              description={
                <div
                  style={{
                    color: theme.text.light,
                    fontSize: theme.fontSizes[2],
                  }}
                  className="flex items-center"
                >
                  <CalendarDaysIcon width="14px" />
                  <span className="ml-1">{`Following from ${moment(
                    item.createdAt.toDate()
                  ).format("MMMM YYYY")}`}</span>
                </div>
              }
            />
          </List.Item>
        )}
        loading={loading}
      />
    </Drawer>
  );
};

export default ProfilesList;
