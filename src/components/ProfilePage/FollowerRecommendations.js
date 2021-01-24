import React, { useState } from "react";
import { firestore, imageStyle } from "../../FirebaseConfig";
import firebase from "firebase/app";
import { useAllUsers, useFollowers } from "../../customHooks/useFollowers";
import { useSelector } from "react-redux";
import { imageStyle_1 } from "../../FirebaseConfig";

export default function FollowerRecommendations() {
  let status = [];
  const { docs } = useAllUsers("users");
  const email = useSelector((state) => state.email);
  const { followers } = useFollowers(docs);
  const [followerStatus, setFollowerStatus] = useState([]);
  const setFollower = (email, index) => {
    // if (followers.fol[index].includes(email)){
    //   return
    // }
  };
  React.useEffect(() => {
    console.log("followers in useEffect", followers);
    followers && followers.length > 0
      ? followers.map((follower, index) => {
          if (!follower.includes(email)) {
            console.log("in follow index", index);
            status[index] = "Follow";
          } else {
            console.log("in follower index", index);
            status[index] = "Following";
          }
        })
      : console.log("did not recieved data yet", followers);
    console.log("status is ", status);
    setFollowerStatus(status);
  }, [followers]);

  const handleFollower = async (index, id) => {
    console.log(index, id);
    if (status[index] === "Follow") {
      console.log("a gya ha");
      const docRef = firestore.collection("users").doc(id);
      await docRef.update({
        followers: firebase.firestore.FieldValue.arrayUnion(email),
      });
      status[index] = "Following";
      setFollowerStatus(status);
    }
  };

  return (
    <div
      style={{
        margin: "16vh 5vw 0vh 4vw",
        width: "32vw",
        paddingTop: "0",
      }}
    >
      {docs
        ? docs.map((doc, index) => {
            return (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  {doc.photoURL ? (
                    <div style={{ display: "flex", marginBottom: "1vh" }}>
                      <img style={imageStyle_1} src={doc.photoURL} />
                      <div
                        style={{ margin: "35px 0px 0px 0px" }}
                        className="follower-list-name"
                      >
                        &nbsp;&nbsp; {doc.displayName.split(" ")[0]}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", marginBottom: "1vh" }}>
                      <div style={imageStyle_1}>{doc.photoLiterals}</div>
                      <div
                        style={{ margin: "35px 0px 0px 0px" }}
                        className="follower-list-name"
                      >
                        &nbsp;&nbsp;{doc.displayName.split(" ")[0]}
                      </div>
                    </div>
                  )}
                </span>
                <span
                  className="following-status"
                  style={{
                    paddingTop: "5.5vh",
                    cursor: "pointer",
                    color: "blue",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleFollower(index, doc.id);
                  }}
                >
                  {followerStatus[index]}
                </span>
              </div>
            );
          })
        : console.log("users are", docs)}
    </div>
  );
}
