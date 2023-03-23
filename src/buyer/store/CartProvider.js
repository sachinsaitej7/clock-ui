import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export const CartContext = createContext();

function useCartData() {
  const [items, setItems] = useState(() => {
    const items = localStorage.getItem("items");
    if (typeof items === "string") return JSON.parse(items);
    return [];
  });

  const saveItems = useCallback((items) => {
    localStorage.setItem("items", JSON.stringify(items));
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items, saveItems]);
  
  const updateItem = useCallback((item) => {
    setItems((items) =>
      items.map((i) => {
        if (i.id === item.id) return item;
        return i;
      })
    );
  }, []);

  const addItem = useCallback((item) => {
    setItems((items) => [...items, item]);
  }, []);

  const removeItem = useCallback((item) => {
    setItems((items) => items.filter((i) => i.id !== item.id));
  }, []);

  const removeAllItems = useCallback(() => {
    setItems([]);
  }, []);

  const changeQuantity = useCallback((item, increment) => {
    if (increment) {
      setItems((items) =>
        items.map((i) => {
          const quantity = i.quantity || 1;
          return {
            ...i,
            quantity: i.id === item.id ? quantity + 1 : quantity,
          };
        })
      );
    } else {
      setItems((items) =>
        items.map((i) => ({
          ...i,
          quantity:
            i.id === item.id && i.quantity > 1 ? i.quantity - 1 : i.quantity,
        }))
      );
    }
  }, []);

  const cartData = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      removeAllItems,
      changeQuantity,
      updateItem,
    }),
    [items, addItem, removeItem, removeAllItems, changeQuantity, updateItem]
  );

  return cartData;
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const value = useCartData();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
