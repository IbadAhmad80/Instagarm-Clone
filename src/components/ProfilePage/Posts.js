import React, { useState } from "react";
import useFirestore from "../../customHooks/useFirestore";
import { firestore } from "../../FirebaseConfig";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const [comment, setComment] = useState("");
  const { docs } = useFirestore("posts");
  const [liked, setLiked] = useState(false);
  const displayName = useSelector((state) => state.displayName);
  const photoURL = useSelector((state) => state.photoURL);

  const imageStyle = {
    width: "48px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "rgb(102, 102, 102)",
    fontSize: "18px",
    color: "white",
    textAlign: "center",
    lineHeight: "50px",
    padding: "0px 0px 0px 2px",
    margin: "20px 4px 0px 4px",
  };

  const getUpperCaseUserName = (name) => {
    let userName = name.split(" ")[0].charAt(0).toUpperCase();
    return userName + name.split(" ")[0].slice(1);
  };

  const addComment = async (id) => {
    const post = firestore.collection("posts").doc(id);
    let data = await post.get();
    let comments = data.data().comments;
    let writers = data.data().commentMakers;
    comment && comments.push(comment);
    writers.push(displayName);
    await post.set(
      { comments: comments, commentMakers: writers },
      { merge: true }
    );
    setComment("");
  };

  const handleLike = async (doc) => {
    if (!doc.likers.includes(displayName)) {
      firestore
        .collection("posts")
        .doc(doc.id)
        .update({
          likes: firebase.firestore.FieldValue.increment(1),
        });

      const docRef = firestore.collection("posts").doc(doc.id);
      await docRef.update({
        likers: firebase.firestore.FieldValue.arrayUnion(displayName),
      });
      setLiked(true);
    } else setLiked(true);
  };

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) =>
          location.type && location.type === "friends" ? (
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              s
              // onClick={() => setSelectedImg(doc.url)}
            >
              <div
                style={{
                  display: "flex",
                  paddingLeft: ".5vw",
                  // border: "1px solid gray",
                  height: "13.6vh",
                }}
              >
                {photoURL === null ? (
                  <h6 style={imageStyle}>
                    {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                  </h6>
                ) : (
                  <img style={imageStyle} src={photoURL} alt="user img" />
                )}

                <h6
                  style={{
                    fontSize: "1.2vw",
                    paddingLeft: ".5vw",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {getUpperCaseUserName(doc.userName)}
                </h6>
              </div>
              <motion.img
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <div style={{ margin: "0vh 2vw 0vh 1vw" }}>
                {" "}
                <motion.div className="image-caption">
                  {" "}
                  {doc.caption}
                </motion.div>
                <motion.div className="likes">
                  <span
                    style={{
                      display: "flex",
                      // border: "1px solid gray",
                      height: "8vh",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(doc);
                    }}
                  >
                    <h5 style={{ fontSize: "4vh" }}>
                      {doc.likers.includes(displayName) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </h5>
                    &nbsp;&nbsp;
                    <h6> {doc.likes}</h6>
                  </span>
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
                    placeholder=" Add the comment"
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
                    Add
                  </button>
                </form>
              </div>
            </motion.div>
          ) : location.type && location.type === "liked" ? (
            doc.likers.includes(displayName) ? (
              <motion.div
                className="img-wrap"
                key={doc.id}
                layout
                whileHover={{ opacity: 1 }}
                s
                // onClick={() => setSelectedImg(doc.url)}
              >
                <div
                  style={{
                    display: "flex",
                    paddingLeft: ".5vw",
                    // border: "1px solid gray",
                    height: "13.6vh",
                  }}
                >
                  {photoURL === null ? (
                    <h6 style={imageStyle}>
                      {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                    </h6>
                  ) : (
                    <img style={imageStyle} src={photoURL} alt="user img" />
                  )}
                  <h6
                    style={{
                      fontSize: "1.2vw",
                      paddingLeft: ".5vw",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {getUpperCaseUserName(doc.userName)}
                  </h6>
                </div>
                <motion.img
                  src={doc.url}
                  alt="uploaded pic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
                <div style={{ margin: "0vh 2vw 0vh 1vw" }}>
                  {" "}
                  <motion.div className="image-caption">
                    {" "}
                    {doc.caption}
                  </motion.div>
                  <motion.div className="likes">
                    <span
                      style={{
                        display: "flex",
                        // border: "1px solid gray",
                        height: "8vh",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(doc);
                      }}
                    >
                      <h5 style={{ fontSize: "4vh" }}>
                        {doc.likers.includes(displayName) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </h5>
                      &nbsp;&nbsp;
                      <h6> {doc.likes}</h6>
                    </span>
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
                      placeholder=" Add the comment"
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
                      Add
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              console.log()
            )
          ) : doc.userName === displayName ? (
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              s
              // onClick={() => setSelectedImg(doc.url)}
            >
              <div
                style={{
                  display: "flex",
                  paddingLeft: ".5vw",
                  // border: "1px solid gray",
                  height: "13.6vh",
                }}
              >
                {photoURL === null ? (
                  <h6 style={imageStyle}>
                    {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                  </h6>
                ) : (
                  <img style={imageStyle} src={photoURL} alt="user img" />
                )}
                <h6
                  style={{
                    fontSize: "1.2vw",
                    paddingLeft: ".5vw",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {getUpperCaseUserName(doc.userName)}
                </h6>
              </div>
              <motion.img
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <div style={{ margin: "0vh 2vw 0vh 1vw" }}>
                {" "}
                <motion.div className="image-caption">
                  {" "}
                  {doc.caption}
                </motion.div>
                <motion.div className="likes">
                  <span
                    style={{
                      display: "flex",
                      // border: "1px solid gray",
                      height: "8vh",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(doc);
                    }}
                  >
                    <h5 style={{ fontSize: "4vh" }}>
                      {doc.likers.includes(displayName) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </h5>
                    &nbsp;&nbsp;
                    <h6> {doc.likes}</h6>
                  </span>
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
                    placeholder=" Add the comment"
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
                    Add
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            console.log("post with this id is from different user", doc.id)
          )
        )}
      <br />
      <br />
    </div>
  );
};

export default Posts;
