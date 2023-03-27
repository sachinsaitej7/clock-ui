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
  return useCollectionDataOnce(ProductQuery.fetchSizesQuery(), {
    fromCache: true,
  });
}

export function useSubCategoryById(id) {
  return useCollectionDataOnce(ProductQuery.fetchSubCategoryByIdQuery(id));
}

export function useGetPaginatedProducts({ filterValues = {} } = {}) {
  const [lastSnapshot, setLastSnapshot] = useState(null);
  const [searchParams] = useSearchParams();
  const params = { ...getParams(searchParams), ...filterValues };

  const [products, setProducts] = useState([]);
  const [productsData, productsLoading, , snapshot] = useProductsByParams(
    params,
    lastSnapshot
  );

  const isLastPage = snapshot?.docs?.length < 25;
  const isEmptyPage = productsData?.length === 0 && products.length === 0;
  const stringifyParams = JSON.stringify(params);

  useEffect(() => {
    setProducts([]);
  }, [stringifyParams]);

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

export function useCollectionName(products) {
  const [searchParams] = useSearchParams();
  const collectionName = getCollectionName(searchParams, products);
  const [name, setName] = useState(collectionName);

  useEffect(() => {
    products.length > 0 && setName(collectionName);
  }, [collectionName]);
  
  return name;
}
