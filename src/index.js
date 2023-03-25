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
    dsn: "https://c7a27bf5657b4ccea1a2f669c5e53f24@o4503977086418944.ingest.sentry.io/4503977100771328",
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    integrations: [new Sentry.Replay(), new BrowserTracing()],

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
