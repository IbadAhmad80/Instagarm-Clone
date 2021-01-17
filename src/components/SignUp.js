import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import { useHistory } from "react-router-dom";

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
    <div>
      <form
        className="SignInForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Sign Up</h2>
        <br />
        <label>First Name</label>
        <br />
        <input
          className={"userFirstName"}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name"
        />
        <br />
        <label>First Name</label>
        <br />
        <input
          className={"userLastName"}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
        />
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
          history.push("./");
        }}
      >
        Sign In
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

// auth.signInWithEmailAndPassword(email, password).then((cred) => {
//       // close the signup modal & reset form
//       const modal = document.querySelector('#modal-login');
//       M.Modal.getInstance(modal).close();
//       loginForm.reset();
//     })
