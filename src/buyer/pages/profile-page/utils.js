export const getParams = (searchParams = {}) => {
  const keyValues = searchParams.entries();
  const payload = {};
  for (const [key, value] of keyValues) {
    payload[key] = value;
  }
  return payload;
};

export const getCollectionName = (searchParams = {}, products = []) => {
  switch (true) {
    case !!searchParams.get("brand"):
      return products[0]?.brand?.name || "Brand";
    case !!searchParams.get("category"):
      return products[0]?.category?.name || "Category";
    case !!searchParams.get("subcategory"):
      return products[0]?.subcategory?.name || "Subcategory";
    default:
      return "";
  }
};
