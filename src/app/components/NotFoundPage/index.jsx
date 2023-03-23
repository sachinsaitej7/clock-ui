// make a antd 404 not found page component

import React from "react";
import { Result } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import { StyledButton } from "@app/styled-components";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSeller = location.pathname.includes("/seller");
  const prefix = isSeller ? "seller" : "";

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <StyledButton type="primary" onClick={() => navigate(`/${prefix}`)}>
          Back Home
        </StyledButton>
      }
    />
  );
};

export default NotFoundPage;
