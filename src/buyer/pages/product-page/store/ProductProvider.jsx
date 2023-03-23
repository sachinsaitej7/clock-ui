import React, { useContext, useState } from "react";

const ProductContext = React.createContext();

export function useProductContext() {
  const result = useContext(ProductContext);
  if (!result) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return result;
}

export const ProductProvider = ({ children }) => {
  const [variant, setVariant] = useState(null);

  return (
    <ProductContext.Provider value={{ variant, setVariant }}>
      {children}
    </ProductContext.Provider>
  );
};
