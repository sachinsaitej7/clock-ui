import { createContext } from "react";

export const ProductContext = createContext({
  categories: [],
  products: [],
  setCategories: () => {},
  setProducts: () => {},
});
