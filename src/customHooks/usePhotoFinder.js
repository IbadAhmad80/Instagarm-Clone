import { firestore } from "../FirebaseConfig";
import React from "react";
export const usePhotoFinder = (docs) => {
  const [photos, setPhotos] = React.useState({ images: [] });
  React.useEffect(() => {
    let documents = [];
    docs.map((document) => {
      firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().email === document.userEmail) {
              documents.push(doc.data().photoURL);
            }
          });
          setPhotos({ images: documents });
        });
    });
  }, [docs]);
  return { photos };
};
