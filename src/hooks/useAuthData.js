import { useState, useEffect, useCallback } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { verifyToken } from "../apis/auth";

export function useAuthData() {
  const [user, authLoading, authError] = useAuthState(getAuth());
  const [openLogin, setOpenLogin] = useState(false);
  const validateToken = useCallback(async () => {
    const token = await user.getIdToken();
    try {
      const response = await verifyToken(token);
      if (response.status !== 200) getAuth().signOut();
    } catch (error) {
      getAuth().signOut();
    }
  }, [user]);

  const handleLoginModal = () => {
    setOpenLogin(!openLogin);
  };

  useEffect(() => {
    if (user && !authLoading) {
      validateToken();
    }
  }, [user, authLoading, validateToken]);

  const handleSignInWithPhone = async (phoneNumber) => {
    let validPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    // if (validPhoneNumber.length === "10") {
    validPhoneNumber = `+91${validPhoneNumber}`;
    // }
    const auth = getAuth();
    window.recaptchaVerifier =
      window.recaptchaVerifier ||
      new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
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
  };

  const verifyOtp = async (code) => {
    try {
      await window.confirmationResult.confirm(code);
      handleLoginModal();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await getAuth().signOut();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    user,
    authLoading,
    authError,
    handleSignInWithPhone,
    verifyOtp,
    handleSignOut,
    handleLoginModal,
    loginModalVisibile: openLogin,
  };
}
