import { useState, useEffect } from "react";
import { storage, firestore, timestamp } from "../FirebaseConfig";
import { useSelector } from "react-redux";

const useStorage = (file, caption) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const email = useSelector((state) => state.account.email);
  const userName = useSelector((state) => state.account.displayName);

  useEffect(() => {
    // references
    const storageRef = storage.ref(file.name);
    const collectionRef = firestore.collection("posts");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({
          url,
          createdAt,
          caption,
          likes: 0,
          userEmail: email,
          commentMakers: [],
          comments: [],
          userName: userName,
          likers: [],
        });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
