import React, { useContext } from "react";

import Store from "../store";
import TopBar from "../shared-components/TopBar";
import Footer from "../shared-components/Footer";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../shared-components/ErrorBoundaryFallBack";
import { useNavigate } from "react-router-dom";

//images
import { ReactComponent as UserIcon } from "../assets/common/user.svg";
import { ReactComponent as CategoryIcon } from "../assets/common/category.svg";

const { CartContext, AuthContext } = Store;

const WithTopAndBottom = ({ children }) => {
  const navigation = useNavigate();
  const {
    handleLoginModal,
    loginModalVisibile,
    handleSignInWithPhone,
    verifyOtp,
    authLoading,
    user,
  } = useContext(AuthContext);

  const keyMap = {
    1: () => (user ? navigation("/profile") : handleLoginModal()),
    3: () => navigation("/products"),
    4: () => navigation("/products?category=5"),
    5: () => navigation("/products?category=6"),
  };

  const footerMap = {
    tnc: () => navigation("/tnc?tab=1"),
    privacy: () => navigation("/tnc?tab=2"),
    return: () => navigation("/tnc?tab=3"),
    contact: () => navigation("/tnc?tab=4"),
    cart: () => navigation("/cart"),
    profile: () => navigation("/profile"),
    home: () => navigation("/"),
    shipping: () => navigation("/tnc?tab=3"),
    help: () => navigation("/tnc?tab=4"),
  };

  const MENU_ITEMS = [
    {
      key: "1",
      label: user ? "Profile" : "Login",
      path: "/profile",
      icon: <UserIcon />,
    },
    {
      key: "2",
      label: "Categories",
      icon: <CategoryIcon />,
      children: [
        {
          key: "3",
          label: "All Products",
          path: "/products",
        },
        {
          key: "4",
          label: "Men",
          path: "/products?category=4",
        },
        {
          key: "5",
          label: "Women",
          path: "/products?category=5",
        },
      ],
    },
  ];
  const { items } = useContext(CartContext);

  const authHandler = {
    sendOtp: handleSignInWithPhone,
    verifyOtp: verifyOtp,
    handleClose: handleLoginModal,
    loading: authLoading,
  };

  const handleClick = (type, info) => {
    switch (type) {
      case "cart":
        navigation("/cart");
        break;
      case "login":
        handleLoginModal();
        break;
      case "menu":
        keyMap[info.key] && keyMap[info.key]();
        break;
      default:
        navigation("/");
        break;
    }
  };

  const handleFooterClick = (type, info) => {
    return footerMap[type] ? footerMap[type] : () => {};
  };

  return (
    <>
      <TopBar
        itemsCount={items.length}
        openLogin={loginModalVisibile}
        clickHandler={handleClick}
        authHandler={authHandler}
        menuItems={MENU_ITEMS}
      />
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <div style={{ marginTop: "52px", minHeight: "85vh" }}>{children}</div>
      </ErrorBoundary>
      <Footer clickHandlers={handleFooterClick} />
    </>
  );
};

export default WithTopAndBottom;
