import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorBoundaryFallback } from "@components";
import { TopBar, Footer } from "@buyer/components";

const WithTopAndBottom = ({ children }) => {
  return (
    <div className="flex flex-col justify-stretch w-screen">
      <TopBar />
      <div className="h-14"></div>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <div>{children}</div>
      </ErrorBoundary>
      <Footer className="my-40" />
    </div>
  );
};

export default WithTopAndBottom;
