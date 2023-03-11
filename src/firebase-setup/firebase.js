// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnyF_fqdsLLteRGWz5A8YbcCE02M_3Rhg",
  authDomain: "table-management-9fa4f.firebaseapp.com",
  databaseURL: "https://table-management-9fa4f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "table-management-9fa4f",
  storageBucket: "table-management-9fa4f.appspot.com",
  messagingSenderId: "367308750679",
  appId: "1:367308750679:web:557c61019e2a6b9a074812",
  measurementId: "G-R5JKPMR7CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
