import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, googleAuth, firestore } from "../FirebaseConfig";
import { useGenerateUserDocument } from "../customHooks/useGenerateUser";
import { useSignInWithGoogle } from "../customHooks/useGoogleUser";
import { useLocation, useHistory } from "react-router-dom";
import { signOut } from "../components/redux/actions";
import { useDispatch } from "react-redux";
import { logIn } from "../components/redux/actions";

export default function UserProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  useSignInWithGoogle(auth, googleAuth, location.method);
  useGenerateUserDocument(location.user, location.method);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        // console.log("user logged in: ", user.displayName, user.email);
        if (user.displayName !== null) {
          dispatch(logIn(user.email, user.displayName, user.photoURL, null));
        } else {
          let data;
          firestore
            .collection("users")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.data().email === user.email) data = doc.data();
              });
              dispatch(
                logIn(data.email, data.displayName, null, data.photoLiterals)
              );
            })
            .catch((err) => {
              console.log("Error getting documents", err);
            });
        }
      } else {
        console.log("user logged out");
      }
    });
  }, []);

  // setting style for profile image
  const imageStyle = {
    width: "48px",
    height: "50px",
    borderRadius: "50%",
    background: `maroon`,
    fontSize: "18px",
    color: "white",
    textAlign: "center",
    lineHeight: "50px",
    padding: "0 0px 0px 2px",
    margin: "20px 4px",
  };

  const displayName = useSelector((state) => state.displayName);
  const photoURL = useSelector((state) => state.photoURL);
  const email = useSelector((state) => state.email);
  const photoLiterals = useSelector((state) => state.photoLiterals);
  return (
    <div>
      <h2>{email && email}</h2>
      <h2>{displayName && displayName}</h2>
      <h2>
        {photoURL !== null ? (
          <img src={photoURL} alt="cant find display img" />
        ) : (
          <div style={imageStyle}>{photoLiterals}</div>
        )}
      </h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          auth.signOut();
          history.push("./");
          dispatch(signOut());
        }}
      >
        Sign out
      </button>
    </div>
  );
}