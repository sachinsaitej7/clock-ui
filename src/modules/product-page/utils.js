import isEmpty from "lodash/isEmpty";

export const generatePrice = (
  colorVariant = {},
  sizeVariant = {},
  priceData = []
) => {
  return priceData.reduce((acc, variant) => {
    if (
      (isEmpty(colorVariant) ||
        variant.price_line.find(
          (item) => item.variant_id === colorVariant.variant_id
        )) &&
      (isEmpty(sizeVariant) ||
        variant.price_line.find(
          (item) => item.variant_id === sizeVariant.variant_id
        ))
    ) {
      return {
        price: Number(variant.sale_price),
        mrp: Number(variant.regular_price),
        discount: 0,
      };
    }
    return acc;
  }, {});
};

export const checkItemInList = (items, { color = {}, size = {}, id }) => {
  return items.find((item) => {
    return (
      item.id === Number(id) &&
      (!color.variant_id ||
        item.selectedColorVariant.variant_id === color.variant_id) &&
      (!size.variant_id ||
        item.selectedSizeVariant.variant_id === size.variant_id)
    );
  });
};
