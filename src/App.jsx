import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Store from "./store";

import HomePage from "./modules/home-page/index-new";
import CollectionPage from "./modules/collection-page";
import ProductPage from "./modules/product-page";
import CartPage from "./modules/cart-page";
import AddressPage from "./modules/address-page";
import ReviewPage from "./modules/review-page";
import OrderPage from "./modules/order-page";
import ProfilePage from "./modules/other-pages/profile-page";
import TnCPages from "./modules/other-pages/tnc";
import NotFoundPage from "./modules/other-pages/not-found-page";

import { useCartData } from "./hooks/useCartData";
import { useAuthData } from "./hooks/useAuthData";
import { useOrderData } from "./hooks/useOrderData";

import WithTopAndBottom from "./wrappers/WithTopAndBottom";
import WithScrollToTop from "./wrappers/WithScrollToTop";
import WithAuthRoute from "./wrappers/WithAuthRoute";

import { getFirebase } from "./firebase";

const queryClient = new QueryClient();

const Root = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
  background-color: ${(props) => props.theme.bg.default};
  max-width: 768px;
  margin: 0 auto;
  p {
    margin: 0px;
    padding: 0px;
  }
`;

const { ThemeContext, CartContext, AuthContext } = Store;

function App() {
  const cartData = useCartData();
  const authData = useAuthData();
  const orderData = useOrderData(authData.user);

  // eslint-disable-next-line no-unused-vars
  const { app } = getFirebase();

  const theme = useContext(ThemeContext);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ ...authData, ...orderData }}>
          <CartContext.Provider value={{ ...cartData }}>
            <Root>
              <ToastContainer></ToastContainer>
              <WithScrollToTop />
              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    <WithTopAndBottom>
                      <HomePage />
                    </WithTopAndBottom>
                  }
                />
                <Route
                  path="/products/*"
                  exact
                  element={
                    <WithTopAndBottom>
                      <CollectionPage />
                    </WithTopAndBottom>
                  }
                />
                <Route
                  path="/product-page/*"
                  exact
                  element={
                    <WithTopAndBottom>
                      <ProductPage />
                    </WithTopAndBottom>
                  }
                />
                <Route
                  path="/profile"
                  exact
                  element={
                    <WithAuthRoute>
                      <WithTopAndBottom>
                        <ProfilePage />
                      </WithTopAndBottom>
                    </WithAuthRoute>
                  }
                />
                <Route
                  path="/cart"
                  exact
                  element={
                    // <WithAuthRoute>
                    <WithTopAndBottom>
                      <CartPage />
                    </WithTopAndBottom>
                    // </WithAuthRoute>
                  }
                />
                <Route
                  path="/address"
                  exact
                  element={
                    <WithAuthRoute>
                      <WithTopAndBottom>
                        <AddressPage />
                      </WithTopAndBottom>
                    </WithAuthRoute>
                  }
                />
                <Route
                  path="/review-order"
                  exact
                  element={
                    <WithAuthRoute>
                      <WithTopAndBottom>
                        <ReviewPage />
                      </WithTopAndBottom>
                    </WithAuthRoute>
                  }
                />
                <Route
                  path="/order/:orderId"
                  exact
                  element={
                    <WithAuthRoute>
                      <WithTopAndBottom>
                        <OrderPage />
                      </WithTopAndBottom>
                    </WithAuthRoute>
                  }
                />
                <Route
                  path="/tnc"
                  exact
                  element={
                    <WithTopAndBottom>
                      <TnCPages />
                    </WithTopAndBottom>
                  }
                />
                <Route
                  path="*"
                  element={
                    <WithTopAndBottom>
                      <NotFoundPage />
                    </WithTopAndBottom>
                  }
                />
              </Routes>
            </Root>
          </CartContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
