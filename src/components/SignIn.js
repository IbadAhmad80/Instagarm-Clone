import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig";

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        setError(null);
        setEmail("");
        setPassword("");
        history.push({
          pathname: "./profile",
          user: {
            email: email,
          },
          method: "signin",
        });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div>
      <form
        className="SignInForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Sign In</h2>
        <br />
        <label>Email</label>
        <br />
        <input
          className={"userEmail"}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your Email"
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          className={"userPassword"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your Password"
        />
        <h6>{error && error}</h6>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("./signUp");
        }}
      >
        Sign Up
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push({
            pathname: "./profile",
            method: "google",
          });
        }}
      >
        Sign in with goggle
      </button>
    </div>
  );
}
