import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const imageStyle = {
  width: "48px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "rgb(102, 102, 102)",
  fontSize: "18px",
  color: "white",
  textAlign: "center",
  lineHeight: "50px",
  padding: "0px 0px 0px 2px",
  margin: "20px 4px 0px 4px",
};

export const imageStyle_1 = {
  width: "40px",
  height: "42px",
  borderRadius: "50%",
  backgroundColor: "rgb(102, 102, 102)",
  fontSize: "14px",
  color: "white",
  textAlign: "center",
  lineHeight: "44px",
  padding: "0px 0px 0px 2px",
  margin: "20px 4px 0px 4px",
};
