import React from "react";
import UserProfile from "./UserCred";
import Profile from "./Profile";
import "../../styles/Profile.scss";

function ProfileApp() {
  return (
    <div>
      <UserProfile />
      <Profile />
    </div>
  );
}

export default ProfileApp;
