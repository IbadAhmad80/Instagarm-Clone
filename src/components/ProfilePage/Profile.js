import React, { useState } from "react";

import UploadForm from "./UploadForm";
import Posts from "./Posts";
import Modal from "./Modal";
import "../../styles/index.css";

function Profile() {
  return (
    <div className="App">
      <UploadForm />
      <Posts setSelectedImg={setSelectedImg} />
    </div>
  );
}

export default Profile;
