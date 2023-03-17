import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebase } from "app/firebase";

import Spinner from "app/components/Spinner";

export default function AuthComponent() {
  const location = useLocation();
  const { auth } = getFirebase();
  const [user, loading] = useAuthState(auth);
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
