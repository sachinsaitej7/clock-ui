import { useCollectionData } from "react-firebase-hooks/firestore";
import { ProductQuery } from "../../queries";
import { getLastDoc } from "../../queries/utils";

export function useProductsBySubcategory(subcategoryId, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionData(
    ProductQuery.fetchProductsBySubcategoryQuery(subcategoryId, lastDoc)
  );
}

export function useProductsByCategory(categoryId, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionData(
    ProductQuery.fetchProductsByCategoryQuery(categoryId, lastDoc)
  );
}

export function useProductsByBrand(brandId, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionData(
    ProductQuery.fetchProductsByBrandQuery(brandId, lastDoc)
  );
}

export function useProductsByParams(params, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionData(
    ProductQuery.fetchProductsByParamsQuery(params, lastDoc)
  );
}
