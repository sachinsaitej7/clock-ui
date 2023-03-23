import { useState, useEffect } from "react";
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { ProductQuery, ProfileQuery } from "@buyer/queries";
import { getLastDoc } from "@buyer/queries/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebase } from "@firebase";

const { auth } = getFirebase();

export function useAuth() {
  return useAuthState(auth);
}

export function useUserProfile(id) {
  return useDocumentData(ProfileQuery.fetchUserProfileQuery(id));
}

export function useProductsByProfile(profileId, snapshot) {
  const lastDoc = getLastDoc(snapshot);
  return useCollectionDataOnce(
    ProductQuery.fetchProductsByProfileQuery(profileId, lastDoc)
  );
}

export function useGetUserFollowers(profileId) {
  const [user] = useAuth();
  return useCollectionData(
    ProfileQuery.fetchUserFollowersQuery(user?.uid, profileId)
  );
}

export function useUserFollower(profileData = {}) {
  const [userFollowerId, setUserFollowerId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userFollowers] = useGetUserFollowers(profileData.id);
  const [user] = useAuth();

  useEffect(() => {
    if (Array.isArray(userFollowers)) {
      const userFollower = userFollowers[0];
      setUserFollowerId(userFollower?.id);
    }
  }, [userFollowers]);

  const addFollow = async () => {
    setLoading(true);
    try {
      await ProfileQuery.addUserFollower(user?.uid, profileData);
    } catch (e) {
      console.log("error", e);
      setError(e);
    }
    setLoading(false);
  };

  const removeFollow = async () => {
    setLoading(true);
    try {
      console.log("profileData", userFollowerId);

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

  return { userFollowerId, addFollow, removeFollow, loading, error };
}
