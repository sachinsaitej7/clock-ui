import lunr from "lunr";

export function initializeSearch(products) {
  return lunr(function () {
    this.ref("id");
    this.field("name");
    this.field("description");
    this.field("brand");
    this.field("category");
    products.forEach((doc) => {
      this.add({
        ...doc,
        brand: doc.brand?.name,
        category: doc.category?.name,
      });
    });
  });
}

export function sortProducts(products, sort) {
  switch (sort) {
    case "price_asc":
      return products.sort(
        (a, b) =>
          Number(a.price_head[0].sale_price) -
          Number(b.price_head[0].sale_price)
      );
    case "price_desc":
      return products.sort(
        (a, b) => +b.price_head[0].sale_price - +a.price_head[0].sale_price
      );
    case "discount_asc":
      return products.sort((a, b) => a.discount - b.discount);
    case "discount_desc":
      return products.sort((a, b) => b.discount - a.discount);
    default:
      return products;
  }
}

export function filterProducts(products, filters) {
  return products.filter((product) => {
    const variants = product.price_head.flatMap(
      (priceHead) => priceHead.price_line
    );
    return variants.find((v) => {
      const filterValue = filters[v.variant_type_name.toLowerCase()];
      if (filterValue) return filterValue.includes(v.variant_id);
      return true;
    });
  });
}

export function processResults(results = [], searchIds, filterValues) {
  const searchedResults = searchIds
    ? results.filter((result) => searchIds.includes(result.id))
    : results;
  const filteredResults = filterProducts(searchedResults, filterValues);
  const sortedResults = filterValues.sort
    ? sortProducts(filteredResults, filterValues.sort[0])
    : filteredResults;
  return sortedResults;
}
