import removeEmptyKeys from "./removeEmptyKeys";

const formatCurrency = (value) => {
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
};

const getSummaryData = (items) => {
  let total = 0;
  let totalItems = 0;
  let totalDiscount = 0;
  items.forEach((item) => {
    total += item.price.currentPrice * (item.quantity || 1);
    totalItems = totalItems + (item.quantity || 1);
    totalDiscount += (item.price.discount || 0) * (item.quantity || 1);
  });
  return { total, totalItems, totalDiscount };
};

const getParams = (searchParams = {}) => {
  const keyValues = searchParams.entries();
  const payload = {};
  for (const [key, value] of keyValues) {
    if (key === "brand") {
      payload["brand_id"] = value;
    } else payload[key] = value;
  }
  return payload;
};

export {
  formatCurrency,
  getSummaryData,
  getParams,
  removeEmptyKeys,
};
