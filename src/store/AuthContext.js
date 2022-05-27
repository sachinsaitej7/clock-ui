import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loginState: "",
  setLoginState: () => { },
  showLoginPopup: false,
  setShowLoginPopup: () => { },
  verifyOtp: () => {},
  handleSignInWithPhone: () => {},
  updateUserProfile: () => { },
  signOut: () => { },
});
