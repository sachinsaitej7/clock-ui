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
