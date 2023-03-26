import { logEvent } from "firebase/analytics";
import { getFirebase } from "./index";

export function logAnalyticsEvent(name, params) {
  const { analytics } = getFirebase();
  if (process.env.NODE_ENV === "development") {
    console.log("logAnalyticsEvent", name, params);
    return;
  }
  
  logEvent(analytics, name, params);
}

export const idConverter = {
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};