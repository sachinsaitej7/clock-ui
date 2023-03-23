import {
  useDocumentDataOnce,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";

import { ProductQuery, ProfileQuery } from "@buyer/queries";

export function useProduct(id) {
  return useDocumentDataOnce(ProductQuery.fetchProductQuery(id));
}

export function useProductImages(id) {
  return useCollectionDataOnce(ProductQuery.fetchProductImagesQuery(id));
}

export function useProductVariants(id) {
  return useCollectionDataOnce(ProductQuery.fetchProductVariantsQuery(id));
}

export function useUserProfile(id) {
  return useDocumentDataOnce(ProfileQuery.fetchUserProfileQuery(id));
}

export function usePincodeCheck(pincode) {
  return useCollectionDataOnce(ProductQuery.fetchPincodeCheckQuery(pincode));
}

export function useProductsByBrand(brandId) {
  return useCollectionDataOnce(
    ProductQuery.fetchProductsByBrandQuery(brandId, undefined, 5)
  );
}
