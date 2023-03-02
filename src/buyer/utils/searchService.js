import lunr from "lunr";
import { isEmpty } from "lodash";
import Document from "flexsearch/src/document";
import charset from "flexsearch/dist/module/lang/latin/advanced.js";
import lang from "flexsearch/dist/module/lang/en.js";

export const index = new Document({
  minlength: 2,
  document: {
    store: true,
    cache: true,
    index: [
      {
        field: "name",
        charset: charset,
        lang: lang,
        minlength: 2,
        tokenize: "full",
        stemmer: {
          shirt: "-shirt",
        },
      },
      {
        field: "description",
        minlength: 3,
        context: {
          depth: 2,
          resolution: 3,
          bidirectional: true,
        },
      },
      {
        field: "brand",
        tokenize: "forward",
      },
      {
        field: "category",
        tokenize: "forward",
        stemmer: {
          shirt: "-shirt",
        },
      },
    ],
  },
});

export function createIndex(products = []) {
  return Promise.all(
    products.map((product) => {
      if (index.get(product.id)) return Promise.resolve();
      return index.addAsync({
        ...product,
        brand: product.brand?.name,
        category: product.category?.name,
      });
    })
  );
}

export function initializeSearch(products) {
  const searchApi = new lunr.Builder();

  searchApi.ref("id");
  searchApi.field("name");
  searchApi.field("brand");
  searchApi.field("category");
  searchApi.field("description");
  products.forEach((doc) => {
    searchApi.add({
      ...doc,
      brand: doc.brand?.name,
      category: doc.category?.name,
    });
  });

  return searchApi.build();
}

export function sortProducts(products, sort) {
  switch (sort) {
    case "price_asc":
      return products.sort(
        (a, b) => Number(a.price.currentPrice) - Number(b.price.currentPrice)
      );
    case "price_desc":
      return products.sort(
        (a, b) => +b.price.currentPrice - +a.price.currentPrice
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
  if (Object.keys(filters).length < 2) return products;
  return products.filter((product) => {
    return Object.keys(filters).reduce((acc, key) => {
      if (key === "sort" || isEmpty(filters[key])) return acc;
      const filterValues = filters[key];
      const productValue = product[key === "colour" ? "color" : key];
      if (!productValue) return false;
      return (
        acc &&
        filterValues.includes(
          key !== "size" ? productValue.name : productValue.values
        )
      );
    }, true);
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
  return { searchedResults, filteredResults, sortedResults };
}
