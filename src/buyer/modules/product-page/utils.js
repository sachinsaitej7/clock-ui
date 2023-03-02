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

export const fallbackCopyClipboard = (text) => {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const copyToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyClipboard(text);
    return Promise.resolve();
  }
  return navigator.clipboard.writeText(text);
};

export const handleShare = (data, callback = () => {}) => {
  if (navigator.share) {
    navigator.share(data).catch(() => {
      copyToClipboard(data.url).then(() => {
        callback("Link Copied to Clipboard");
      });
    });
  } else {
    copyToClipboard(data.url).then(() => callback("Link Copied to Clipboard"));
  }
};

export const getShareData = (name, productImages) => {
  const shareData = {
    title: name,
    text: "Check out this product",
    url: window.location.href,
    files: productImages ? [productImages[0].url] : [],
  };
  return shareData;
};
