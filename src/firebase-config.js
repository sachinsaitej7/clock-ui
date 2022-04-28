// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import {
//   getAuth,
//   browserLocalPersistence,
//   setPersistence,
// } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjM4R2XxKAlFsGxyL2lA53H3qUiQNYS4k",
  authDomain: "clock-xyz.firebaseapp.com",
  projectId: "clock-xyz",
  storageBucket: "clock-xyz.appspot.com",
  messagingSenderId: "345691653660",
  appId: "1:345691653660:web:5d6597c2f1510d618c41d9",
  measurementId: "G-LSQLBQRY8W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
// const auth = getAuth(app);
// (async () => {
//   await setPersistence(auth, browserLocalPersistence);
// })();

