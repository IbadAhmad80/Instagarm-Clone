import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UploadForm from "./UploadForm";
import { useSelector } from "react-redux";
import FollowersFeed from "./FollowersFeed";
import UserProfile from "./UserProfile";

import Posts from "./Posts";
import FollowerRecommendations from "./FollowerRecommendations";

function Profile() {
  const email = useSelector((state) => state.account.email);
  const location = useLocation();
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      {!location.type && email ? <FollowersFeed /> : console.log("")}
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          {email && !location.type ? <UploadForm /> : console.log("")}
          <Posts setSelectedImg={setSelectedImg} />
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {!location.type && email ? <UserProfile /> : console.log("")}
          {location.type && location.type === "friends" && email ? (
            <FollowerRecommendations />
          ) : (
            console.log("")
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
