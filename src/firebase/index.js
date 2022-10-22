// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";

import {
  getAuth,
  connectAuthEmulator,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import config from "./config";

function connectToEmulators({ app, auth, db }) {
  if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, "localhost", 8080);
  }
  return { app, auth, db };
}

function enableOffline({ db, app, auth }) {
  enableMultiTabIndexedDbPersistence(db);
  return { db, app, auth };
}


// Initialize Firebase
export function initialize() {
  const app = initializeApp(config.firebase);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);

  (async () => {
    await setPersistence(auth, browserLocalPersistence);
  })();

  return {
    app,
    analytics,
    db,
    auth,
  };
}

export function getFirebase() {
  const existingApp = getApps()?.at(0);
  if (existingApp) return initialize();
  const services = connectToEmulators(initialize());
  return enableOffline(services);
}
