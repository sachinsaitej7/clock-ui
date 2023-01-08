import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { ProductQuery, BrandQuery } from "../../queries";
import { getLastDoc } from "../../queries/utils";

export function useBrand(id) {
  return useDocumentDataOnce(BrandQuery.fetchBrandQuery(id));
}

export function useProductsByBrand(brandId, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionDataOnce(
    ProductQuery.fetchProductsByBrandQuery(brandId, lastDoc)
  );
}
