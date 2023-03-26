// provider with app mode
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import isEmpty from "lodash/isEmpty";
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
  const [previousPath, setPreviousPath] = useState({});
  
  const [mode, setMode] = useState(sellerMode ? "seller" : "buyer");

  const handleChange = useCallback(
    (value) => {
      if (value === mode) return;
      const prevValue = previousPath[value];
      if (value === "buyer") {
        setPreviousPath({ seller: location });
        !isEmpty(prevValue)
          ? navigate(`${prevValue.pathname}${prevValue.search}`)
          : navigate("/");
      } else if (value === "seller") {
        setPreviousPath({ buyer: location });
        !isEmpty(prevValue)
          ? navigate(`${prevValue.pathname}${prevValue.search}`)
          : navigate("/seller");
      }
      setMode(value);
    },
    [setMode, navigate, mode]
  );

  useEffect(() => {
    if (sellerMode && mode !== "seller") setMode("seller");
    else if (!sellerMode && mode !== "buyer") setMode("buyer");
  }, [sellerMode]);

  const value = useMemo(
    () => ({ mode, setMode: handleChange }),
    [mode, handleChange]
  );

  return (
    <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
  );
}
