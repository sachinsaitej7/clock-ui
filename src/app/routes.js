import React from "react";
import { Route } from "react-router-dom";

import Root from "@app";
import { NotFoundPage } from "@components";

import SellerRoute from "@seller/routes";
import BuyerRoute from "@buyer/routes";

const AppRoute = (
  <Route element={<Root />}>
    {SellerRoute}
    {BuyerRoute}
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export default AppRoute;
