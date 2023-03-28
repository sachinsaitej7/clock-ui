import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { useAuth } from "@app/store";
import { ProductQuery, ProfileQuery } from "@buyer/queries";
import { getLastDoc } from "@buyer/queries/utils";

import { getParams, getCollectionName } from "./utils";

export function useUserProfile(id) {
  return useDocumentData(ProfileQuery.fetchUserProfileQuery(id));
}

export function useSizes() {
  return useCollectionDataOnce(ProductQuery.fetchSizesQuery());
}

export function useProductsByProfile(profileId, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionDataOnce(
    ProductQuery.fetchProductsByProfileQuery(profileId, lastDoc)
  );
}

export function useProductsByParams(params, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionDataOnce(
    ProductQuery.fetchProductsByParamsQuery(params, lastDoc)
  );
}

export function useGetUserFollowers(profileId) {
  const [user] = useAuth();
  return useCollectionData(
    ProfileQuery.fetchUserFollowersQuery(user?.uid, profileId)
  );
}

export function useGetUserFollowersByProfile(profileId) {
  return useCollectionData(
    ProfileQuery.fetchUserFollowersByProfileQuery(profileId)
  );
}

export function useGetUserFollowersByUser(userId) {
  return useCollectionData(ProfileQuery.fetchUserFollowersByUserQuery(userId));
}

export function useUserFollower(id) {
  const [userFollowerId, setUserFollowerId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData] = useUserProfile(id);
  const [userFollowers] = useGetUserFollowers(id);
  const [user] = useAuth();
  const [userData] = useUserProfile(user?.uid);

  const isFollowing = userFollowers?.length > 0;

  useEffect(() => {
    if (Array.isArray(userFollowers)) {
      const userFollower = userFollowers[0];
      setUserFollowerId(userFollower?.id);
    }
  }, [userFollowers]);

  const addFollow = async () => {
    setLoading(true);
    try {
      await ProfileQuery.addUserFollower(userData, profileData);
    } catch (e) {
      console.log("error", e);
      setError(e);
    }
    setLoading(false);
  };

  const removeFollow = async () => {
    if (!userFollowerId) return;
    if (!user?.uid) return console.log("user not found");
    setLoading(true);
    try {
      await ProfileQuery.updateUserFollower(userFollowerId, {
        userId: user?.uid,
        status: false,
      });
      setUserFollowerId();
    } catch (e) {
      console.log("error", e);
      setError(e);
    }
    setLoading(false);
  };

  return {
    userFollowerId,
    addFollow,
    removeFollow,
    loading,
    error,
    isFollowing,
  };
}

export function useGetPaginatedProducts() {
  const [lastSnapshot, setLastSnapshot] = useState(null);
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [products, setProducts] = useState([]);
  const [productsData, productsLoading, , snapshot] = useProductsByProfile(
    id,
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
