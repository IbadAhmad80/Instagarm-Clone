import React, { useEffect } from "react";
import { useUpdateProfile } from "../../customHooks/useStorage";

const UpdateProfile = ({ file, email, setFile }) => {
  const { url } = useUpdateProfile(file, email);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div></div>;
};

export default UpdateProfile;
