import { useDispatch } from "react-redux";
import { firestore } from "../FirebaseConfig";
import { logIn } from "../components/redux/actions";
import React from "react";

// let userValidation = false;
export const useGenerateUserDocument = async (user, method) => {
  const [userCheck, setUserCheck] = React.useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!user) return true;
    if (method === "signup") {
      const { email, displayName } = user;
      let firstName = displayName.split(" ")[0];
      let lastName = displayName.split(" ")[1];
      firstName = firstName.toUpperCase();
      lastName = lastName.toUpperCase();
      var photoLiterals = firstName.charAt(0) + lastName.charAt(0);
      let userCheck = null;

      try {
        firestore
          .collection("users")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().email === email) {
                setUserCheck(true);
              }
            });
            if (userCheck === null) {
              // console.log("in condition", userCheck);
              firestore.collection("users").add({
                displayName,
                email,
                photoLiterals: photoLiterals,
                photoURL: null,
                followers: [],
              });
            }
          });

        dispatch(logIn(email, displayName, null, photoLiterals));
      } catch (error) {
        console.error("Error creating user document", error);
      }
    } else if (method === "signin") {
      let data;
      firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().email === user.email) data = doc.data();
          });
          dispatch(
            logIn(data.email, data.displayName, null, data.photoLiterals)
          );
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    }
  }, [method]);
  return true;
};
