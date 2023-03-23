import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { ProductQuery, BrandQuery } from "@buyer/queries";

export function useProducts() {
  return useCollectionDataOnce(ProductQuery.fetchProductsQuery());
}

export function useBrands() {
  return useCollectionDataOnce(BrandQuery.fetchBrandsQuery());
}

export function useCategories() {
  return useCollectionDataOnce(ProductQuery.fetchCategoriesQuery());
}

export function useSubcategories() {
  return useCollectionDataOnce(ProductQuery.fetchSubcategoriesQuery());
}

export function useSizes() {
  return useCollectionDataOnce(ProductQuery.fetchSizesQuery());
}
