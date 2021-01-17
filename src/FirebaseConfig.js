import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6OpTOgTV5q9_mEO2qh9vBsaLEVcj6h1E",
  authDomain: "instagarm-clone-5b04e.firebaseapp.com",
  projectId: "instagarm-clone-5b04e",
  storageBucket: "instagarm-clone-5b04e.appspot.com",
  messagingSenderId: "686772115574",
  appId: "1:686772115574:web:a41f0d5bcb4909e5912757",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
