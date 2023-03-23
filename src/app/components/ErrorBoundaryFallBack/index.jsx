import React from "react";
import { useTheme } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { StyledButton } from "@app/styled-components";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isSeller = location.pathname.includes("seller");
  const prefix = isSeller ? "seller" : "";

  const handleError = () => {
    resetErrorBoundary();
    navigate(`/${prefix}`);
  };

  return (
    <div
      style={{
        padding: theme.space[5],
        marginTop: "60px",
      }}
      className="flex flex-col justify-start"
    >
      <h3 className="text-danger font-semibold text-base">
        Something went wrong, we are notified. Please try after sometime.
      </h3>
      <details className="whitespace-pre-wrap">
        {error && error.toString()}
        <br />
      </details>
      <StyledButton onClick={handleError}>Try again</StyledButton>
    </div>
  );
}

export default ErrorBoundaryFallback;
