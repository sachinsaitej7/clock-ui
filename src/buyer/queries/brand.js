import { getFirebase } from "app/firebase";
import { doc } from "firebase/firestore";
import { getIdConverter } from "./utils";

const { db } = getFirebase();
const idConverter = getIdConverter();

export function fetchBrandQuery(id) {
  if (!id) return null;
  const brandRef = doc(db, "brand", id).withConverter(idConverter);
  return brandRef;
}
