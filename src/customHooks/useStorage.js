import { useState, useEffect } from "react";
import { storage, firestore, timestamp } from "../FirebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import { logIn } from "../components/redux/actions";

export const useStorage = (file, caption) => {
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

export const useUpdateProfile = (file, email) => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const displayName = useSelector((state) => state.account.displayName);
  const dispatch = useDispatch();

  useEffect(() => {
    // references
    const storageRef = storage.ref(file.name);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {},
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        firestore
          .collection("users")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().email === email) {
                firebase.firestore().collection("users").doc(doc.id).update({
                  photoLiterals: null,
                  photoURL: url,
                });
              }
            });
          });
        setUrl(url);
      }
    );
  }, [file]);
  dispatch(logIn(email, displayName, url, null));
  return { url, error };
};
