// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU4ZNoxcH5RYOO0V-TD9oUmq4bLRP6M7E",
  authDomain: "stay-interview-personal.firebaseapp.com",
  projectId: "stay-interview-personal",
  storageBucket: "stay-interview-personal.firebasestorage.app",
  messagingSenderId: "491523961463",
  appId: "1:491523961463:web:beaf5a46e52a3aa2130c72",
  measurementId: "G-LQGW5TSWBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();