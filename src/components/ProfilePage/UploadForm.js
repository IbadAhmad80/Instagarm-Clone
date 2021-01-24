import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { AiFillCamera } from "react-icons/ai";

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
    <div className="upload-form">
      <h3 className="create-post">Create a Post</h3>
      <form>
        <input
          className="caption"
          type="text"
          vlaue={caption}
          placeholder="Post Caption .."
          onChange={(e) => setCaption(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "3vh 0vw 0vh 0vw",
          }}
        >
          <label>
            <input type="file" onChange={handleChange} />
            <span style={{ fontSize: "6vh" }}>
              <AiFillCamera />
            </span>
          </label>

          <button
            style={{ marginBottom: "2.5vh" }}
            onClick={(e) => {
              e.preventDefault();
              setPost(true);
              !file && setError("Kindly select any Media to be uploded");
            }}
          >
            CREATE
          </button>
        </div>
        {file && (
          <div
            style={{
              fontSize: "1.9vh",
              marginTop: "-2vh",
              marginBottom: "2vh",
            }}
          >
            &nbsp;{file.name}
          </div>
        )}

        <div className="output">
          {error && <div className="error">{error}</div>}

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
