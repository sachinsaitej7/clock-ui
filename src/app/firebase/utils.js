import { logEvent } from "firebase/analytics";
import { getFirebase } from "./index";

export function logAnalyticsEvent(name, params) {
  const { analytics } = getFirebase();
  console.log("logAnalyticsEvent", name, params);
  logEvent(analytics, name, params);
}
