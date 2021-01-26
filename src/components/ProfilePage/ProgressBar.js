import React, { useEffect } from "react";
import { useStorage } from "../../customHooks/useStorage";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setFile, caption, setCaption, setPost }) => {
  const { progress, url } = useStorage(file, caption);

  useEffect(() => {
    if (url) {
      setFile(null);
      setPost(false);
      setCaption("");
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
