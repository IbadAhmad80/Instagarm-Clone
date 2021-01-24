import { firestore } from "../FirebaseConfig";
import react from "react";

export const useFollowers = (docs) => {
  const [followers, setFollowers] = react.useState({ fol: [] });
  let follower = [];

  react.useEffect(() => {
    docs.map((doc) => {
      doc &&
        firestore
          .collection("users")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((document) => {
              if (document.data().email === doc.email) {
                // console.log("followers in hook", snapshot.docs[0].data().followers);
                follower.push(document.data().followers);
              }
            });
            setFollowers({ fol: follower });
          });
    });
  }, [docs]);

  return { followers };
};

export const useAllUsers = (collection) => {
  const [docs, setDocs] = react.useState([]);

  react.useEffect(() => {
    const unsub = firestore.collection(collection).onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
};
