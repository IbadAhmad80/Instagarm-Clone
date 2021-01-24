import React, { useState } from "react";
import useFirestore from "../../customHooks/useFirestore";
import { firestore, imageStyle } from "../../FirebaseConfig";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { usePhotoFinder } from "../../customHooks/usePhotoFinder";

const Posts = () => {
  const location = useLocation();
  const [comment, setComment] = useState("");
  const { docs } = useFirestore("posts");
  const { photos } = usePhotoFinder(docs);
  const [_, setLiked] = useState(false);
  const displayName = useSelector((state) => state.account.displayName);
  const followers = useSelector((state) => state.follower);

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
        docs.map((doc, index) =>
          location.type && location.type === "friends" ? (
            followers.includes(doc.userEmail) ? (
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
                  {photos.images[index] === null ? (
                    <h6 style={imageStyle}>
                      {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                    </h6>
                  ) : (
                    <img
                      style={imageStyle}
                      src={photos.images[index]}
                      alt="user img"
                    />
                    // <h6 style={imageStyle}>
                    //   {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                    // </h6>
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
                          <span style={{ fontWeight: "bolder" }}>
                            {
                              doc.commentMakers[
                                doc.commentMakers.length - index - 1
                              ].split(" ")[0]
                            }
                          </span>{" "}
                          <span>
                            {" "}
                            : {doc.comments[doc.comments.length - index - 1]}
                          </span>
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
              console.log("")
            )
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
                  {photos.images[index] === null ? (
                    <h6 style={imageStyle}>
                      {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                    </h6>
                  ) : (
                    <img
                      style={imageStyle}
                      src={photos.images[index]}
                      alt="user img"
                    />
                    // <h6 style={imageStyle}>
                    //   {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                    // </h6>
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
                          <span style={{ fontWeight: "bolder" }}>
                            {
                              doc.commentMakers[
                                doc.commentMakers.length - index - 1
                              ].split(" ")[0]
                            }
                          </span>{" "}
                          <span>
                            {" "}
                            : {doc.comments[doc.comments.length - index - 1]}
                          </span>
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
                {photos.images[index] === null ? (
                  <h6 style={imageStyle}>
                    {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                  </h6>
                ) : (
                  <img
                    style={imageStyle}
                    src={photos.images[index]}
                    alt="user img"
                  />
                  // <h6 style={imageStyle}>
                  //   {doc.userName.split(" ")[0].toUpperCase().charAt(0)}
                  // </h6>
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
                        <span style={{ fontWeight: "bolder" }}>
                          {
                            doc.commentMakers[
                              doc.commentMakers.length - index - 1
                            ].split(" ")[0]
                          }
                        </span>{" "}
                        <span>
                          {" "}
                          : {doc.comments[doc.comments.length - index - 1]}
                        </span>
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
            console.log("")
          )
        )}
      <br />
      <br />
    </div>
  );
};

export default Posts;
