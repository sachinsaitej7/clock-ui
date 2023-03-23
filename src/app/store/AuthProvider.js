import React, { createContext, useContext, useCallback, useMemo } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "@firebase-app";

export function useAuth() {
  const { auth } = getFirebase();
  return useAuthState(auth);
}

function useAuthActions() {
  const { auth } = getFirebase();

  const handleSignInWithPhone = useCallback(
    async (phoneNumber) => {
      let validPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
      validPhoneNumber = `+91${validPhoneNumber}`;
      window.recaptchaVerifier =
        window.recaptchaVerifier ||
        new RecaptchaVerifier(
          "sign-in-button",
          {
            size: "invisible",
          },
          auth
        );
      const appVerifier = window.recaptchaVerifier;
      try {
        const result = await signInWithPhoneNumber(
          auth,
          validPhoneNumber,
          appVerifier
        );
        window.confirmationResult = result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [auth]
  );

  const verifyOtp = useCallback(async (code) => {
    try {
      await window.confirmationResult.confirm(code);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [auth]);

  return {
    handleSignInWithPhone,
    verifyOtp,
    handleSignOut,
  };
}

const AuthContext = createContext();

export const useAuthContext = () => {
  const result = useContext(AuthContext);
  if (result === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return result;
};

// provider
export const AuthProvider = ({ children }) => {
  const { handleSignInWithPhone, verifyOtp, handleSignOut } = useAuthActions();

  const value = useMemo(
    () => ({
      handleSignInWithPhone,
      verifyOtp,
      handleSignOut,
    }),
    [handleSignInWithPhone, verifyOtp, handleSignOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
