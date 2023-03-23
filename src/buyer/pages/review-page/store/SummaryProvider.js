import { createContext, useContext, useState } from "react";

export const SummaryContext = createContext();

export function useSummaryContext() {
  const result = useContext(SummaryContext);
  if (!result) {
    throw new Error("useSummaryContext must be used within a SummaryProvider");
  }
  return result;
}

export function SummaryProvider({ children }) {
  const [activeTab, setActiveTab] = useState("1");
  const [address, setAddress] = useState(null);
  const [paymentType, setPaymentType] = useState("cod");

  return (
    <SummaryContext.Provider
      value={{
        address,
        setAddress,
        activeTab,
        setActiveTab,
        paymentType,
        setPaymentType,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
}
