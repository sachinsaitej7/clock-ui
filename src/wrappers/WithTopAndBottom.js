import React, { useContext } from "react";

import Store from "../store";
import TopBar from "../shared-components/TopBar";
import Footer from "../shared-components/Footer";
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
    '1': () => (user ? navigation("/profile") : handleLoginModal()),
    '3': () => navigation("/products"),
    '4': () => navigation("/products?category=5"),
    '5': () => navigation("/products?category=6"),
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

  return (
    <>
      <TopBar
        itemsCount={items.length}
        openLogin={loginModalVisibile}
        clickHandler={handleClick}
        authHandler={authHandler}
        menuItems={MENU_ITEMS}
      />
      {children}
      <Footer />
    </>
  );
};

export default WithTopAndBottom;
