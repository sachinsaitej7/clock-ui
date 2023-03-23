import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { getFirebase } from "@firebase-app";
import TopBar from "@seller/shared-components/TopBar";
import Footer from "@seller/shared-components/Footer";

const { auth } = getFirebase();

const WithTopAndBottom = ({ children }) => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <>
      <TopBar handleClick={user ? () => signOut() : null} />
      {children}
      <Footer />
    </>
  );
};

export default WithTopAndBottom;
