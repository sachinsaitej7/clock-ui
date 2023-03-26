import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import AuthRoute from "@app/hoc/AuthRoute";
import Spinner from "@app/components/Spinner/index";
import Root from "@seller";
const HomePage = lazy(() => import("@seller/pages/home"));
const LoginPage = lazy(() => import("@seller/pages/login"));
const OnboardingPage = lazy(() => import("@seller/pages/profile-setup"));

const SellerRoute = (
  <Route path="/seller" element={<Root />}>
    <Route
      path="login"
      element={
        <Suspense fallback={<Spinner />}>
          <LoginPage />
        </Suspense>
      }
    />
    <Route element={<AuthRoute />}>
      <Route
        path=""
        element={
          <Suspense fallback={<Spinner />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="onboarding"
        element={
          <Suspense fallback={<Spinner />}>
            <OnboardingPage />
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default SellerRoute;
