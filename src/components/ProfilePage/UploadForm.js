import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState("");
  const [post, setPost] = useState(false);

  const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png ,jpeg , webp or jpg)");
    }
  };

  return (
    <div>
      <h3>Create a Post</h3>
      <form className="upload-form">
        <input
          className="caption"
          type="text"
          vlaue={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <label>
          <input type="file" onChange={handleChange} />
          <span>+</span>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            setPost(true);
          }}
        >
          POST
        </button>

        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && post === true && (
            <ProgressBar
              file={file}
              caption={caption}
              setFile={setFile}
              setPost={setPost}
              setCaption={setCaption}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
