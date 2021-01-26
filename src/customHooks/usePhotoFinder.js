import { firestore } from "../FirebaseConfig";
import React from "react";
export const usePhotoFinder = (docs) => {
  const [photos, setPhotos] = React.useState({ images: [] });

  React.useEffect(() => {
    let documents = [];
    docs.map((document, index) => {
      const unsub = firestore.collection("users").onSnapshot((snap) => {
        snap.forEach((doc) => {
          if (doc.data().email === document.userEmail) {
            index === 0 ? (documents = []) : console.log("");
            documents.push(doc.data().photoURL);
          }
        });

        setPhotos({ images: documents });
      });
      // console.log(documents);
    });
  }, [docs]);

  return { photos };
};
