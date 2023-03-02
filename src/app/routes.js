import React from "react";
import { Route } from "react-router-dom";

import Root from "app";
import SellerRoute from "seller/routes";
import BuyerRoute from "buyer/routes";

import NotFoundPage from "app/components/NotFoundPage";

const AppRoute = (
  <Route
    element={<Root />}
  >
    {SellerRoute}
    {BuyerRoute}
    <Route path='*' element={<NotFoundPage />} />
  </Route>
);

export default AppRoute;
