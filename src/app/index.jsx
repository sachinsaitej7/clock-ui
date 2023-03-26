import React, { useEffect } from "react";
import { Outlet, ScrollRestoration, matchPath } from "react-router-dom";
import { App as AntdApp } from "antd";
import { ErrorBoundary } from "react-error-boundary";

import { AllProviders, useAuth } from "@app/store";
import { BottomNavBar, ErrorBoundaryFallback, SplashLogo } from "@components";

const Root = () => {
  useAuth();

  const [showSplash, setShowSplash] = React.useState(true);

  useEffect(() => {
    const splashCount = localStorage.getItem("splashCount") || 0;
    // const timing = Math.max(3000 - splashCount * 1000, 1000);
    if (typeof splashCount === "string" && parseInt(splashCount) > 2)
      return setShowSplash(false);
    const timer = setTimeout(() => {
      localStorage.setItem("splashCount", splashCount + 1);
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AllProviders>
      <AntdApp>
        {showSplash ? (
          <SplashLogo />
        ) : (
          <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
              <Outlet />
            </ErrorBoundary>
            <BottomNavBar />
          </>
        )}
        <ScrollRestoration
          getKey={(location, matches) => {
            const paths = [
              "/products/*",
              "/brand-page/*",
              "/profile-page/*",
              "/seller",
            ];
            let flag = false;
            for (const path of paths) {
              if (matchPath({ path, exact: true }, location.pathname)) {
                flag = true;
                break;
              }
            }
            if (flag) return location.pathname;
            return location.key;
          }}
        />
      </AntdApp>
    </AllProviders>
  );
};

export default Root;
