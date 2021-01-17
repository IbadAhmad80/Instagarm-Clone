export const logIn = (email, displayName, photoURL, photoLiterals) => {
  return {
    type: "SIGNIN",
    payload: {
      displayName: displayName,
      email: email,
      photoURL: photoURL,
      photoLiterals: photoLiterals,
    },
  };
};

export const signOut = () => {
  return {
    type: "SIGNOUT",
  };
};
