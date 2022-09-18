import { db } from "../firebase-config";
import { collection, query, where, orderBy } from "firebase/firestore";

export function fetchBrands() {
  const brandRef = collection(db, "brand");
  const q = query(
    brandRef,
    where("status", "==", true),
    orderBy("created_at", "desc")
  );
  return q;
}

export function fetchCategories() { 
    const categoryRef = collection(db, "category");
    const q = query(
        categoryRef,
        where("status", "==", true),
        orderBy("created_at", "desc")
    );
    return q;
}

export function fetchProducts() { 
    const productRef = collection(db, "product");
    const q = query(
        productRef,
        where("status", "==", true),
        orderBy("created_at", "desc")
    );
    return q;
}

export function fetchProduct(id) { 
    const productRef = collection(db, "product");
    const q = query(
        productRef,
        where("status", "==", true),
        where("id", "==", id)
    );
    return q;
}

export function fetchProductByCategory(categoryRef) {
    const productRef = collection(db, "product");
    const q = query(
      productRef,
      where("status", "==", true),
      where("category_id", "==", categoryRef)
    );
    return q;
}

export function fetchProductByBrand(brandRef) {
    const productRef = collection(db, "product");
    const q = query(
        productRef,
        where("status", "==", true),
        where("brand_id", "==", brandRef)
    );
    return q;
}

export function fetchProductBySearch(search) {
    const productRef = collection(db, "product");
    const q = query(
        productRef,
        where("status", "==", true),
        where("name", "==", search)
    );
    return q;
}

export function fetchProductBySubCategory(subCategoryRef) {
    const productRef = collection(db, "product");
    const q = query(
        productRef,
        where("status", "==", true),
        where("sub_category_id", "==", subCategoryRef)
    );
    return q;
}

