import uniqBy from "lodash/uniqBy";

export const getUniqueBrands = (products = []) => {
  return uniqBy(
    products.reduce((acc, product) => {
      if (!acc.includes(product.brand)) {
        acc.push(product.brand);
      }
      return acc;
    }, []),
    (brand) => brand.id
  );
};

export const getParams = (searchParams = {}) => {
  const keyValues = searchParams.entries();
  const payload = {};
  for (const [key, value] of keyValues) {
    if (key === "brand") {
      payload["brand_id"] = value;
    } else payload[key] = value;
  }
  return payload;
};


export const getQueryString = (params = {}) => { 
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return queryString;
};

 export const getCollectionName = (searchParams={}, products=[]) => {
   switch (true) {
     case !!searchParams.get("brand"):
       return products[0]?.brand?.name || "Brand";
     case !!searchParams.get("category"):
       return products[0]?.category?.name || "Category";
     default:
       return "";
   }
 };
