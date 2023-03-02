import numberWithCommas from "./numberWithCommas";
import generateFilters from "./generateFilters";
import removeEmptyKeys from "./removeEmptyKeys";

const getSummaryData = (items) => {
  let total = 0;
  let totalItems = 0;
  let totalDiscount = 0;
  items.forEach((item) => {
    total += item.price.currentPrice * item.quantity;
    totalItems += item.quantity;
    totalDiscount += (item.price.discount || 0) * item.quantity;
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
  numberWithCommas,
  generateFilters,
  getSummaryData,
  getParams,
  removeEmptyKeys,
};
