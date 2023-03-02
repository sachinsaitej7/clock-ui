import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebase } from "app/firebase";

import Spinner from "app/components/Spinner";

export default function AuthComponent() {
  const location = useLocation();
  let navigate = useNavigate();
  const { auth } = getFirebase();
  const [user, loading] = useAuthState(auth);
  const isSeller = location.pathname.includes("/seller");
  const prefix = isSeller ? "seller" : "";
  console.log("AuthComponent", location.pathname, isSeller, prefix);

  if (loading) return <Spinner />;
  if (!user) {
    if (isSeller)
      navigate(`/${prefix}/login`, {
        replace: true,
        state: {
          from: location,
        },
      });
    else navigate(`/`);
  }
  return (
    <>
      <Outlet />
    </>
  );
}
