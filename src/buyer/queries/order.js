import {
  doc,
  collection,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import { getFirebase } from "@firebase-app";
import { getIdConverter } from "./utils";

const { db, functions } = getFirebase();
const idConverter = getIdConverter();

export const fetchOrderByIdQuery = (id) => {
  if (!id) return;
  return doc(db, "orders", id).withConverter(idConverter);
};

export const fetchOrderItemsQuery = (id) => {
    if (!id) return;
    const orderRef = fetchOrderByIdQuery(id);
    return collection(orderRef, "items").withConverter(idConverter);
};

export const fetchOrdersByUserIdQuery = (userId) => {
  if (!userId) return;
  const ordersRef = collection(db, "orders").withConverter(idConverter);
  const q = query(ordersRef, where("userId", "==", userId));
  return q;
};

export const fetchOrdersBySellerIdQuery = (sellerId) => {
  if (!sellerId) return;
  const ordersRef = collection(db, "orders").withConverter(idConverter);
  const q = query(ordersRef, where("sellerId", "==", sellerId));
  return q;
};

export const fetchOrdersByCreatedByQuery = (creatorId) => {
  if (!creatorId) return;
  const ordersRef = collection(db, "orders").withConverter(idConverter);
  const q = query(ordersRef, where("createdBy", "==", creatorId));
  return q;
};

export const createRazorpayOrder = httpsCallable(
  functions,
  "createRazorpayOrder"
);

export const updateOrderData = async (id, data) => {
  if (!id) return;
  const orderRef = fetchOrderByIdQuery(id);
  const updatedData = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  return await updateDoc(orderRef, updatedData);
};
