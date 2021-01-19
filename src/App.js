import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import { Route, Switch } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
// import { generateProfile } from "./components/UserProfileGenerator";

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={SignIn} exact />
        <Route path="/signUp" component={SignUp} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/resetPassword" component={ResetPassword} />
      </Switch>
    </div>
  );
}
