import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import "../../styles/Profile.scss";
import { useSelector } from "react-redux";

function LikedPosts() {
  const displayName = useSelector((state) => state.account.displayName);
  return (
    <div>
      <NavBar />

      {displayName && <Profile />}
    </div>
  );
}

export default LikedPosts;
