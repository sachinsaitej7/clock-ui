// provider with app mode
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppModeContext = createContext();

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error("useAppMode must be used within a AppModeProvider");
  }
  return context;
}

export function AppModeProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const sellerMode = location.pathname.includes("/seller");

  const [mode, setMode] = useState(sellerMode ? "seller" : "buyer");

  const handleChange = useCallback(
    (value) => {
      if (value === mode) return;
      if (value === "buyer") navigate("/");
      else if (value === "seller") navigate("/seller");
      setMode(value);
    },
    [setMode, navigate, mode]
  );

  useEffect(() => {
    if (sellerMode) setMode("seller");
    else setMode("buyer");
  }, [sellerMode]);

  const value = useMemo(
    () => ({ mode, setMode: handleChange }),
    [mode, handleChange]
  );

  return (
    <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
  );
}
