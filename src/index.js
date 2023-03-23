import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import AppRoutes from "@app/routes";
import SplashLogo from "@components/SplashLogo";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://a2a680d99da943b4ab0d074c4eca72f2@o4503977086418944.ingest.sentry.io/4504628947451904",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const router = createBrowserRouter(createRoutesFromElements(AppRoutes));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<SplashLogo />} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
