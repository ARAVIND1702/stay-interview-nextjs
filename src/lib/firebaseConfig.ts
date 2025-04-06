// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp5db7OdIuVnBCLKiMtCOUuWESX6SMDnE",
  authDomain: "stay-interview-personal-131f7.firebaseapp.com",
  projectId: "stay-interview-personal-131f7",
  storageBucket: "stay-interview-personal-131f7.firebasestorage.app",
  messagingSenderId: "1001610679182",
  appId: "1:1001610679182:web:64ac8da0344cc40e710adf",
  measurementId: "G-LQGW5TSWBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db, collection, doc, setDoc, addDoc };