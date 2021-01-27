import React, { useState } from "react";
import { useAllUsers, useFollowers } from "../../customHooks/useFollowers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { followerList } from "../redux/actions";
import { useHistory } from "react-router-dom";
export default function FollowersFeed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { docs } = useAllUsers("users");
  const email = useSelector((state) => state.account.email);
  const { followers } = useFollowers(docs);
  const [followerStatus, setFollowerStatus] = useState([]);

  React.useEffect(() => {
    let status = [];

    followers.fol && followers.fol.length > 0
      ? followers.fol.map((follower, index) => {
          if (!follower.includes(email)) {
            status[index] = false;
          } else {
            status[index] = true;
          }
        })
      : console.log("did not recieved data yet", followers);
    // console.log("status is ", status);
    setFollowerStatus(status);
  }, [followers]);

  const showFeed = (email, name) => {
    const emails = ["specific_user", email, name];
    dispatch(followerList(emails));
    history.push({
      pathname: "./friendsFeed",
      type: "friends",
    });
  };

  return (
    <div style={{ margin: "0vh 7vw 4vh 7vw" }}>
      {" "}
      <div
        style={{
          display: "flex",
        }}
      >
        {docs
          ? docs.map((doc, index) => {
              return doc.email !== email && followerStatus[index] === true ? (
                <div style={{ paddingRight: "1vw" }}>
                  <span>
                    {doc.photoURL ? (
                      <div onClick={() => showFeed(doc.email, doc.displayName)}>
                        <img className="feed-photo" src={doc.photoURL} />
                      </div>
                    ) : (
                      <div onClick={() => showFeed(doc.email, doc.displayName)}>
                        <div className="feed-photo">{doc.photoLiterals}</div>
                      </div>
                    )}
                  </span>
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
