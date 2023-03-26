import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { ErrorBoundary } from "react-error-boundary";

import { getFirebase } from "@firebase-app";
import { ErrorBoundaryFallback } from "@components";
import { TopBar, Footer } from "@seller/components";

const { auth } = getFirebase();

const WithTopAndBottom = ({ children }) => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  return (
    <div className='flex flex-col justify-stretch w-screen'>
      <TopBar handleClick={user ? () => signOut() : null} />
      <div className='h-14'></div>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <div>{children}</div>
      </ErrorBoundary>
      <Footer className='my-40' />
    </div>
  );
};

export default WithTopAndBottom;
