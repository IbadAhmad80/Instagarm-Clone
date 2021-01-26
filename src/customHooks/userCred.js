import { firestore } from "../FirebaseConfig";
import React from "react";
export const useFollowers = (email) => {
  const [followers, setFollowers] = React.useState({
    followers: 0,
  });
  React.useEffect(() => {
    firestore
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(
        (snapshot) => {
          setFollowers({
            followers: snapshot.docs[0].data().followers.length,
          });
        },
        [email]
      );
  }, [email]);

  return { followers };
};

export const usePosts = (email) => {
  const [posts, setPosts] = React.useState({
    posts: 0,
  });
  let post = 0;
  React.useEffect(() => {
    const unsub = firestore.collection("posts").onSnapshot((snap) => {
      snap.forEach((doc) => {
        doc.data().userEmail === snap.docs[0].data().userEmail
          ? (post = 0)
          : (post = post);
        if (doc.data().userEmail === email) {
          post = post + 1;
        }
      });

      setPosts({ posts: post });
    });
  }, [email]);
  return { posts };
};
// console.log(documents);

// firestore
//   .collection("posts")
//   .where("userEmail", "==", email)
//   .get()
//   .then((snapshot) => {
//     setPosts({ posts: snapshot.docs.length });
//   });
export const useFollowing = (email) => {
  const [following, setFollowing] = React.useState({
    following: 0,
  });
  let count = 0;
  React.useEffect(() => {
    firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().followers && doc.data().followers.includes(email)) {
            count = count + 1;
            // console.log(doc.data());
          }
        });
        setFollowing({ following: count });
      });
  }, [email]);
  return { following };
};
