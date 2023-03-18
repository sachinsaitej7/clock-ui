import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { ProductQuery } from "../../queries";

export function useProducts() {
  return useCollectionDataOnce(ProductQuery.fetchProductsQuery());
}

export function useBrands() {
  return useCollectionDataOnce(ProductQuery.fetchBrandsQuery());
}

export function useCategories() {
  return useCollectionDataOnce(ProductQuery.fetchCategoriesQuery());
}

export function useSubcategories() {
  return useCollectionDataOnce(ProductQuery.fetchSubcategoriesQuery());
}
