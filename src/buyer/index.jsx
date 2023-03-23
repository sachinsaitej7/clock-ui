import React from "react";
import { Outlet } from "react-router-dom";

import { AllProviders } from "@buyer/store";

function App() {
  return (
    <AllProviders>
      <Outlet />
    </AllProviders>
  );
}

export default App;
