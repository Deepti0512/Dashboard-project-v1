import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

//Todo : use .env file variables

const firebaseConfig = {
  apiKey: "AIzaSyCNgDtow3ARQ47T79RY4JhcWXvuEEotFy0",
  authDomain: "react-dashboard-v1-60ec7.firebaseapp.com",
  projectId: "react-dashboard-v1-60ec7",
  storageBucket: "react-dashboard-v1-60ec7.appspot.com",
  messagingSenderId: "825125745822",
  appId: "1:825125745822:web:3b028110cd43836e12778f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()