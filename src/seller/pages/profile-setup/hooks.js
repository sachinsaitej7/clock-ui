import { useState, useCallback } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { getFirebase } from "@firebase-app";
import { useAuth } from "@app/store";

const { db } = getFirebase();

export const useCheckUserName = (userName) => {
  const userNameRef = userName ? doc(db, "userName", userName) : undefined;
  return useDocumentDataOnce(userNameRef);
};

// function to add a new brandUser
export const addUserProfile = async (id, data) => {
  if (!id) return;
  const newUserProfile = {
    name: data.name,
    userName: data.userName,
    logo:
      data.profileImage ||
      "https://firebasestorage.googleapis.com/v0/b/clock-poc-11334.appspot.com/o/avatar-1577909_1280.webp?alt=media&token=bff9c764-f84b-423d-ba12-90a4e68b9c29",
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const userProfileDoc = doc(db, "userProfile", id);
  await setDoc(userProfileDoc, newUserProfile);
  await setDoc(doc(db, "userName", data.userName), {
    userId: id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: true,
  });
};

export const useAddUserProfile = () => {
  const [user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProfile = useCallback(
    async (data) => {
      if (!user) return;
      try {
        setLoading(true);
        await addUserProfile(user.uid, data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    },
    [user]
  );

  return [createProfile, loading, error];
};
