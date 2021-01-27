import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, googleAuth, firestore } from "../../FirebaseConfig";
import { useGenerateUserDocument } from "../../customHooks/useGenerateUser";
import { useSignInWithGoogle } from "../../customHooks/useGoogleUser";
import { useLocation, useHistory } from "react-router-dom";
import { signOut } from "../redux/actions";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actions";
import { FaLocationArrow, FaHeart, FaHome } from "react-icons/fa";

export default function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const displayName = useSelector((state) => state.account.displayName);
  const photoURL = useSelector((state) => state.account.photoURL);

  const photoLiterals = useSelector((state) => state.account.photoLiterals);
  useSignInWithGoogle(auth, googleAuth, location.method);
  useGenerateUserDocument(location.user, location.method);

  const getUpperCaseUserName = (name) => {
    let userName = name.split(" ")[0].charAt(0).toUpperCase();
    return userName + name.split(" ")[0].slice(1);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName !== null) {
          let photo;
          if (localStorage.getItem("user") !== null) {
            photo = localStorage.getItem("user");
            photo = JSON.parse(photo);
          }
          // console.log(
          //   "user logged in: ",
          //   user.displayName,
          //   user.email,
          //   user.photoURL
          // );

          dispatch(
            logIn(
              user.email,
              user.displayName,
              photoURL || photo.photoURL,
              null
            )
          );
        } else {
          let data;
          firestore
            .collection("users")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.data().email === user.email) data = doc.data();
              });
              data.photoURL !== null
                ? dispatch(
                    logIn(data.email, data.displayName, data.photoURL, null)
                  )
                : dispatch(
                    logIn(
                      data.email,
                      data.displayName,
                      null,
                      data.photoLiterals
                    )
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

  return true ? (
    <div
      style={{
        display: "flex",
        // justifyContent: "space-between",
        margin: "0 2vw 0 2vw",
      }}
    >
      <h6
        className="instagarm-heading"
        onClick={(e) => {
          e.preventDefault();
          history.push({
            pathname: "./profile",
          });
        }}
        style={{ cursor: "pointer", flex: ".2", justifySelf: "start" }}
      >
        Instagram
      </h6>

      {/* <h2>
        {(photoURL || photoLiterals) && photoURL !== null ? (
          <img src={photoURL} alt="cant find display img" style={imageStyle} />
        ) : (photoURL || photoLiterals) && photoURL === null ? (
          <div style={imageStyle}>{photoLiterals}</div>
        ) : (
          console.log("Loading")
        )}
      </h2> */}
      <div
        style={{
          flex: "1",
          justifyContent: "flex-end",
          display: "flex",
          // justifyContent: "space-around",
          paddingRight: "2vw",
        }}
      >
        <h2
          style={{ cursor: "pointer", paddingRight: "2.6vw" }}
          onClick={() => history.push("./profile")}
        >
          <FaHome />
        </h2>
        <h2
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: "./friendsFeed",
              type: "friends",
              friendsType: "all",
            });
          }}
          style={{ cursor: "pointer", paddingRight: "2.6vw" }}
        >
          <FaLocationArrow />
        </h2>
        <h2
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: "./likedPosts",
              type: "liked",
            });
          }}
          style={{ cursor: "pointer", paddingRight: "2.6vw" }}
        >
          <FaHeart />
        </h2>

        <div style={{ display: "flex" }}>
          <h2 className="user-name">
            {displayName && getUpperCaseUserName(displayName)} / &nbsp;
          </h2>
          <div
            className="signout-button"
            style={{
              margin: "2.9vh 0vw 7vh 0vw ",
              padding: (photoURL || photoLiterals) && "0.2vw 0.4vw",
              border: (photoURL || photoLiterals) && "1px solid gray",
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
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
