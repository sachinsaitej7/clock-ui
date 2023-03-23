import { useState, useEffect } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useSearchParams } from "react-router-dom";

import { ProductQuery } from "@buyer/queries";
import { getLastDoc } from "@buyer/queries/utils";
import { getParams, getCollectionName } from "./utils";

export function useProductsByParams(params, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionDataOnce(
    ProductQuery.fetchProductsByParamsQuery(params, lastDoc)
  );
}

export function useSizes() {
  return useCollectionDataOnce(ProductQuery.fetchSizesQuery());
}

export function useGetPaginatedProducts() {
  const [lastSnapshot, setLastSnapshot] = useState(null);
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  delete params["size"];

  if (!searchParams.get("sort") || searchParams.get("sort") === "relevance")
    delete params["sort"];
  else params["sort"] = searchParams.get("sort");

  const [products, setProducts] = useState([]);
  const [productsData, productsLoading, , snapshot] = useProductsByParams(
    params,
    lastSnapshot
  );

  const isLastPage = snapshot?.docs.length < 25;

  useEffect(() => {
    setProducts([]);
  }, [searchParams]);

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
  };
}

export function useCollectionName() {
  let [searchParams] = useSearchParams();
  const { products } = useGetPaginatedProducts();
  const [collectionName, setCollectionName] = useState(null);

  const params = getParams(searchParams);

  useEffect(() => {
    if (params) {
      const name = getCollectionName(searchParams, products);
      name && setCollectionName(name);
    }
  }, [params, products, searchParams]);

  return collectionName;
}
