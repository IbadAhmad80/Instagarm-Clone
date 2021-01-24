import React from "react";
import UserProfile from "./UserCred";
import Profile from "./Profile";
import "../../styles/Profile.scss";
import { useSelector } from "react-redux";

function LikedPosts() {
  const displayName = useSelector((state) => state.account.displayName);
  return (
    <div>
      <UserProfile />

      {displayName && <Profile />}
    </div>
  );
}

export default LikedPosts;
