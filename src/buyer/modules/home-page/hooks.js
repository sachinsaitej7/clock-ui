import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { ProductQuery } from "../../queries";
import { getFirebase } from "app/firebase";
import { getIdConverter } from "../../queries/utils";
const { db } = getFirebase();

const idConverter = getIdConverter();
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
