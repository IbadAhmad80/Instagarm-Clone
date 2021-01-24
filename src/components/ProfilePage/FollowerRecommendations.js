import React, { useState } from "react";
import { firestore } from "../../FirebaseConfig";
import firebase from "firebase/app";
import { useAllUsers, useFollowers } from "../../customHooks/useFollowers";
import { useSelector, useDispatch } from "react-redux";
import { imageStyle_1 } from "../../FirebaseConfig";
import { followerList } from "../redux/actions";
// import { TiTick } from "react-icons/ti";

export default function FollowerRecommendations() {
  const dispatch = useDispatch();
  const { docs } = useAllUsers("users");
  const email = useSelector((state) => state.account.email);
  const { followers } = useFollowers(docs);
  const [followerStatus, setFollowerStatus] = useState([]);

  React.useEffect(() => {
    let status = [];
    let emails = [];
    if (email) {
      followers.fol && followers.fol.length > 0
        ? followers.fol.map((follower, index) => {
            if (!follower.includes(email)) {
              status[index] = "Follow";
            } else {
              status[index] = "Following";
              emails.push(docs[index].email);
            }
          })
        : console.log("did not recieved data yet", followers);
      setFollowerStatus(status);
    }
    dispatch(followerList(emails));
  }, [followers]);

  const handleFollower = async (index, id) => {
    console.log(index, id);
    if (followerStatus[index] === "Follow") {
      const docRef = firestore.collection("users").doc(id);
      await docRef.update({
        followers: firebase.firestore.FieldValue.arrayUnion(email),
      });
      let statuses = followerStatus;
      statuses[index] = "Following";
      setFollowerStatus(statuses);
    }
  };

  return (
    <div style={{ margin: "6vh 5vw 0vh 4vw" }}>
      <div className="suggestion-heading">Suggestion for You</div>
      <div
        style={{
          width: "32vw",
          paddingTop: "0",
        }}
      >
        {followers.fol.length > 0 && docs
          ? docs.map((doc, index) => {
              return doc.email !== email &&
                followerStatus[index] !== "Following" ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                      marginTop: "5.5vh",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollower(index, doc.id);
                    }}
                  >
                    {followerStatus[index]}
                  </span>
                  {/* <span>
                  {
                    (followerStatus[index] = "Following" ? (
                      <TiTick />
                    ) : (
                      console.log("")
                    ))
                  }
                </span> */}
                </div>
              ) : (
                console.log("current user skipped")
              );
            })
          : console.log("users are", docs)}
      </div>
    </div>
  );
}
