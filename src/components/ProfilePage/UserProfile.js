import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import "../../styles/accountPage.scss";
import {
  useFollowers,
  usePosts,
  useFollowing,
} from "../../customHooks/userCred";
import { FaCartArrowDown, FaUpload } from "react-icons/fa";

export default function UserProfile() {
  const displayName = useSelector((state) => state.account.displayName);
  const email = useSelector((state) => state.account.email);
  const photoLiterals = useSelector((state) => state.account.photoLiterals);
  const photoURL = useSelector((state) => state.account.photoURL);
  const { followers } = useFollowers(email);
  const { posts } = usePosts(email);
  const { following } = useFollowing(email);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");

      // setTimeout(() => console.log(selected), 1000);
    } else {
      setFile(null);
    }
  };
  return (
    <div style={{ position: "fixed" }}>
      <div className="user-profile">
        <label className="label">
          <input type="file" onChange={handleChange} />
          <span style={{ fontSize: "6vh" }}>
            {photoLiterals === null ? (
              <img src={photoURL} className="user-display-photo" />
            ) : (
              <div className="user-display-photo-1">{photoLiterals}</div>
            )}
            <h2 className="overlay">
              <FaUpload />
            </h2>
          </span>
        </label>

        <div className="user-display-name">{displayName}</div>
        <div className="user-display-email">{email}</div>
      </div>
      <div className="user-credentials">
        <div className="user-followers">
          {followers.followers}{" "}
          {followers.followers > 1 ? "followers" : "follower"}
        </div>
        <div className="user-posts">
          {posts.posts} {posts.posts > 1 ? "posts" : "post"}
        </div>
        <div className="user-following">{following.following} following</div>
      </div>
      {file && <UpdateProfile email={email} file={file} setFile={setFile} />}
    </div>
  );
}
