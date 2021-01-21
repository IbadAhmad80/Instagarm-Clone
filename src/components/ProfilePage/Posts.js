import React, { useState } from "react";
import useFirestore from "../../customHooks/useFirestore";
import { firestore } from "../../FirebaseConfig";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import firebase from "firebase/app";

const Posts = () => {
  const [comment, setComment] = useState("");
  const { docs } = useFirestore("posts");
  const displayName = useSelector((state) => state.displayName);

  const addComment = async (id) => {
    let data;
    const post = firestore.collection("posts").doc(id);
    data = await post.get();
    console.log(data.data());
    let comments = data.data().comments;
    let writers = data.data().commentMakers;
    comments.push(comment);
    writers.push(displayName);
    await post.set(
      { comments: comments, commentMakers: writers },
      { merge: true }
    );
    setComment("");
  };

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            s
            // onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
            <div style={{ margin: "0vh 5vw 0vh 5vw" }}>
              {" "}
              <motion.div className="image-caption"> {doc.caption}</motion.div>
              <motion.div className="likes">
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    firestore
                      .collection("posts")
                      .doc(doc.id)
                      .update({
                        likes: firebase.firestore.FieldValue.increment(1),
                      });
                  }}
                >
                  likes:&nbsp;&nbsp;
                </span>
                {doc.likes}
              </motion.div>
              {doc.comments &&
                doc.comments.map((comment, index) =>
                  index < 2 ? (
                    <motion.div className="comments">
                      {
                        doc.commentMakers[
                          doc.commentMakers.length - index - 1
                        ].split(" ")[0]
                      }
                      : {doc.comments[doc.comments.length - index - 1]}
                    </motion.div>
                  ) : (
                    console.log("")
                  )
                )}
              <form>
                <input
                  className="comment-input"
                  type="text"
                  placeholder=" add the comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="comment-button"
                  onClick={(e) => {
                    e.preventDefault();
                    addComment(doc.id);
                  }}
                >
                  Add comment
                </button>
              </form>
            </div>
          </motion.div>
        ))}
      <br />
      <br />
    </div>
  );
};

export default Posts;
