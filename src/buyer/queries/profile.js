import { getFirebase } from "@firebase-app";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { pick } from "lodash";
import { getIdConverter } from "./utils";

const { db } = getFirebase();
const idConverter = getIdConverter();

const userFollowersColRef = collection(db, "userFollowers");

const userConvertor = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: data.userId,
      name: data.userData?.name || "",
      logo: data.userData?.logo || "",
      createdAt: data.createdAt,
    };
  },
};

const profileConvertor = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: data.profileData.id,
      name: data.profileData?.name || "",
      logo: data.profileData?.logo || "",
      createdAt: data.createdAt,
    };
  },
};

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

export function fetchUserFollowersByProfileQuery(profileId) {
  if (!profileId) return;
  const q = query(
    userFollowersColRef,
    where("profileData.id", "==", profileId),
    where("status", "==", true)
  ).withConverter(userConvertor);
  return q;
}

export function fetchUserFollowersByUserQuery(userId) {
  if (!userId) return;
  const q = query(
    userFollowersColRef,
    where("userId", "==", userId),
    where("status", "==", true)
  ).withConverter(profileConvertor);
  return q;
}

export const addUserFollower = async (user, profileData = {}) => {
  if (!user || !profileData.id) return;
  const data = {
    userId: user.id,
    userData: pick(user, ["name", "logo"]),
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
  return await updateDoc(doc(db, "userFollowers", id), updatedData);
}

export const addNewAddress = async (id, data) => {
  if (!id || !data) return;
  const updatedData = {
    ...data,
    uuid: id,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    status: true,
  };
  return await addDoc(collection(db, "delivery-address"), updatedData);
};

export const fetchUserAddressQuery = (id) => {
  if (!id) return;
  return query(
    collection(db, "delivery-address"),
    where("uuid", "==", id),
    where("status", "==", true),
    orderBy("updatedAt", "desc")
  ).withConverter(idConverter);
};
