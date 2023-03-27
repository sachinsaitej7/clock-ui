import { getFirebase } from "@firebase-app";
import {
  collection,
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
} from "firebase/firestore";
import { SORT_QUERY_MAP } from "@buyer/constants";

import { getIdConverter } from "./utils";
import { isEmpty } from "lodash";

const { db } = getFirebase();
const idConverter = getIdConverter();
const productRef = collection(db, "product").withConverter(idConverter);

export function fetchSizesQuery() {
  const sizeRef = collection(db, "size").withConverter(idConverter);
  const q = query(sizeRef, where("status", "==", true));
  return q;
}

export function fetchCategoriesQuery() {
  const categoryRef = collection(db, "category").withConverter(idConverter);
  const q = query(categoryRef, where("status", "==", true));
  return q;
}

export function fetchSubCategoryByIdQuery(id) {
  if (!id) return;
  const subcategoryRef = collectionGroup(db, "subcategory").withConverter(
    idConverter
  );
  const q = query(subcategoryRef, where("status", "==", true), where("__name__", "==", id));
  return q;
}

export function fetchSubcategoriesQuery() {
  const subcategoryRef = collectionGroup(db, "subcategory").withConverter(
    idConverter
  );
  const q = query(subcategoryRef, where("status", "==", true));
  return q;
}

export function fetchProductQuery(id) {
  if (!id) return;
  const productRef = doc(db, "product", id).withConverter(idConverter);
  return productRef;
}

export function fetchProductVariantQuery(id) {
  if (!id) return;
  const productRef = doc(db, "productVariant", id).withConverter(idConverter);
  return productRef;
}

export function fetchProductImagesQuery(id) {
  if (!id) return;
  const productImagesRef = collection(db, `/product/${id}/images`);
  const q = query(productImagesRef);
  return q;
}

export function fetchProductVariantsQuery(id) {
  if (!id) return;
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
  if (!id) return;
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

export function fetchProductsByBrandQuery(
  brandId,
  lastDoc = null,
  pageLimit = 25
) {
  let q = null;
  if (!brandId) return;
  if (lastDoc) {
    q = query(
      productRef,
      where("status", "==", true),
      where("brand.id", "==", brandId),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageLimit)
    );
  } else {
    q = query(
      productRef,
      where("status", "==", true),
      where("brand.id", "==", brandId),
      orderBy("createdAt", "desc"),
      limit(pageLimit)
    );
  }
  return q;
}

export function fetchProductsByProfileQuery(
  profileId,
  lastDoc = null,
  pageLimit = 25
) {
  let q = null;
  if (!profileId) return;
  if (lastDoc) {
    q = query(
      productRef,
      where("status", "==", true),
      where("createdBy", "==", profileId),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageLimit)
    );
  } else {
    q = query(
      productRef,
      where("status", "==", true),
      where("createdBy", "==", profileId),
      orderBy("createdAt", "desc"),
      limit(pageLimit)
    );
  }
  return q;
}

export function fetchProductsByCategoryQuery(
  categoryId,
  lastDoc = null,
  pageLimit = 25
) {
  let q = null;
  if (!categoryId) return;
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
  if (!subcategoryId) return;
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
 const { sort, size, ...rest } = params;
 const customQueryConstraints = Object.keys(rest).reduce((acc, key) => {
   return [...acc, where(`${key}.id`, "==", params[key])];
 }, []);
  customQueryConstraints.push(where("status", "==", true));

  if (!isEmpty(sort)) {
    const sortValue = SORT_QUERY_MAP[sort[0]];
    if (sortValue === "")
      customQueryConstraints.push(orderBy("createdAt", "desc"));
    else customQueryConstraints.push(orderBy("price.currentPrice", sortValue));
  }

  if (!isEmpty(size)) {
    customQueryConstraints.push(
      where("sizes", "array-contains-any", size)
    );
  }

  let q = query(productRef, ...customQueryConstraints);
  if (lastDoc) q = query(q, startAfter(lastDoc), limit(pageLimit));
  else q = query(q, limit(pageLimit));
  return q;
}

export function fetchPincodeCheckQuery(pincode) {
  if (!pincode) return;
  const pincodeColRef = collection(db, "pincode-checker");
  const q = query(pincodeColRef, where("pincode", "==", +pincode));
  return q;
}
