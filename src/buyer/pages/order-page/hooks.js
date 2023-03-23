import {
  useDocumentDataOnce,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import { OrderQuery } from "@buyer/queries";

export function useGetOrderData(id) {
  return useDocumentDataOnce(OrderQuery.fetchOrderByIdQuery(id));
}

export function useGetOrderItems(id) {
  return useCollectionDataOnce(OrderQuery.fetchOrderItemsQuery(id));
}
