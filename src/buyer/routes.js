import React, { lazy, Suspense } from "react";

import { Route } from "react-router-dom";

import { Spinner } from "@components";
import AuthRoute from "@app/hoc/AuthRoute";

import Root from "@buyer";

const HomePage = lazy(() => import("@buyer/pages/home-page"));
const CollectionPage = lazy(() => import("@buyer/pages/collection-page"));
const ProfilePage = lazy(() => import("@buyer/pages/profile-page"));
const BrandPage = lazy(() => import("@buyer/pages/brand-page"));
const ProductPage = lazy(() => import("@buyer/pages/product-page"));
const CartPage = lazy(() => import("@buyer/pages/cart-page"));

const TnCPage = lazy(() => import("@buyer/pages/other-pages/tnc"));
// const UserProfilePage = lazy(() =>
//   import("@buyer/pages/other-pages/profile-page")
// );
const ReviewPage = lazy(() => import("@buyer/pages/review-page-new"));
const OrderPage = lazy(() => import("@buyer/pages/order-page"));

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
      path='profile-page/*'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <ProfilePage />
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
      path='product-page/*'
      exact
      element={
        <Suspense fallback={<Spinner />}>
          <ProductPage />
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
