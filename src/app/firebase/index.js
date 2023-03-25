// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
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

function connectToEmulators({ app, auth, db, storage, appCheck, functions }) {
  if (process.env.NODE_ENV === "development") {
    console.log("Connecting to emulators");
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, "localhost", 8080);
    connectStorageEmulator(storage, "localhost", 9199);
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
  return { app, auth, db, storage, appCheck, functions };
}

function enableOffline({ db, app, auth, storage, appCheck, functions }) {
  enableMultiTabIndexedDbPersistence(db);
  return { db, app, auth, storage, appCheck, functions };
}

window.FIREBASE_APPCHECK_DEBUG_TOKEN =
  process.env.NODE_ENV === "development" ? true : false;

// eslint-disable-next-line no-restricted-globals
self.FIREBASE_APPCHECK_DEBUG_TOKEN = window.FIREBASE_APPCHECK_DEBUG_TOKEN;

const appCheckConfig = {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA),
  isTokenAutoRefreshEnabled: true,
};

// app-check
function initializeAppCheckApp(app) {
  const appCheck = initializeAppCheck(app, appCheckConfig);
  return appCheck;
}

// Initialize Firebase
export function initialize() {
  const app = initializeApp(config.firebase);
  const appCheck = initializeAppCheckApp(app);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app, "gs://clock-poc-11334.appspot.com");
  let functions = null;
  // if (process.env.NODE_ENV === "development") {
  functions = getFunctions(app);
  // } else {
  //   functions = getFunctions(app, "asia-south1");
  // }

  (async () => {
    await setPersistence(auth, browserLocalPersistence);
  })();

  return {
    app,
    analytics,
    db,
    auth,
    storage,
    appCheck,
    functions,
  };
}

export function getFirebase() {
  const existingApp = getApps()?.at(0);
  if (existingApp) return initialize();
  const services = connectToEmulators(initialize());
  return enableOffline(services);
}
