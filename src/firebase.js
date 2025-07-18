// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBWrqKdJnqxVV8aPpbaZiaW3PMI3Q-pyr4",
  authDomain: "moodapp-9765d.firebaseapp.com",
  projectId: "moodapp-9765d",
  storageBucket: "moodapp-9765d.firebasestorage.app",
  messagingSenderId: "154656982519",
  appId: "1:154656982519:web:5c1fd980e13e4be374daf2",
  measurementId: "G-L379CP5GP6"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
