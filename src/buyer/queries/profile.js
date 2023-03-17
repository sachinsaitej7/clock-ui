import { getFirebase } from "app/firebase";
import {
  doc,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { pick } from "lodash";
import { getIdConverter } from "./utils";

const { db } = getFirebase();
const idConverter = getIdConverter();

const userFollowersColRef = collection(db, "userFollowers");

export function fetchUserProfileQuery(id) {
  if (!id) return;
  const userProfileRef = doc(db, "userProfile", id).withConverter(idConverter);
  return userProfileRef;
}

export function fetchUserFollowersQuery(id, profileId) {
  if (!id || !profileId) return;
  const q = query(
    userFollowersColRef,
    where("userId", "==", id),
    where("profileData.id", "==", profileId),
    where("status", "==", true)
  ).withConverter(idConverter);
  return q;
}

export const addUserFollower = async (userId, profileData = {}) => {
  if (!userId || !profileData.id) return;
  const data = {
    userId,
    profileData: pick(profileData, ["id", "name", "logo"]),
    status: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  return await addDoc(userFollowersColRef, data);
};

export async function updateUserFollower(id, data = {}) {
  if (!id) return;
  const updatedData = { ...data, updatedAt: serverTimestamp() };
  return await updateDoc(
    doc(db, "userFollowers", id),
    updatedData
  );
}
