import { useState, useEffect } from "react";
import { getPayload } from "./utils";

export function usePayload(items, user, activeAddress) {
  const [payload, setPayload] = useState(null);
  useEffect(() => {
    if (user)
      getPayload(items, user, activeAddress).then((payload) => {
        setPayload(payload);
      });
  }, [user, items, activeAddress]);

  return payload;
}
