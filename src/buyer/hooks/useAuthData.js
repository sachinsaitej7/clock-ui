import { useState } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import { getFirebase } from "app/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
// import { verifyToken } from "../apis/auth";

export function useAuthData() {
  const { auth } = getFirebase();
  const [user, authLoading, authError] = useAuthState(auth);
  const [openLogin, setOpenLogin] = useState(false);
  const [callbacks, setCallbacks] = useState([]);
  // const validateToken = useCallback(async () => {
  //   if(!user) return;
  //   const token = await user.getIdToken();
  //   try {
  //     const response = await verifyToken(token);
  //     if (response.status !== 200) getAuth().signOut();
  //   } catch (error) {
  //     getAuth().signOut();
  //   }
  // }, [user]);

  const handleLoginModal = (callback) => {
    setOpenLogin(!openLogin);
    if (callback) setCallbacks([...callbacks, callback]);
  };

  // useEffect(() => {
  //   if (user && !authLoading) {
  //     validateToken();
  //   }
  // }, [user, authLoading, validateToken]);

  const handleSignInWithPhone = async (phoneNumber) => {
    let validPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    // if (validPhoneNumber.length === "10") {
    validPhoneNumber = `+91${validPhoneNumber}`;
    // }
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
  };

  const verifyOtp = async (code) => {
    try {
      await window.confirmationResult.confirm(code);
      handleLoginModal();
      callbacks.forEach((callback) => {
        callback && callback();
      });
      setCallbacks([]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
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
