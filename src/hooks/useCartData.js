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
    const selectedItem = items.findIndex(
      (i) =>
        item.id === i.id &&
        (!item.selectedColorVariant.variant_id ||
          item.selectedColorVariant.variant_id ===
            i.selectedColorVariant.variant_id) &&
        (!item.selectedSizeVariant.variant_id ||
          item.selectedSizeVariant.variant_id ===
            i.selectedSizeVariant.variant_id)
    );
    if (selectedItem !== -1) {
      setItems(items.filter((i, index) => index !== selectedItem));
    }
  };

  const saveItems = (items) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  const removeAllItems = () => {
    setItems([]);
  };

  const changeQuantity = (item, increment) => {
    const selectedItem = items.findIndex(
      (i) =>
        item.id === i.id &&
        (!item.selectedColorVariant.variant_id ||
          item.selectedColorVariant.variant_id ===
            i.selectedColorVariant.variant_id) &&
        (!item.selectedSizeVariant.variant_id ||
          item.selectedSizeVariant.variant_id ===
            i.selectedSizeVariant.variant_id)
    );
    if (increment) {
      if (selectedItem !== -1) {
        setItems(
          items.map((i, index) => ({
            ...i,
            quantity: index === selectedItem ? i.quantity + 1 : i.quantity,
          }))
        );
      }
    } else {
      if (selectedItem !== -1) {
        setItems(
          items.map((i, index) => ({
            ...i,
            quantity:
              index === selectedItem && i.quantity > 1
                ? i.quantity - 1
                : i.quantity,
          }))
        );
      }
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
