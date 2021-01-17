const state = {
  displayName: "",
  photoURL: "",
  email: "",
  photoLiterals: "",
};

const accountReducer = (reducer_state = state, action) => {
  switch (action.type) {
    case "SIGNIN":
      reducer_state.displayName = action.payload.displayName;
      reducer_state.photoURL = action.payload.photoURL;
      reducer_state.email = action.payload.email;
      reducer_state.photoLiterals = action.payload.photoLiterals;
      return reducer_state;
    case "SIGNOUT":
      reducer_state = {};
      return reducer_state;
    default:
      return reducer_state;
  }
};

export default accountReducer;
