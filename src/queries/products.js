import { getFirebase } from "../firebase";
import {
  collection,
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";
import { getIdConverter } from "./utils";

const { db } = getFirebase();
const idConverter = getIdConverter();
const productRef = collection(db, "product").withConverter(idConverter);

export function fetchBrandsQuery() {
  const brandRef = collection(db, "brand").withConverter(idConverter);
  const q = query(
    brandRef,
    where("status", "==", true),
    orderBy("createdAt", "desc")
  );
  return q;
}

export function fetchCategoriesQuery() {
  const categoryRef = collection(db, "category").withConverter(idConverter);
  const q = query(
    categoryRef,
    where("status", "==", true),
    orderBy("createdAt", "desc")
  );
  return q;
}

export function fetchSubcategoriesQuery() {
  const subcategoryRef = collectionGroup(db, "subcategory").withConverter(
    idConverter
  );
  const q = query(
    subcategoryRef,
    where("status", "==", true),
    orderBy("createdAt", "desc")
  );
  return q;
}

export function fetchProductQuery(id) {
  const productRef = doc(db, "product", id).withConverter(idConverter);
  return productRef;
}

export function fetchProductImagesQuery(id) {
  const productImagesRef = collection(db, `/product/${id}/images`);
  const q = query(productImagesRef);
  return q;
}

export function fetchProductVariantsQuery(id) {
  const productVariantRef = collection(db, "productVariant").withConverter(
    idConverter
  );
  const q = query(
    productVariantRef,
    where("productId", "==", id),
    where("status", "==", true),
    orderBy("createdAt", "desc")
  );
  return q;
}

export function fetchProductVariantImagesQuery(id) {
  const productImagesRef = collection(db, `/productVariant/${id}/images`);
  const q = query(productImagesRef);
  return q;
}

export function fetchProductsQuery(lastDoc = null, pageLimit = 25) {
  let q = null;
  if (lastDoc) {
    q = query(
      productRef,
      where("status", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageLimit)
    );
  } else {
    q = query(
      productRef,
      where("status", "==", true),
      orderBy("createdAt", "desc"),
      limit(pageLimit)
    );
  }
  return q;
}

export function fetchProductsByBrandQuery(brandRef) {
  const q = query(
    productRef,
    where("status", "==", true),
    where("brand_id", "==", brandRef)
  );
  return q;
}

export function fetchProductsByCategoryQuery(
  categoryId,
  lastDoc = null,
  pageLimit = 25
) {
  let q = null;
  if (lastDoc) {
    q = query(
      productRef,
      where("status", "==", true),
      where("category.id", "==", categoryId),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageLimit)
    );
  } else {
    q = query(
      productRef,
      where("status", "==", true),
      where("categoryId", "==", categoryId),
      orderBy("createdAt", "desc"),
      limit(pageLimit)
    );
  }
  return q;
}

export function fetchProductsBySubcategoryQuery(
  subcategoryId,
  lastDoc = null,
  pageLimit = 25
) {
  let q = null;
  if (lastDoc) {
    q = query(
      productRef,
      where("status", "==", true),
      where("subcategory.id", "==", subcategoryId),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageLimit)
    );
  } else {
    q = query(
      productRef,
      where("status", "==", true),
      where("subcategory.id", "==", subcategoryId),
      orderBy("createdAt", "desc"),
      limit(pageLimit)
    );
  }
  return q;
}

export function fetchProductsBySearchQuery(search) {
  const q = query(
    productRef,
    where("status", "==", true),
    where("name", "==", search)
  );
  return q;
}

export function fetchProductsByParamsQuery(
  params,
  lastDoc = null,
  pageLimit = 25
) {
  const customQueryConstraints = Object.keys(params).reduce((acc, key) => {
    return [...acc, where(`${key}.id`, "==", params[key])];
  }, []);
  let q = query(productRef, ...customQueryConstraints);
  if (lastDoc) q = query(q, startAfter(lastDoc), limit(pageLimit));
  else q = query(q, limit(pageLimit));
  return q;
}
