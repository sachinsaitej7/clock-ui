import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";

import { useAuthContext } from "@app/store";
import { LoginModal } from "@buyer/components";

export const LoginContext = createContext();

export function useLoginContext() {
  const result = useContext(LoginContext);
  if (!result) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return result;
}

export const LoginProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { handleSignInWithPhone, verifyOtp } = useAuthContext();
  const [registerCallbacks, setRegisterCallbacks] = useState([]);

  const handleLoginModal = useCallback(
    (cb) => {
      setShowLoginModal(true);
      cb && setRegisterCallbacks((p) => [...p, cb]);
    },
    [setRegisterCallbacks]
  );

  const handleLogin = useCallback(
    async (phone) => {
      try {
        await handleSignInWithPhone(phone);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [handleSignInWithPhone]
  );

  const handleVerifyOtp = useCallback(
    async (code) => {
      try {
        await verifyOtp(code);
        registerCallbacks.forEach((cb) => cb());
        setRegisterCallbacks([]);
        setShowLoginModal(false);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [verifyOtp, setRegisterCallbacks, registerCallbacks]
  );

  const handleClose = () => {
    setShowLoginModal(false);
    setRegisterCallbacks([]);
  };

  const value = useMemo(
    () => ({
      handleLogin,
      handleVerifyOtp,
      handleLoginModal,
    }),
    [handleLogin, handleVerifyOtp, handleLoginModal]
  );

  return (
    <LoginContext.Provider value={value}>
      {children}
      <LoginModal
        open={showLoginModal}
        sendOtp={handleLogin}
        verifyOtp={handleVerifyOtp}
        handleClose={handleClose}
      />
    </LoginContext.Provider>
  );
};
