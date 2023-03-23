import { useDocumentData } from "react-firebase-hooks/firestore";

import { ProductQuery } from "@buyer/queries";

export function useProductVariant(id, options) {
  return useDocumentData(ProductQuery.fetchProductVariantQuery(id), options);
}
