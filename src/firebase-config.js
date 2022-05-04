// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTPoreZ4HgzyeLivzf1b09tkPYnEyAZC8",
  authDomain: "clock-poc-11334.firebaseapp.com",
  projectId: "clock-poc-11334",
  storageBucket: "clock-poc-11334.appspot.com",
  messagingSenderId: "1053975472881",
  appId: "1:1053975472881:web:d7c2adb4898cb16804d750",
  measurementId: "G-GH0QBB8DG5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
const auth = getAuth(app);
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

