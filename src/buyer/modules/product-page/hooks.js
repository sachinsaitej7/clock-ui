import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { ProductQuery, BrandQuery } from "../../queries";

export function useProduct(id) {
  return useDocumentData(ProductQuery.fetchProductQuery(id));
}

export function useBrand(id) {
  return useDocumentData(BrandQuery.fetchBrandQuery(id));
}

export function useProductImages(id) {
  return useCollectionData(ProductQuery.fetchProductImagesQuery(id));
}

export function useProductVariants(id) {
  return useCollectionData(ProductQuery.fetchProductVariantsQuery(id));
}
