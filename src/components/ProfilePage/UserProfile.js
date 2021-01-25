import React from "react";
import { useSelector } from "react-redux";
import {
  useFollowers,
  // usePosts,
  useFollowing,
} from "../../customHooks/userCred";

export default function UserProfile() {
  const displayName = useSelector((state) => state.account.displayName);
  const email = useSelector((state) => state.account.email);
  const photoLiterals = useSelector((state) => state.account.photoLiterals);
  const photoURL = useSelector((state) => state.account.photoURL);
  const { followers } = useFollowers(email);
  // const { posts } = usePosts(email);
  const { following } = useFollowing(email);
  console.log("hi");
  return (
    <div>
      <div className="user-profile">
        {photoLiterals === null ? (
          <img src={photoURL} className="user-display-photo" />
        ) : (
          <div className="user-display-photo-1">{photoLiterals}</div>
        )}

        <div className="user-display-name">{displayName}</div>
        <div className="user-display-email">{email}</div>
      </div>
      <div className="user-credentials">
        <div className="user-followers">
          {followers.followers}{" "}
          {followers.followers > 1 ? "followers" : "follower"}
        </div>
        <div className="user-posts">
          {followers.posts} {followers.posts > 1 ? "posts" : "post"}
        </div>
        <div className="user-following">{following.following} following</div>
      </div>
    </div>
  );
}
