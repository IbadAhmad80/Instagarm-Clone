import { useDispatch } from "react-redux";
import { firestore } from "../FirebaseConfig";
import { logIn } from "../components/redux/actions";
export const useGenerateUserDocument = async (user, method) => {
  const dispatch = useDispatch();
  if (!user) return true;
  if (method === "signup") {
    const { email, displayName } = user;
    let firstName = displayName.split(" ")[0];
    let lastName = displayName.split(" ")[1];
    firstName = firstName.toUpperCase();
    lastName = lastName.toUpperCase();
    var photoLiterals = firstName.charAt(0) + lastName.charAt(0);
    try {
      // firestore.settings({ timestampsInSnapshots: true });
      firestore.collection("users").add({
        displayName,
        email,
        photoLiterals,
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
        dispatch(logIn(data.email, data.displayName, null, data.photoLiterals));
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }
  return true;
};
