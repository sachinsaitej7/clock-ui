import React, { lazy, Suspense } from "react";

import { Route } from "react-router-dom";

import Spinner from "app/components/Spinner";
import AuthRoute from "app/hoc/AuthRoute";
import Root from "buyer";
const HomePage = lazy(() => import("buyer/modules/home-page"));
const CollectionPage = lazy(() => import("buyer/modules/collection-page"));
const ProfilePage = lazy(() => import("buyer/modules/profile-page"));
const ProductPage = lazy(() => import("buyer/modules/product-page"));
const BrandPage = lazy(() => import("buyer/modules/brand-page"));
const TnCPage = lazy(() => import("buyer/modules/other-pages/tnc"));
const UserProfilePage = lazy(() =>
  import("buyer/modules/other-pages/profile-page")
);
const CartPage = lazy(() => import("buyer/modules/cart-page"));
const AddressPage = lazy(() => import("buyer/modules/address-page"));
const ReviewPage = lazy(() => import("buyer/modules/review-page"));
const OrderPage = lazy(() => import("buyer/modules/order-page"));

const BuyerRoute = (
  <Route path='/' element={<Root />}>
    <Route
      path=''
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <HomePage />
        </Suspense>
      }
    />
    <Route
      path='products/*'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <CollectionPage />
        </Suspense>
      }
    />
    <Route
      path='product-page/*'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <ProductPage />
        </Suspense>
      }
    />
    <Route
      path='brand-page/*'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <BrandPage />
        </Suspense>
      }
    />
    <Route
      path='profile-page/*'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <ProfilePage />
        </Suspense>
      }
    />
    <Route
      path='cart'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <CartPage />
        </Suspense>
      }
    />
    <Route element={<AuthRoute />}>
      <Route
        path='profile'
        exact
        element={
          <Suspense fallback={<Spinner />}>
            <UserProfilePage />
          </Suspense>
        }
      />
      <Route
        path='address'
        exact
        element={
          <Suspense fallback={<Spinner />}>
            <AddressPage />
          </Suspense>
        }
      />
      <Route
        path='review-order'
        exact
        element={
          <Suspense fallback={<Spinner />}>
            <ReviewPage />
          </Suspense>
        }
      />
      <Route
        path='order/:orderId'
        exact
        element={
          <Suspense fallback={<Spinner />}>
            <OrderPage />
          </Suspense>
        }
      />
    </Route>
    <Route
      path='tnc'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <TnCPage />
        </Suspense>
      }
    />
  </Route>
);

export default BuyerRoute;
