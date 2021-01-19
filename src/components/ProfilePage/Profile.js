import React, { useState } from "react";

import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import "../../styles/index.css";

function Profile() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default Profile;
