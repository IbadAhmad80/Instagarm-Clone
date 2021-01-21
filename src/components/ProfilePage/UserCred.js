import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, googleAuth, firestore } from "../../FirebaseConfig";
import { useGenerateUserDocument } from "../../customHooks/useGenerateUser";
import { useSignInWithGoogle } from "../../customHooks/useGoogleUser";
import { useLocation, useHistory } from "react-router-dom";
import { signOut } from "../redux/actions";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actions";

export default function UserProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  useSignInWithGoogle(auth, googleAuth, location.method);
  useGenerateUserDocument(location.user, location.method);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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
  return true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "0 0 0 0",
      }}
    >
      <h2>{email && email}</h2>
      <h2>{displayName && displayName}</h2>
      <h2>
        {(photoURL || photoLiterals) && photoURL !== null ? (
          <img src={photoURL} alt="cant find display img" style={imageStyle} />
        ) : (photoURL || photoLiterals) && photoURL === null ? (
          <div style={imageStyle}>{photoLiterals}</div>
        ) : (
          "Loading"
        )}
      </h2>

      <div
        style={{
          padding: (photoURL || photoLiterals) && "0.4vw 0.6vw",
          border: (photoURL || photoLiterals) && "1px solid gray",
          backgroundColor: (photoURL || photoLiterals) && "beige",
          width: (photoURL || photoLiterals) && "4vw",
          cursor: (photoURL || photoLiterals) && "pointer",
        }}
        onClick={(e) => {
          e.preventDefault();
          auth.signOut();
          history.push("./");
          dispatch(signOut());
        }}
      >
        {(photoURL || photoLiterals) && "Sign out"}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
