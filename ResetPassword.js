import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig";

export default function ResetPassword() {
  const history = useHistory();
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const handleResetButton = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        alert("check email for reset link");
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch((error) => {
        setError("Error resetting password,", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleResetButton}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <h6>{error && error}</h6>
        <button type="submit">Send Email</button>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("./");
        }}
      >
        Back to Sign In?
      </button>
    </div>
  );
}
