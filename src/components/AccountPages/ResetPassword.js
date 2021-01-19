import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../FirebaseConfig";
import "../../styles/accountPage.scss";

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
        setError("Error resetting password ", error);
      });
  };
  return (
    <div className="reset">
      <form onSubmit={handleResetButton} className="reset-from">
        <h5 className="instagarm-heading">Instagarm</h5>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <h6
          style={{
            color: "red",
            fontSize: "1.1vw",
            paddingLeft: "3vw",
            margin: "0vh 0 1vh 10",
          }}
        >
          {error && error}
        </h6>
        <button className="send-email" type="submit">
          Send Reset Link
        </button>
        <button
          className="back-to-sign-in"
          onClick={(e) => {
            e.preventDefault();
            history.push("./");
          }}
        >
          Back to Sign In?
        </button>
      </form>
      <div className="alternative-option">
        <div>Having Trouble finding ? </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.push("./signUp");
          }}
        >
          Create New
        </button>
      </div>
    </div>
  );
}
