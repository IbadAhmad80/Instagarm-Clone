import { useDispatch } from "react-redux";
import React from "react";
import { logIn } from "../components/redux/actions";
import firebase from "firebase/app";
import { firestore } from "../FirebaseConfig";
export const useSignInWithGoogle = (auth, googleAuth, method) => {
  const dispatch = useDispatch();
  // const [userCheck, setUserCheck] = React.useState(null);
  React.useEffect(() => {
    if (method !== "google") return true;
    // let res=validateUser()
    auth
      .signInWithPopup(googleAuth)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        console.log("google access token", token);
        // The signed-in user info.
        let user = result.user;
        let { email, displayName, photoURL } = user;
        // console.log("user info", user.email, user.displayName, user.photoURL);
        // let res = validateUser(email);
        let userCheck = null;
        firestore
          .collection("users")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().email === email) {
                firebase.firestore().collection("users").doc(doc.id).update({
                  displayName: user.displayName,
                  photoLiterals: null,
                  photoURL: user.photoURL,
                  followers: [],
                });

                userCheck = true;
              }
            });

            if (userCheck === null) {
              // console.log("in condition", userCheck);
              firestore.collection("users").add({
                displayName,
                email,
                photoLiterals: null,
                photoURL: photoURL,
              });
            }
          });

        dispatch(logIn(user.email, user.displayName, user.photoURL, null));
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        console.log(
          `Response returned with status code ${errorCode} and message ${errorMessage} after signing in with email ${email}`
        );
      });
  }, [method]);

  return true;
};
