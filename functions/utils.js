
const isEmpty = require("lodash/isEmpty");
const omit = require("lodash/omit");


// write a util function that extracts file path from a url
// this is sample url:  http://localhost:9199/v0/b/clock-poc-11334.appspot.com/o/listing-images%2Fdownload%20(2).jpeg-1678956049370?alt=media&token=f4ff24d7-735d-46c0-b101-d34e0fdb2dc1
exports.getFileNameFromUrl = (url) => {
  const parts = url.split("/");
  const fileNameWithParams = parts[parts.length - 1];
  const fileName = fileNameWithParams.split("?")[0];
  return `${decodeURIComponent(fileName)}`;
};


exports.getSummaryData = (items) => {
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

exports.transformPayload = (address, items) => {
  const newAddress = omit(address, ["createdAt", "updatedAt", "uuid"]);
  const newItems = items.map((item) => {
    const newItem = omit(item, ["createdAt", "updatedAt", 'stock']);
    return newItem;
  });
  return { address: newAddress, items: newItems };
}