import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { ProductQuery } from "../../queries";

export function useProduct(id) {
  return useDocumentData(ProductQuery.fetchProductQuery(id));
}

export function useProductImages(id) {
  return useCollectionData(ProductQuery.fetchProductImagesQuery(id));
}

export function useProductVariants(id) {
  return useCollectionData(ProductQuery.fetchProductVariantsQuery(id));
}
