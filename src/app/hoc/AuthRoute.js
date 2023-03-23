import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@app/store";
import Spinner from "@components/Spinner";

export default function AuthComponent() {
  const location = useLocation();
  const [user, loading] = useAuth();
  const isSeller = location.pathname.includes("/seller");
  const prefix = isSeller ? "seller" : "";

  if (loading) return <Spinner />;
  if (!user) {
    if (isSeller)
      return (
        <Navigate
          to={`/${prefix}/login`}
          replace={true}
          state={{ from: location.pathname }}
        />
      );
    else return <Navigate to={`/`} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
