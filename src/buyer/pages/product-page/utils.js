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
  if (
    navigator.canShare &&
    data.files &&
    navigator.canShare({
      files: data.files,
    })
  ) {
    navigator.share(data).catch(() => {
      copyToClipboard(data.url).then(() => {
        callback("Link Copied to Clipboard");
      });
    });
  } else {
    copyToClipboard(data.url).then(() => callback("Link Copied to Clipboard"));
  }
};

export const getProfileShareData = ({ name, id }) => {
  const shareData = {
    title: name,
    text: "Buy from my collection on The Clock",
    url: `${window.location.origin}/profile-page/${name}?id=${id}`,
  };
  return shareData;
};

export const getProductShareData = async ({ name, id, thumbnail }) => {
  let file = null;
  try {
    const img = new Image();
    img.src = thumbnail;
    img.crossOrigin = "Anonymous";
    img.type = "image/png";

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL, "dataURL");
    const blob = await fetch(dataURL)
      .then((r) => r.blob())
      .catch((e) => console.log(e));

    file = new File([blob], "image.png", { type: blob.type });
  } catch (e) {
    console.log(e);
  }

  const shareData = {
    title: name,
    text: "Checkout this on The Clock",
    url: `${window.location.origin}/product-page/${name}?id=${id}`,
    files: file ? [file] : null,
  };
  return shareData;
};