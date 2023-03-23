import {
  useDocumentDataOnce,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { ProductQuery, BrandQuery, ProfileQuery } from "@buyer/queries";

export function useProduct(id) {
  return useDocumentDataOnce(ProductQuery.fetchProductQuery(id));
}

export function useBrand(id) {
  return useDocumentDataOnce(BrandQuery.fetchBrandQuery(id));
}

export function useProductImages(id) {
  return useCollectionData(ProductQuery.fetchProductImagesQuery(id));
}

export function useProductVariants(id) {
  return useCollectionData(ProductQuery.fetchProductVariantsQuery(id));
}

export function useUserProfile(id) {
  return useDocumentDataOnce(ProfileQuery.fetchUserProfileQuery(id));
}
