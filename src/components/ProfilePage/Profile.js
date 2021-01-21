import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UploadForm from "./UploadForm";
import Posts from "./Posts";

function Profile() {
  const location = useLocation();
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      {location.type && location.type === "friends" ? (
        console.log("")
      ) : (
        <UploadForm />
      )}
      <Posts setSelectedImg={setSelectedImg} />
    </div>
  );
}

export default Profile;
