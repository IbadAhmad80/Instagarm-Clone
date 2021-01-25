import { firestore } from "../FirebaseConfig";
import React from "react";
export const useFollowers = (email) => {
  const [followers, setFollowers] = React.useState({
    followers: 0,
  });
  firestore
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((snapshot) => {
      setFollowers({
        followers: snapshot.docs[0].data().followers.length,
      });
    });
  return { followers };
};

export const usePosts = (email) => {
  const [posts, setPosts] = React.useState({
    posts: 0,
  });

  firestore
    .collection("posts")
    .where("userEmail", "==", email)
    .get()
    .then((snapshot) => {
      setPosts({ posts: snapshot.docs.length });
    });

  return { posts };
};

export const useFollowing = (email) => {
  const [following, setFollowing] = React.useState({
    following: 0,
  });
  let count = 0;

  firestore
    .collection("users")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().followers && doc.data().followers.includes(email)) {
          count = count + 1;
        }
      });
      setFollowing({ following: count });
    });
  return { following };
};
