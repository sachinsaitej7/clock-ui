import { useCollectionData } from "react-firebase-hooks/firestore";
import { ProductQuery } from "../../queries";

export function useProducts() {
  return useCollectionData(ProductQuery.fetchProductsQuery());
}

export function useBrands() {
  return useCollectionData(ProductQuery.fetchBrandsQuery());
}

export function useCategories() {
  return useCollectionData(ProductQuery.fetchCategoriesQuery());
}

export function useSubcategories() {
  return useCollectionData(ProductQuery.fetchSubcategoriesQuery());
}
