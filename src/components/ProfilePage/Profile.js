import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UploadForm from "./UploadForm";
import { useSelector } from "react-redux";
import FollowersFeed from "./FollowersFeed";

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
          {location.type &&
          (location.type === "friends" || location.type === "liked") ? (
            console.log("")
          ) : (
            <UploadForm />
          )}
          <Posts setSelectedImg={setSelectedImg} />
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {!location.type && email ? (
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
