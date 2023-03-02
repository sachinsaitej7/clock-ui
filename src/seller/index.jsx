import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import WithTopAndBottom from "seller/hoc/WithTopAndBottom";

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  p {
    margin: 0px;
    padding: 0px;
    font-size: ${(props) => props.theme.fontSizes[1]};
  }
`;

const App = () => {
  return (
    <Container>
      <WithTopAndBottom>
        <Outlet />
      </WithTopAndBottom>
    </Container>
  );
};

export default App;
