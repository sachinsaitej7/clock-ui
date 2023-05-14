import pick from "lodash/pick";
import { useState } from "react";
import {
  useDocumentData,
  useDocumentDataOnce,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import { useAuth } from "@app/store";

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

export function useCheckProductInSaved(id) {
  const [user] = useAuth();
  return useDocumentData(
    ProfileQuery.fetchCheckProductInSavedQuery(user?.uid, id)
  );
}

export function useSaveProduct() {
  const [user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const saveProduct = async (data) => {
    setLoading(true);
    try {
      await ProfileQuery.saveProduct(
        user?.uid,
        pick(data, ["id", "name", "thumbnail", "slug","description" ])
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [saveProduct, loading, error];
}

export function useRemoveSavedProduct(id) {
  const [user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const removeSavedProduct = async () => {
    setLoading(true);
    try {
      await ProfileQuery.removeSavedProduct(user?.uid, id);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [removeSavedProduct, loading, error];
}
