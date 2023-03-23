import { getFirebase } from "@firebase-app";
import { doc, query, where, collection, orderBy } from "firebase/firestore";
import { getIdConverter } from "./utils";

const { db } = getFirebase();
const idConverter = getIdConverter();

export function fetchBrandQuery(id) {
  if (!id) return;
  const brandRef = doc(db, "brand", id).withConverter(idConverter);
  return brandRef;
}

export function fetchBrandsQuery() {
  const brandRef = collection(db, "brand").withConverter(idConverter);
  const q = query(
    brandRef,
    where("status", "==", true),
    orderBy("createdAt", "desc")
  );
  return q;
}
