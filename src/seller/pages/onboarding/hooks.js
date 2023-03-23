import { getFirebase } from "@firebase-app";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const { db } = getFirebase();

const idConverter = {
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

export const useUserProfile = (uuid = "") => {
  const userProfileDoc = doc(db, "userProfile", uuid).withConverter(
    idConverter
  );
  const data = useDocumentData(userProfileDoc);
  return data;
};

// function to add a new brandUser
export const addProfile = async (id, data) => {
  const newUserProfile = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const userProfileDoc = doc(db, "userProfile", id);
  return await setDoc(userProfileDoc, newUserProfile);
};

// function to update a brand listing
export const updateProfile = async (id, data) => {
  const updatedProfileData = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  const userProfileDoc = doc(db, "userProfile", id);
  const data1 = await updateDoc(userProfileDoc, updatedProfileData);
  return data1;
};
