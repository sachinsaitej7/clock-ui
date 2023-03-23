import React from "react";
import { useTheme } from "styled-components";
import { useSearchParams, Link } from "react-router-dom";
import { Skeleton, Divider } from "antd";

import { useUserProfile, useProduct } from "../hooks";

const UserData = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [product, loading] = useProduct(searchParams.get("id"));
  const [userData, userLoading] = useUserProfile(product?.createdBy);

  if (loading || userLoading)
    return (
      <>
        <Skeleton active className="my-2" paragraph={{ rows: 1 }} />
        <Divider className="my-4 border-t-8 w-[120%] -ml-[10%]" />
      </>
    );

  if (!userData) return null;

  return (
    <>
      <div>
        <h5 style={{ color: theme.text.light }}>Listed by</h5>
        <div className="flex items-center justify-between my-2">
          <p className="font-bold">@{userData.name}</p>
          <Link
            to={`/profile-page/${userData.name}?id=${userData.id}`}
            style={{
              color: theme.text.primary,
              fontSize: theme.fontSizes[1],
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            View Profile
          </Link>
        </div>
      </div>
      <Divider className="my-4 border-t-8 w-[120%] -ml-[10%]" />
    </>
  );
};

export default UserData;
