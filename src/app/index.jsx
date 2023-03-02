import React, { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "app/firebase";
import { ThemeProvider, AppModeProvider, Theme } from "app/store";
import BottomNavBar from "app/components/BottomNavBar";
import SplashLogo from "app/components/SplashLogo";
import ErrorFallbackComponent from "app/components/ErrorBoundaryFallBack";

const Root = () => {
  // eslint-disable-next-line no-unused-vars
  const { auth, app } = getFirebase();
  useAuthState(auth);
  const [showSplash, setShowSplash] = React.useState(true);

  useEffect(() => {
    const splashCount = localStorage.getItem("splashCount") || 0;
    // const timing = Math.max(3000 - splashCount * 1000, 1000);

    const timer = setTimeout(() => {
      localStorage.setItem("splashCount", splashCount + 1);
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppModeProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Theme.colors.primary,
            background: Theme.bg.default,
            fontFamily: Theme.fonts.primary,
          },
        }}
      >
        <AntdApp>
          <ThemeProvider>
            <div>
              {showSplash ? (
                <SplashLogo />
              ) : (
                <>
                  <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                    <Outlet />
                  </ErrorBoundary>
                  <BottomNavBar />
                </>
              )}
              <ScrollRestoration />
            </div>
          </ThemeProvider>
        </AntdApp>
      </ConfigProvider>
    </AppModeProvider>
  );
};

export default Root;
