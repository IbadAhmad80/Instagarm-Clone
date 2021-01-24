import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UploadForm from "./UploadForm";
import Posts from "./Posts";
import FollowerRecommendations from "./FollowerRecommendations";

function Profile() {
  const location = useLocation();
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App" style={{ display: "flex" }}>
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
        {location.type &&
        (location.type === "friends" || location.type === "liked") ? (
          console.log("")
        ) : (
          <FollowerRecommendations />
        )}
      </div>
    </div>
  );
}

export default Profile;
