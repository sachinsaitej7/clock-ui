import React from "react";
import ReactDOM from "react-dom";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://c7a27bf5657b4ccea1a2f669c5e53f24@o4503977086418944.ingest.sentry.io/4503977100771328",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
