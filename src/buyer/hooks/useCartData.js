import { useState, useEffect } from "react";

export function useCartData() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const items = await localStorage.getItem("items");
    setItems(items ? JSON.parse(items) : []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  const saveItems = (items) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  const removeAllItems = () => {
    setItems([]);
  };

  const changeQuantity = (item, increment) => {
    if (increment) {
      setItems(
        items.map((i) => ({
          ...i,
          quantity: i.id === item.id ? i.quantity + 1 : i.quantity,
        }))
      );
    } else {
      setItems(
        items.map((i) => ({
          ...i,
          quantity:
            i.id === item.id && i.quantity > 1 ? i.quantity - 1 : i.quantity,
        }))
      );
    }
  };
  return {
    items,
    addItem,
    removeItem,
    removeAllItems,
    changeQuantity,
  };
}
