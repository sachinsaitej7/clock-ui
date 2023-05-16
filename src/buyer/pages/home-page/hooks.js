import { useState, useEffect } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { ProductQuery, BrandQuery } from "@buyer/queries";
import { getLastDoc } from "@buyer/queries/utils";


export function useProducts(snapshot = null, limit = 25) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionDataOnce(ProductQuery.fetchProductsQuery(lastDoc, limit));
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


export function useGetPaginatedProducts() {
  const [lastSnapshot, setLastSnapshot] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsData, productsLoading, , snapshot] = useProducts(
    lastSnapshot,
    15
  );

  const isLastPage = snapshot?.docs?.length < 15;
  const isEmptyPage = productsData?.length === 0 && products.length === 0;

  useEffect(() => {
    if (productsData) setProducts((p) => [...p, ...productsData]);
  }, [productsData]);

  return {
    products,
    productsData,
    productsLoading,
    snapshot,
    setLastSnapshot,
    lastSnapshot,
    isLastPage,
    isEmptyPage,
  };
}
