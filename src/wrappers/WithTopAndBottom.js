import React, { useContext } from "react";

import Store from "../store";
import TopBar from "../shared-components/TopBar";
import Footer from "../shared-components/Footer";
import { useNavigate } from 'react-router-dom';

const { CartContext, AuthContext } = Store;

const WithTopAndBottom = ({ children }) => {
  const navigation = useNavigate();
  const { items } = useContext(CartContext);
  const {
    handleLoginModal,
    loginModalVisibile,
    handleSignInWithPhone,
    verifyOtp,
    authLoading,
  } = useContext(AuthContext);

  const authHandler = {
    sendOtp: handleSignInWithPhone,
    verifyOtp: verifyOtp,
    handleClose: handleLoginModal,
    loading: authLoading,
  };

  const handleClick = (type) => { 
    switch (type) {
      case "cart":
        navigation("/cart");
        break;
      case "login":
        handleLoginModal();
        break;
      default:
        navigation("/");
        break;
     }
  };

  return (
    <>
      <TopBar itemsCount={items.length} openLogin={loginModalVisibile} clickHandler={handleClick} authHandler={authHandler}/>
      {children}
      <Footer />
    </>
  );
};

export default WithTopAndBottom;
