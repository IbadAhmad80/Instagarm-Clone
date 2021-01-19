import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import { useHistory } from "react-router-dom";
import "../styles/accountPage.scss";
import app_store from "../assets/app_store.jpg";
import play_store from "../assets/play_store.jpg";
import { AiOutlineGoogle } from "react-icons/ai";

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // checking user credentials for login
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        setError(null);
        setEmail("");
        setPassword("");
        history.push({
          pathname: "./profile",
          user: {
            email: email,
            displayName: firstName + " " + lastName,
            password: password,
            photoLiterals: null,
          },
          method: "signup",
        });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div className="SignUp">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="form"
      >
        <h5 className="insta-heading">Instagram</h5>
        <input
          className={"userFirstName"}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name"
        />
        <input
          className={"userLastName"}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
        />
        <input
          className={"userEmail"}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your Email"
        />
        <input
          className={"userPassword"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your Password"
        />
        <h6 style={{ color: "red", fontSize: "1.2vw", paddingLeft: "3vw" }}>
          {error && error}
        </h6>
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <h6 class="privacy">
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </h6>
        <div
          style={{
            paddingLeft: "3vw",
            fontFamily: "'Balsamiq Sans', cursive",
          }}
        >
          _____________ OR _____________
        </div>

        <div className="goggle-sign-in">
          <div>
            <AiOutlineGoogle />
          </div>

          <h6
            className="google-btn"
            onClick={(e) => {
              e.preventDefault();
              history.push({
                pathname: "./profile",
                method: "google",
              });
            }}
          >
            Login in with Goggle
          </h6>
        </div>
      </form>
      <div className="alternative-option">
        <div>Dont't have an account yet? </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.push("./");
          }}
        >
          Sign In
        </button>
      </div>
      <div className="download-options">
        <img
          src={app_store}
          alt="app store"
          onClick={
            "https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo"
          }
        />
        <img src={play_store} alt="play store" />{" "}
        {/* https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DD77C7CE3-6112-4F52-A360-C3FC16EFEE65%26utm_content%3Dlo%26utm_medium%3Dbadge */}
      </div>{" "}
    </div>
  );
}
