// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyDFNMtKmG4L6CbE2SErXDH-R13Gt0zJyxc",
    authDomain: "fruity-5a62f.firebaseapp.com",
    databaseURL: "https://fruity-5a62f-default-rtdb.firebaseio.com",
    projectId: "fruity-5a62f",
    storageBucket: "fruity-5a62f.appspot.com",
    messagingSenderId: "866361968103",
    appId: "1:866361968103:web:672c6edf2b8ff5d5552942",
    measurementId: "G-94WFBTP43N",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}
export default FirebaseConfig;
