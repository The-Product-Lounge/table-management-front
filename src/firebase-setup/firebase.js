// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpBDwmI88LI3mhdhW77DUNIl9ZmsFlUu8",
  authDomain: "table-management-lounge.firebaseapp.com",
  databaseURL: "https://table-management-lounge-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "table-management-lounge",
  storageBucket: "table-management-lounge.appspot.com",
  messagingSenderId: "284378515607",
  appId: "1:284378515607:web:f530de6965c37d355401d2",
  measurementId: "G-JS3L2FZKJ6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
