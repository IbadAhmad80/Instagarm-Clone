import { useDispatch } from "react-redux";
import { logIn } from "../components/redux/actions";
// import { projectFirestore } from "../firebase/config";

export const useSignInWithGoogle = (auth, googleAuth, method) => {
  const dispatch = useDispatch();
  if (method !== "google") return;
  auth
    .signInWithPopup(googleAuth)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // console.log("user info", user.email, user.displayName, user.photoURL);
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
};
