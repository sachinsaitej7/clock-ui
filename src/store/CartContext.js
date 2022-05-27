import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  changeQuantity: () => {},
  activeAddress: null,
  setActiveAddress: () => {},
  removeAllItems: () => {},
});
